import './lib/jquery.js';
import './lib/jquery.md5.js';
import cookie from './lib/cookie.js';

$('#register').on('click', function() {
    // console.log(1);
    console.log(1)
});
for (let i = 1970; i <= 2020; i++) {
    $('#year').append(`<option>${i}</option>`);
}
for (let i = 1; i <= 12; i++) {
    $('#month').append(`<option>${i}</option>`);
}
for (let i = 1; i <= 31; i++) {
    $('#day').append(`<option>${i}</option>`);
}