const express = require('express');
const conn = require('../dao/conn'); //数据库连接
const crypto = require('crypto'); //加密模块

const router = express.Router();
//二级路径
router.route('/')
    .get((req, res, next) => {
        console.log(req.query);
        res.json({ msg: 'method is get' });
    })
    .post((req, res, next) => {
        console.log(req.body);
        res.json({ msg: 'method is post' });
    });
//用户注册
router.route('/reg')
    .post((req, res, next) => {
        let searchSql = `select * from users where user_name='${req.body.username}'`;
        conn.query(searchSql, (err, results) => {
            if (err) throw err;
            if (results.length) {
                //用户名已存在
                res.json({ msg: '注册失败', username: req.body.username, err: 1 });
            } else {
                //用户名可用，注册
                //后端密码加密
                let md5 = crypto.createHash('md5');
                let md5Psw = md5.update(req.body.password).digest('hex');
                let insertSql = `insert into users (user_name,user_password,user_phone,user_sex,user_birth) values ('${req.body.username}','${md5Psw}','${req.body.phone}','${req.body.sex}','${req.body.birth}')`
                conn.query(insertSql, (err, results) => { //results是结果数组
                    if (err) throw err;
                    if (results.insertId) {
                        //注册成功
                        res.cookie('username', req.body.username);
                        res.cookie('isLogin', true)
                        res.json({ msg: '注册成功', username: req.body.username, err: 0 });
                    } else {
                        //注册失败
                        res.json({ msg: '注册失败', err: 1 });
                    }
                });
            }
        });

    });
router.route('/login')
    .post((req, res, next) => {
        if (req.cookies.username && req.cookies.isLogin === 'true') {
            //检查cookie,用户已经登陆
            console.log('用户已登录');
        }
    });
module.exports = router;