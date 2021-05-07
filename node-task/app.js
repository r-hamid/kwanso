require("dotenv").config();
const express = require("express");
const session = require("express-session");
const redis = require("redis");
const bodyParser = require("body-parser");
const cors = require("cors");
const shortid = require("shortid");
const jwt = require("jsonwebtoken");

const app = express();

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Connection to redis
let client = redis.createClient();
client.on("connect", () => {
  console.log("connected to redis client");
});

// Routes
app.post("/register", (req, res) => {
  const id = shortid.generate();
  const { email, password } = req.body;
  const userId = `user:${id}`;
  client.hmset(userId, [
    "email", email,
    "password", password
  ], (err, obj) => {
    if(err) return res.status(400).json({ status: false, message: err })
    res.status(200).json({ status: true, data: { id: userId, email }});
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  let foundUser = null;
  client.keys("user:*", (err, obj) => {
    if(!obj) return res.status(400).json({ status: false, message: "no data found" })
    const findUser = new Promise((resolve, reject) => {
      for (let i = 0; i < obj.length; i++) {
        client.hgetall(obj[i], (err, user) => {
          if(user) {
            if(user.email === email && user.password === password) {
              Object.assign(user, {
                id: obj[i]
              })
              delete user.password;
              resolve(user);
            }
          }
          if((i === (obj.length - 1)) && foundUser === null) {
            reject();
          }
        });
      }
    });
    findUser.then(data => {
      const expiresIn = 60 * 60 * 24;
      const token = jwt.sign({
        userId: data.id,
        issuedOn: new Date(),
        expiresIn
      }, process.env.SECRET, {
        expiresIn
      });
      req.session.token = token;
      return res.status(200).json({ status: true, data: { jwt: token } });
    });
    findUser.catch(() => {
      return res.status(200).json({ status: false, message: "provided email or password does not match" });
    });
  });
});

app.get("/user", (req, res) => {
  let token = req.headers.authorization;
  if(!token) return res.status(400).json({ status: false, message: "unauthorized" });
  token = token.split(" ")[1];
  const { userId } = jwt.verify(token, process.env.SECRET);
  client.hgetall(userId, (err, obj) => {
    if(!obj) return res.status(400).json({ status: false, message: "Invalid token" });
    Object.assign(obj, {
      id: userId
    });
    delete obj.password;
    return res.status(200).json({ status: true, data: obj });
  });
});

app.post("/create-task", (req, res) => {
  let token = req.headers.authorization;
  if(!token) return res.status(400).json({ status: false, message: "unauthorized" });
  token = token.split(" ")[1];
  const { userId } = jwt.verify(token, process.env.SECRET);
  const { name } = req.body;
  const id = shortid.generate();
  const taskId = `task:${id}`;
  client.hmset(taskId, [
    "name", name
  ], (err, obj) => {
    if(!obj) return res.status(400).json({ status: false, message: "not able to save task" });
    return res.status(200).json({ status: true, data: { id: taskId, name } });
  });
});

app.get("/list-tasks", (req, res) => {
  let token = req.headers.authorization;
  if(!token) return res.status(400).json({ status: false, message: "unauthorized" });
  token = token.split(" ")[1];
  const { userId } = jwt.verify(token, process.env.SECRET);
  const allTasks = [];
  client.keys("task:*", (err, keys) => {
    const tasksPromise = new Promise((resolve, reject) => {
      for (let i = 0; i < keys.length; i++) {
        client.hgetall(keys[i], (err, task) => {
          Object.assign(task, {
            id: keys[i]
          })
          allTasks.push(task);
          if(keys.length === i+1) resolve();
        })
      }
    })
    tasksPromise.then(() => {
      return res.status(200).json({ status: true, data: allTasks });
    });
    tasksPromise.catch(() => {
      return res.status(400).json({ status: false, message: "something went wrong, please try again in a while" });
    })
  })
})

app.set("PORT", process.env.PORT);
app.listen(app.get("PORT"), () => {
  console.log(`Server has been started on PORT: ${app.get("PORT")}`);
});