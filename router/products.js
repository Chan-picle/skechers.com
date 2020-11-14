const express = require('express');
const conn = require('../dao/conn'); //数据库连接

const router = express.Router();
//首页接口
router.route('/getProducts')
    .get((req, res, next) => {
        let sqlSearch = `select * from products`;
        conn.query(sqlSearch, (err, results) => {
            if (err) throw err;
            res.json(results);
        })
    });
//详情页接口
router.route('/getItem')
    .get((req, res, next) => {
        let sqlSearch = `select * from products where product_id=${req.query.id}`;
        conn.query(sqlSearch, (err, results) => {
            if (err) throw err;
            res.json(results);
        })
    });


module.exports = router;