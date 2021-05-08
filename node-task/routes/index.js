const shortid = require("shortid");

const { checkForAuth, generateToken } = require("../middleware/auth");
const { addDataToRedis, getDataFromRedisById, getKeysFromRedisBasedOnPattern, getUserMatchingDataFromKeys,
  getKeysDataFromRedis
} = require("../models/redis");

module.exports = app => {

  const router = app.Router();

  // User API Routes
  router.post("/register", (req, res) => {
    const id = shortid.generate();
    const { email, password } = req.body;
    const userId = `user:${id}`;
    const { error, data } = addDataToRedis(userId, [
      "email", email,
      "password", password
    ]);
    if(error) return res.status(400).json({ status: false, error });
    return res.status(200).json({ status: true, data: { id: userId, email } });
  });
  
  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    
    getKeysFromRedisBasedOnPattern("user:*").then(keys => {
      getUserMatchingDataFromKeys(keys, { email, password }).then(user => {
        const token = generateToken(user.id);
        return res.status(200).json({ status: true, jwt: token });
      }).catch(() => {
        return res.status(400).json({ status: false, message: "Provided email or password does not match" });
      });
    }).catch(({ message }) => {
      return res.status(400).json({ status: false, message })
    });

  });
  
  router.get("/user", checkForAuth, (req, res) => {
    const { userId } = req.session_data;
    getDataFromRedisById(userId).then(user => {
      Object.assign(user, {
        id: userId
      });
      delete user.password;
      res.status(200).json({ status: true, data: user });
    }).catch(error => {
      return res.status(400).json({ status: false, message: error });
    });
  });
  
  // Task API Routes
  router.post("/create-task", checkForAuth,(req, res) => {
    const { name } = req.body;
    const id = shortid.generate();
    const taskId = `task:${id}`;
    const { error, data } = addDataToRedis(taskId, [
      "name", name
    ]);

    if(!data && error) return res.status(400).json({ status: false, message: "not able to save task" });
    return res.status(200).json({ status: true, data: { id: taskId, name } });
  });
  
  router.get("/list-tasks", checkForAuth, (req, res) => {
    const pattern = `task:*`;
    getKeysFromRedisBasedOnPattern(pattern).then(taskKeys => {
      const { keys } = taskKeys;
      getKeysDataFromRedis(keys).then(data => {
        res.status(200).json({ status: true, data });
      }).catch(err => {
        res.status(400).json({ status: false, message: err });
      })
    }).catch(err => {
      res.status(400).json({ status: false, message: err });
    });
  });

  return router;
}