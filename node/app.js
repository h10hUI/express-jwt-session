// dotenvモジュールを使用する
require('dotenv').config();

// 必要なモジュール読み込み
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const app = express();

// server
const PORT = process.env.PORT_NO || 80;
app.listen(PORT, () => {
    console.info('listen: ', PORT)
});

// middleware
app.use(express.static(path.join(__dirname, '../'))); // 静的ファイルの配信
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// token
const hash = bcrypt.hashSync(process.env.ACCESS_TOKEN_SECRET, 10);

// apiserverの読み込み
const apiserver = require('./apiServer');
apiserver(hash);
