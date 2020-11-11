const http = require('https');
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');

http.get('https://store.skechers.cn/on/demandware.store/Sites-skechers-cn-Site/zh_CN/Product-Show?pid=%20237110&dwvar_%20237110=NVY&selectcl=true', (res) => {
    const { statusCode } = res; // 解构获得http状态码
    const contentType = res.headers['content-type']; // 获得contenttype

    let error; // 错误
    // Any 2xx status code signals a successful response but
    // here we're only checking for 200.
    if (statusCode !== 200) { // 如果http状态码不等于200 就新建错误
        error = new Error('Request Failed.\n' +
            `Status Code: ${statusCode}`);
    } else if (!/^text\/html/.test(contentType)) { // 检测获得的内容是不是html
        error = new Error('Invalid content-type.\n' +
            `Expected application/json but received ${contentType}`);
    }
    if (error) { // 如果有错误 
        console.error(error.message); // 打印错误
        // Consume response data to free up memory
        res.resume(); // 清除缓存
        return; // 结束
    }

    res.setEncoding('utf8'); // 设置字符集
    let rawData = ''; // 数据
    res.on('data', (chunk) => { rawData += chunk; }); // 如果有数据就拼接数据
    res.on('end', () => { // 数据响应结束
        let $ = cheerio.load(rawData); // 将get请求到的数据交给cheerio加载
        const reg = /^(\/)|(http:\/\/store.skechers.cn\/)/; // 匹配单杠或http协议
        $('img').each((i, elm) => {
            // 统一协议
            let url = $(elm).attr('src').replace(reg, 'https://store.skechers.cn/'); //替换成 https://
            if (url == '') url = 'https://store.skechers.cn/on/demandware.static/-/Library-Sites-SkechersSharedLibrary/zh_CN/dwcdbc4c8b/top-store-icon.png';
            // console.log(i, url);
            // 获得文件名
            let filename = url.split('/').pop();

            http.get(url, (res) => {
                let imgData = '';
                res.setEncoding('binary'); // 设置成二进制
                res.on('data', chunk => imgData += chunk);
                res.on('end', () => {
                    fs.writeFile(path.join(__dirname, 'public', 'img', 'product', 'shose', filename), imgData, 'binary', err => {
                        if (err) console.log(err);
                        console.log(i, '文件已保存');
                    });
                });
            });
        });
    });


});