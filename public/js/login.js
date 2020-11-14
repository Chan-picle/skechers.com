import './lib/jquery.js';
import './lib/searchbox.js';
import './lib/jquery.md5.js';
import { baseUrl } from './lib/config.js';

$('#header').load('../html/header.html');
$('#footer').load('../html/footer.html');

//tab
$('.tabs ul li').on('click', function() {
    $(this).addClass('active').siblings().removeClass('active');
    let index = $(this).index();
    $('.tabs>div').eq(index).addClass('show').siblings().removeClass('show');
});
//表单验证
$('#loginBtn1').attr('disabled', true);
$('#loginBtn2').attr('disabled', true);
let flag1 = false,
    flag2 = false,
    flag3 = false,
    flag4 = false; //判断输入是否为空
$('#username').on('focus input', function() {
    if ($(this).val() === '') {
        $(this).css({ 'outline-color': 'red', 'border-color': 'red' });
        $(this).attr('placeholder', '用户名不能为空');
        flag1 = false;
        vertify()
    } else {
        $(this).css({ 'outline-color': '#333', 'border-color': '#333' });
        flag1 = true;
        vertify()
    }
});
$('#password').on('focus input', function() {
    if ($(this).val() === '') {
        $(this).css({ 'outline-color': 'red', 'border-color': 'red' });
        $(this).attr('placeholder', '密码不能为空');
        flag2 = false;
        vertify()
    } else {
        $(this).css({ 'outline-color': '#333', 'border-color': '#333' });
        flag2 = true;
        vertify()
    }
});
let lookflag = true;
$('.looking').on('click', function() {
    if (lookflag) {
        lookflag = !lookflag;
        $('#password').attr('type', 'text');
    } else {
        lookflag = !lookflag;
        $('#password').attr('type', 'password');
    }
});

function vertify() {
    if (flag1 && flag2) {
        $('#loginBtn1').attr('disabled', false);
    } else {
        $('#loginBtn1').attr('disabled', true);
    }
}
//验证码登陆
let reg = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;
$('#phone').on('focus input', function() {
    if ($(this).val() === '' || !reg.test($(this).val())) {
        $(this).css({ 'outline-color': 'red', 'border-color': 'red' });
        $(this).attr('placeholder', '电话不能为空');
        flag3 = false;
        vertify1()
    } else {
        $(this).css({ 'outline-color': '#333', 'border-color': '#333' });
        flag3 = true;
        vertify1()
    }
});
$('#yzm').on('focus input', function() {
    if ($(this).val() === '0000') {
        $(this).css({ 'outline-color': '#333', 'border-color': '#333' });
        flag4 = true;
        vertify1()
    } else {
        $(this).css({ 'outline-color': 'red', 'border-color': 'red' });
        $(this).attr('placeholder', '验证码错误');
        flag4 = false;
        vertify1()
    }
});
$('#yzmBtn').on('click', () => {
    // console.log($('#yzmBtn'));
    $('#yzmBtn').attr('disabled', true);
    let count = 5;
    let timer2 = setInterval(function() {
        $('#yzmBtn').text(`获取验证码（${count--}）`);
    }, 1000);
    setTimeout(() => {
        $('#yzmBtn').attr('disabled', false).text('获取验证码');
        clearInterval(timer2);
    }, 6000);
});

function vertify1() {
    if (flag3 && flag4) {
        $('#loginBtn2').attr('disabled', false);
    } else {
        $('#loginBtn2').attr('disabled', true);
    }
}
$('#loginBtn1').on('click', function() {
    let password = $.md5($('#password').val());
    $.ajax({
        type: "post",
        url: baseUrl + "/users/login",
        data: {
            username: $('#username').val(),
            password: password,
            flag: '1'
        },
        dataType: "json",
        success: function(res) {
            alert(res.msg);
            if (!res.err) {
                location.href = baseUrl + '/index.html';
            }
        }
    });
});
//验证码登陆
$('#loginBtn2').on('click', function() {
    $.ajax({
        type: "post",
        url: baseUrl + "/users/login",
        data: {
            phone: $('#phone').val(),
            flag: '2'
        },
        dataType: "json",
        success: function(res) {
            alert(res.msg);
            if (!res.err) {
                location.href = baseUrl + '/index.html';
            }
        }
    });
});