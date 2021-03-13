// 必要なモジュール読み込み
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// セッション保持時間を定数化
const sessionRetentionTime = '1m';

function apiServer(str) {
    app.post('/login', (req, res) => {
        const payload = {
            user: req.body.user
        };

        const option = {
            expiresIn : sessionRetentionTime
        };

        const token = jwt.sign(payload, str, option);

        res.json({
            message: 'create token',
            token: token
        });
    });
}

module.exports = apiServer;
