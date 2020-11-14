import './lib/jquery.js';
import './lib/jquery.md5.js';
import cookie from './lib/cookie.js';
import './lib/searchbox.js';
import { baseUrl } from './lib/config.js';

$('#header').load('../html/header.html');
$('#footer').load('../html/footer.html');

//渲染生日下拉
for (let i = 1970; i <= 2020; i++) {
    $('#year').append(`<option>${i}</option>`);
}
for (let i = 1; i <= 12; i++) {
    $('#month').append(`<option>${i}</option>`);
}
for (let i = 1; i <= 31; i++) {
    $('#day').append(`<option>${i}</option>`);
}
//表单验证
let reg = [/^[a-zA-Z0-9_-]{4,16}$/, /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/, /^(0000)$/, /^[a-zA-Z]\w{5,17}$/];
let flag = [false, false, false, false, false, false]; //0:username,1:sex,2:phone,3:yzm,4:psw,5:secondPsw
$('#register').attr('disabled', true);

$('#username').on('change', function() {
    flag[0] = reg[0].test($(this).val())
    if (!flag[0]) {
        $(this).css({ color: 'red', 'border-color': 'red' });
        $(this).val('数字，字母，下划线，减号4-16位');
        $(this).one('click', function() {
            $(this).val('').css({ color: '#333', 'border-color': '#333' });
        });
    } else {
        $(this).css({ color: '#333', 'border-color': '#333' });

    }
});
let timer1 = setInterval(function() {
    let temp = $('.sex [name="sex"]:checked').val();
    if (temp) {
        flag[1] = true;
        clearInterval(timer1);
    }
}, 1000);
$('#phone').on('change', function() {
    flag[2] = reg[1].test($(this).val());
    if (!flag[2]) {
        $(this).css({ color: 'red', 'border-color': 'red' });
        $(this).val('请输入正确的电话号码');
        $(this).one('click', function() {
            $(this).val('').css({ color: '#333', 'border-color': '#333' });
        });
    } else {
        $(this).css({ color: '#333', 'border-color': '#333' });

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
$('#yzm').on('change', function() {
    flag[3] = reg[2].test($(this).val());
    if (!flag[3]) {
        $(this).css({ color: 'red', 'border-color': 'red' });
        $(this).val('验证码错误');
        $(this).one('click', function() {
            $(this).val('').css({ color: '#333', 'border-color': '#333' });
        });
    } else {
        $(this).css({ color: '#333', 'border-color': '#333' });

    }
});
$('#password').on('change', function() {
    flag[4] = reg[3].test($(this).val());
    if (!flag[4]) {
        $(this).css({ color: 'red', 'border-color': 'red' }).attr('type', 'text');
        $(this).val('字母开头，只能包含字母、数字和下划线，6-18位');
        $(this).one('click', function() {
            $(this).val('').css({ color: '#333', 'border-color': '#333' }).attr('type', 'password');
        });
    } else {
        $(this).css({ color: '#333', 'border-color': '#333' });
    }
});
$('#repassword').on('change', function() {
    if ($(this).val() === $('#password').val()) {
        flag[5] = true;
        $(this).css({ color: '#333', 'border-color': '#333' });

    } else {
        $(this).css({ color: 'red', 'border-color': 'red' }).attr('type', 'text');
        $(this).val('两次密码不一致');
        $(this).one('click', function() {
            $(this).val('').css({ color: '#333', 'border-color': '#333' }).attr('type', 'password');
        });
    }
});

function vertify() {
    if (flag.every((elm) => elm) && $('#read')[0].checked && $('#fourteen')[0].checked) {
        $('#register').attr('disabled', false);
    } else {
        $('#register').attr('disabled', true);
    }
}
setInterval(vertify, 500);
//发送
$('#register').on('click', function() {
    let password = $.md5($('#password').val());
    let birth = `${$('#year option:selected').text()}-${$('#month option:selected').text()}-${$('#day option:selected').text()}`;
    if (birth == '年-月-日') {
        birth = '';
    };
    $.ajax({
        type: "post",
        url: baseUrl + "/users/reg",
        data: {
            username: $('#username').val(),
            password: password,
            birth: birth,
            phone: $('#phone').val(),
            sex: $('[type="radio"]:checked').attr('value')
        },
        dataType: "json",
        success: function(response) {
            alert(response.msg);
            if (!response.err) {
                location.href = baseUrl + '/index.html';
            }
        }
    });
})