import './lib/jquery.js';

$('#header').load('../html/header.html');
$('#footer').load('../html/footer.html');

$('.tabs ul li').on('click', function() {
    $(this).addClass('active').siblings().removeClass('active');
    let index = $(this).index();
    $('.tabs>div').eq(index).addClass('show').siblings().removeClass('show');
})