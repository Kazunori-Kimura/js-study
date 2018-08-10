const redis = require('redis');

class RedisClient {
  constructor() {
    const options = {};
    if (process.env.REDIS_URL) {
      options.url = process.env.REDIS_URL;
    }
    this.client = redis.createClient(options);
  }

  /**
   * 切断
   */
  quit() {
    this.client.quit(true);
  }

  /**
   * string取得
   * @param {string} key 
   * @returns {string}
   */
  getAsync(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(reply);
      });
    });
  }

  /**
   * string登録
   * @param {string} key 
   * @param {string} value 
   */
  setAsync(key, value) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, (err, reply) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(reply);
      });
    });
  }

  /**
   * hash取得
   * @param {string} key
   * @returns {object}
   */
  hgetallAsync(key) {
    return new Promise((resolve, reject) => {
      this.client.hgetall(key, (err, obj) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(obj);
      });
    });
  }

  /**
   * hash登録
   * @param {string} key 
   * @param {object} obj 
   */
  hmsetAsync(key, obj) {
    return new Promise((resolve, reject) => {
      this.client.hmset(key, obj, (err, reply) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(reply);
      });
    });
  }
}

module.exports = RedisClient;
