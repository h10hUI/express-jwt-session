// 必要なモジュール読み込み
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

function authMiddle(str) {
    const auth = (res, req, next) => {
        // リクエストヘッダーからトークンの取得
        let token = '';

        if (req.headers.authorization &&
            req.headers.authorization.split(' ')[0] === 'Bearer') {
            token = req.headers.authorization.split(' ')[1]
        } else {
            return next('token none')
        }

        // トークンの検証
        jwt.verify(token, str, function(err, decoded) {
            if (err) {
                // 認証エラーの時
                next(err.message)
            } else {
                // 認証OK
                req.decoded = decoded
                next()
            }
        });
    }
}

module.exports = authMiddle;
