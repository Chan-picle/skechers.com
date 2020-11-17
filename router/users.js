const express = require('express');
const conn = require('../dao/conn'); //数据库连接
const crypto = require('crypto'); //加密模块
const { sendCode } = require('../library/sendMail');
const fs = require('fs');
const path = require('path');

const router = express.Router();
//二级路径
router.route('/')
    .get((req, res, next) => {
        // console.log(req.query);
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
                res.json({ msg: '用户名已存在', username: req.body.username, err: 1 });
            } else {
                //用户名可用，注册
                //后端密码加密
                let md5 = crypto.createHash('md5');
                let md5Psw = md5.update(req.body.password).digest('hex');
                let insertSql = `insert into users (user_name,user_password,user_phone,user_sex,user_birth) values ('${req.body.username}','${md5Psw}','${req.body.phone}','${req.body.sex}','${req.body.birth}')`;
                if (req.body.birth == '') {
                    insertSql = `insert into users (user_name,user_password,user_phone,user_sex) values ('${req.body.username}','${md5Psw}','${req.body.phone}','${req.body.sex}')`;
                }
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
            // console.log('用户已登录');
            res.json({ msg: '已登录', err: 0 });
        } else {
            if (req.body.flag === '1') {
                //密码登陆
                let md5 = crypto.createHash('md5');
                let md5Psw = md5.update(req.body.password).digest('hex');
                let searchSql = `select * from users where user_name='${req.body.username}'and user_password='${md5Psw}'`;
                conn.query(searchSql, (err, results) => {
                    if (err) throw err;
                    console.log(results);
                    if (results.length) {
                        res.cookie('username', req.body.username);
                        res.cookie('isLogin', true);
                        res.json({ msg: '登陆成功', username: req.body.username, err: 0 });
                    } else {
                        res.json({ msg: '登陆失败', username: req.body.username, err: 1 });
                    }
                })
            } else if (req.body.flag === '2') {
                //电话登陆
                let searchSql = `select * from users where user_phone='${req.body.phone}'`;
                conn.query(searchSql, (err, results) => {
                    if (err) throw err;
                    if (results.length) {
                        res.cookie('userphone', req.body.phone);
                        res.cookie('isLogin', true);
                        res.json({ msg: '登陆成功', userphone: req.body.phone, err: 0 })
                    } else {
                        res.json({ msg: '登陆失败', userphone: req.body.phone, err: 1 })
                    }
                });
            }
        }
    });
//发送邮箱验证码
router.route('/getcode')
    .get((req, res, next) => {
        fs.writeFile(path.join(__dirname, '..', 'temp', req.query.email), sendCode(req.query), 'utf8', (err) => {
            if (err) console.log(err);
            res.json({ msg: `邮件已发送至${req.query.email}，请注意查收` });
        });
    });
//验证邮箱验证码是否正确
router.route('/checkcode')
    .get((req, res, next) => {
        fs.readFile(path.join(__dirname, '..', 'temp', req.query.email), 'utf8', (err, data) => {
            if (err) console.log(err);
            console.log(data);
            if (data === req.query.code) {
                res.cookie('useremail', req.query.email);
                res.cookie('isLogin', true);
                res.json({ msg: '登陆成功,即将跳转至首页', useremail: req.query.email, err: 0 });
            } else {
                res.json({ msg: '登陆失败', useremail: req.query.email, err: 1 });
            }
        })
    });
module.exports = router;