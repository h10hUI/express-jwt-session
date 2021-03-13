// 必要なモジュール読み込み
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

function authMiddle() {
    console.log('authMiddle')
}

module.exports = authMiddle;
