const nodemailer = require('nodemailer');

const user = {
    name: 'chenpickle@163.com',
    pass: 'WNEGYCVVCBERKBYB'
};
let transporter = nodemailer.createTransport({
    host: "smtp.163.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: user.name, // generated ethereal user
        pass: user.pass, // generated ethereal password
    },
});

function sendCode(opt) {
    let code = getCode();
    let obj = {
        from: '"skechers斯凯奇官方商城" <chenpickle@163.com>', // sender address
        to: opt.email, // list of receivers
        subject: "验证码 - skechers斯凯奇官方商城", // Subject line
        html: `<h1>您的验证码是：${code}</h1>`, // html body
    }
    transporter.sendMail(obj, (err, info) => {
        if (err) console.log(err);
        // console.log( info);
    });
    return code;
}

function getRandom(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

function getCode() {
    let code = '';
    for (let i = 0; i < 6; i++) {
        switch (getRandom(1, 3)) {
            case 1:
                code += String.fromCharCode(getRandom(48, 57));
                break;
            case 2:
                code += String.fromCharCode(getRandom(65, 90));
                break;
            case 3:
                code += String.fromCharCode(getRandom(97, 122));
                break;
        }
    }
    return code;
}
module.exports = { sendCode };