require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Database = require('./lib/database');

const app = express();
const port = process.env.PORT || 8080;

// body-parser設定
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
app.use(cors({ exposedHeaders: ['Content-Range'] }));

// no cache
app.use((req, res, next) => {
  res.header('Cache-Control', ['private', 'no-store', 'no-cache', 'must-revalidate', 'proxy-revalidate'].join(','));
  res.header('no-cache', 'Set-Cookie');
  next();
});

// database instanceを保持
const db = new Database({ storage: process.env.SQLITE_PATH });
app.set('db', db);

// ルーティング設定


/*
 * 404 Not Found
 */
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/*
 * error handler
 */
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  console.error({ status, message });

  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(status);
  res.send({ status, message });
});

// プログラム終了時の処理
process.on('exit', (code) => {
  console.log('app exit: ', code);
});

// Databaseテーブル生成
db.sync()
.then(() => {
  // listen
  app.listen(port, () => {
    console.log(`listening on port ${port}.`);
  });
}).catch((err) => {
  console.error(err);
});

