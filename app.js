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
app.post('/login', (req, res) => {
    const payload = {
        user: req.body.user
    };

    const option = {
        expiresIn: sessionRetentionTime
    };

    const token = jwt.sign(payload, hash, option);

    res.json({
        message: "create token",
        token: token
    });
});

// 認証用ミドルウェアの読み込み
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
    jwt.verify(token, hash, function(err, decoded) {
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

// 認証必須API
app.get('/user', auth, (req, res, next) => {
    res.status(200).send('your name is ${req.decoded.user}')
})

// エラーハンドリング
app.use((err, req, res, next) => {
    res.status(500).send(err)
})
