const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    let valid = false;

    if (token) {
      const data = jwt.verify(token, process.env.JWT_SIGN_KEY);
      if (/^d+$/.test(data.userid)) {
        const db = req.app.get('db');
        const { Administrator } = db.models;
        const admin = await Administrator.findOne({
          where: {
            id: data.userid,
          },
        });

        if (admin) {
          req.userid = data.userid; // useridを保持する
          valid = true;
        }
      }
    }

    if (!valid) {
      // 401 Unauthorized
      const err = new Error('Unauthorized');
      err.status = 401;
      next(err);
      return;
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
