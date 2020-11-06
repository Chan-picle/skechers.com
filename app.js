const express = require('express');
const path = require('path');
const userRouter = require('./router/uers');
const cookieParser = require('cookie-parser');
const createError = require('http-errors'); //错误管理


const app = express();

let config = {
    host: 'localhost',
    port: 8888
}

app.use(express.static(path.join(__dirname, 'public')));
// post数据处理
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//cookie
app.use(cookieParser());
//路由
app.use('/users', userRouter);

//其他路由报404错误
app.use((req, res, next) => {
    next(createError(404)); //创建404错误
});
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.redirect('/html/404.html')
});
app.listen(config.port, config.host, () => {
    console.log(`server is running on http://${config.host}:${config.port}`)
});