/*
  routerの各種メソッドのbase
 */
const Sequelize = require('sequelize');

module.exports = {
  /**
   * GET LIST
   * 
   * /xxx?sort=[['field_name','ASC'],['field_name','DESC']]&range=[0,10]
   */
  getListAsync: async (req, res, model, include=null) => {
    const { sort, range } = req.query;
    const options = {};

    if (sort) {
      const order = JSON.parse(sort);
      // orderが配列の配列かどうかを判定する
      if (Array.isArray(order)) {
        if (Array.isArray(order[0])) {
          options.order = order;
        } else {
          options.order = [order];
        }
      }
    } else {
      if (model.rawAttributes.order) {
        options.order = [
          Sequelize.fn('isnull', Sequelize.col('order')),
          ['order', 'ASC'],
        ];
      }
    }

    if (range) {
      const rangeArr = JSON.parse(range);
      if (rangeArr.length === 2) {
        const [offset, end] = rangeArr;
        const limit = end - offset + 1;
        options.offset = offset;
        options.limit = limit;
      }
    }

    if (include) {
      options.include = include;
    }

    // select
    const result = await model.findAndCountAll(options);

    // bodyを生成
    res.body = result.rows.map((row) => {
      return row.get({ plain: true });
    });

    const start = options.offset || 0;
    let end = start;
    if (options.limit) {
      end += options.limit;
      if (end > result.count) {
        end = result.count;
      }
    }

    res.header('Content-Range', `${model.getTableName()} ${start}-${end}/${result.count}`);
  },

  /**
   * GET_ONE
   */
  getOneAsync: async (req, res, model, include=null) => {
    const { id } = req.params;
    const options = {
      where: {
        id
      }
    };
    if (include) {
      options.include = include;
    }

    // 取得処理
    const entity = await model.findOne(options);

    if (entity) {
      res.body = entity.get({ plain: true });
      return;
    }

    // 404 Not Found
    const err = new Error('Not Found');
    err.status = 404;
    throw err;
  },

  /**
   * CREATE
   */
  createAsync: async (req, res, model) => {
    const data = Object.assign({}, req.body);
    // createAt/updateAt
    data.createAt = new Date();
    data.updateAt = new Date();
    // insert
    const entity = await model.create(data);

    if (entity) {
      res.body = entity.get({ plain: true });
      return;
    }

    // 500 Internal Server Error
    const err = new Error('Internal Server Error');
    err.status = 500;
    throw err;
  },

  /**
   * UPDATE
   */
  updateAsync: async (req, res, model) => {
    const { id } = req.params;
    const data = Object.assign({}, req.body);
    if (data.createAt) {
      // 作成日時があればカット
      delete data.createAt;
    }

    // データ取得
    const entity = await model.findOne({
      where: {
        id
      }
    });

    if (entity) {
      // 更新日時が異なる -> すでに更新されている
      const reqUpdate = data.updateAt.toJSON();
      const dbUpdate = entity.get('updateAt').toJSON();
      if (reqUpdate !== dbUpdate) {
        // 409 Conflict
        const err = new Error('Conflict');
        err.status = 409;
        throw err;
      }

      // 更新日時をセット
      data.updateAt = new Date();
      // update
      await entity.update(data);
      res.body = entity.get({ plain: true });
      return;
    }

    // 404 Not Found
    const err = new Error('Not Found');
    err.status = 404;
    throw err;
  },

  /**
   * DELETE
   */
  deleteAsync: async (req, res, model) => {
    const { id } = req.params;

    // データ取得
    const entity = await model.findOne({
      where: {
        id
      }
    });

    if (entity) {
      // delete
      res.body = entity.get({ plain: true });
      await entity.destory();
      return;
    }

    // 404 Not Found
    const err = new Error('Not Found');
    err.status = 404;
    throw err;
  },

  /**
   * レスポンスを返す
   */
  sendResponse: (req, res) => {
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.status(200);
    res.send(res.body);
  },
};
