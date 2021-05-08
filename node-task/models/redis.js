const redis = require("redis");

// Connection to redis
const client = redis.createClient();
client.on("connect", () => {
  console.log("connected to redis client");
});

module.exports = {
  addDataToRedis(id, data) {
    return client.hmset(id, data, (err, obj) => {
      if(err) return { error: err }
      return { data };
    });
  },
  getDataFromRedisById(id) {
    return new Promise((resolve, reject) => {
      client.hgetall(id, (err, obj) => {
        if(!obj) reject("No data found against this key");
        resolve(obj);
      });
    })
  },
  getKeysFromRedisBasedOnPattern(pattern) {
    return new Promise((resolve, reject) => {
      client.keys(pattern, (err, keys) => {
        if(!keys) reject({ message: "No data found against this pattern" });
        resolve({ keys });
      });
    });
  },
  getUserMatchingDataFromKeys(userKeys, { email, password }) {
    return new Promise((resolve, reject) => {
      let foundUser = null;
      const checkUserPromise = new Promise((resolveOne, rejectOne) => {
        const { keys } = userKeys;
        for (let i = 0; i < keys.length; i++) {
          client.hgetall(keys[i], (err, user) => {
            if(user) {
              if(user.email === email && user.password === password) {
                Object.assign(user, {
                  id: keys[i]
                })
                delete user.password;
                foundUser = user;
                resolveOne();
              }
            }
            if((i === (keys.length - 1)) && foundUser === null) {
              rejectOne();
            }
          });
        }
      })
      checkUserPromise.then(() => {
        resolve(foundUser);
      });
      checkUserPromise.catch(() => {
        reject();
      })
    });
  },
  getKeysDataFromRedis(keys) {
    return new Promise((resolve, reject) => {
      const allTasks = [];
      const tasksPromise = new Promise((resolveOne, rejectOne) => {
        for (let i = 0; i < keys.length; i++) {
          client.hgetall(keys[i], (err, task) => {
            Object.assign(task, {
              id: keys[i]
            })
            allTasks.push(task);
            if(keys.length === i+1) resolveOne();
          })
        }
      });
      tasksPromise.then(() => {
        resolve(allTasks);
      });
      tasksPromise.catch(() => {
        reject("something went wrong, please try again in a while");
      })
    })
  }
}