import './lib/jquery.js';
import './lib/jquery.md5.js';
import cookie from './lib/cookie.js';
import './lib/searchbox.js';

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
$('#register').on('click', function() {
    // console.log({
    //     username: $('#username').val(),
    //     password: $.md5($('#password').val()),
    //     sex: $('[type="radio"]:checked').attr('value'),
    //     year: $('#year option:selected').text(),
    //     month: $('#month option:selected').text(),
    //     day: $('#day option:selected').text(),
    //     phone: $('#phone').val(),
    //     birth: `${$('#year option:selected').text()}-${$('#month option:selected').text()}-${$('#day option:selected').text()}`
    // });
    let password = $.md5($('#password').val());
    let birth = `${$('#year option:selected').text()}-${$('#month option:selected').text()}-${$('#day option:selected').text()}`;
    $.ajax({
        type: "post",
        url: "http://localhost:8888/users/reg",
        data: {
            username: $('#username').val(),
            password: password,
            birth: birth,
            phone: $('#phone').val(),
            sex: $('[type="radio"]:checked').attr('value')
        },
        dataType: "json",
        success: function(response) {

        }
    });
})