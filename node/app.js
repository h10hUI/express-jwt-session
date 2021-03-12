// dotenvモジュールを使用する
require('dotenv').config;

// 必要なモジュール読み込み
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// server
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.info('listen: ', PORT)
});
