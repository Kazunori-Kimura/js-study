const express = require('express');
const bcrypt = require('bcrypt');
const base = require('./router');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

/**
 * パスワードをハッシュ値に変換
 * @param {string} password 
 */
const hashAsync = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, process.env.SALT_ROUNDS, (err, hash) => {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });
  });
};

/**
 * passwordをハッシュ値に変換するmiddleware
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const hashPasswordAsync = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (typeof password === 'string' && password.length > 0) {
      const hash = await hashAsync(password);
      req.body.password = hash;
    } else if (typeof password !== 'undefined') {
      // パスワードを更新しないようにパラメータから削除
      delete req.body.password;
    }

    next();
  } catch (err) {
    next(err);
  }
};

/**
 * responseからpasswordを削除するmiddleware
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const removePassowrd = (req, res, next) => {
  try {
    if (Array.isArray(res.body)) {
      // 配列の場合
      res.body = res.body.map((item) => {
        delete item.password;
        return item;
      });
    } else {
      // objectの場合
      delete res.body.password;
    }

    next();
  } catch (err) {
    next(err);
  }
};

// GET: /administrator
router.get(
  '/',
  // 認証
  authenticate,
  // GET LIST
  async (req, res, next) => {
    try {
      const db = req.app.get('db');
      const { Administrator } = db.models;

      await base.getListAsync(req, res, Administrator);
      next();
    } catch (err) {
      next(err);
    }
  },
  // パスワードを削除
  removePassowrd,
  // レスポンスを返す
  base.sendResponse,
);

// GET: /administrator/{id}
router.get(
  '/:id',
  // 認証
  authenticate,
  // GET ONE
  async (req, res, next) => {
    try {
      const db = req.app.get('db');
      const { Administrator } = db.models;

      await base.getOneAsync(req, res, Administrator);
      next();
    } catch (err) {
      next(err);
    }
  },
  // パスワードを削除
  removePassowrd,
  // レスポンスを返す
  base.sendResponse,
);

// POST: /administrator
router.post(
  '/',
  // 認証
  authenticate,
  // パスワードのハッシュ化
  hashPasswordAsync,
  // CREATE
  async (req, res, next) => {
    try {
      const db = req.app.get('db');
      const { Administrator } = db.models;

      await base.createAsync(req, res, Administrator);
      next();
    } catch (err) {
      next(err);
    }
  },
  // パスワードを削除
  removePassowrd,
  // レスポンスを返す
  base.sendResponse,
);

// PUT: /administrator/{id}
router.put(
  '/:id',
  // 認証
  authenticate,
  // パスワードのハッシュ化
  hashPasswordAsync,
  // UPDATE
  async (req, res, next) => {
    try {
      const db = req.app.get('db');
      const { Administrator } = db.models;

      await base.updateAsync(req, res, Administrator);
      next();
    } catch (err) {
      next(err);
    }
  },
  // パスワードを削除
  removePassowrd,
  // レスポンスを返す
  base.sendResponse,
);

// DELETE: /administrator/{id}
router.delete(
  '/:id',
  // 認証
  authenticate,
  // DELETE
  async (req, res, next) => {
    try {
      const db = req.app.get('db');
      const { Administrator } = db.models;

      await base.deleteAsync(req, res, Administrator);
      next();
    } catch (err) {
      next(err);
    }
  },
  // パスワードを削除
  removePassowrd,
  // レスポンスを返す
  base.sendResponse,
);

module.exports = router;
