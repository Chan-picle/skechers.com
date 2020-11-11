import './lib/jquery.js';
import './lib/searchbox.js';

$('#header').load('../html/header.html');
$('#footer').load('../html/footer.html');

//tab
$('.tabs ul li').on('click', function() {
    $(this).addClass('active').siblings().removeClass('active');
    let index = $(this).index();
    $('.tabs>div').eq(index).addClass('show').siblings().removeClass('show');
})