import './lib/jquery.js';
import './lib/searchbox.js';

$('#header').load('../html/header.html');
$('#footer').load('../html/footer.html');
(function() {
    const mySwiper4 = new Swiper('.swiperProduct', {
        direction: 'vertical',
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function(index, className) {
                return `<li class="${className}"><img src="../img/product/p1-c1-s${index+1}.jpg"></li>`;
            }
        }
    });
})();
//放大镜
let small = $('#small'),
    big = $('#big'),
    magnifiler = $('#magnif');
var bigPic = $('#big .swiper-slide-active'); //可能随时变动
magnifiler.css('display', 'none');
big.css('display', 'none');
$('.bigbox').css('display', 'none');


small.on('mouseenter', function() {
    magnifiler.css('display', 'block');
    big.css('display', 'block');
    $('.bigbox').css('display', 'block');

    magnifiler.css({
        width: `357px`,
        height: `357px`
    });
    small.on('mousemove', function(ev) {
        let y = ev.pageY - small.offset().top - magnifiler[0].offsetHeight / 2;
        let x = ev.pageX - small.offset().left - (magnifiler[0].offsetWidth / 2);
        if (y < 0) y = 0;
        else if (y >= small[0].offsetHeight - magnifiler[0].offsetHeight) y = small[0].offsetHeight - magnifiler[0].offsetHeight - 2;
        if (x < 0) x = 0;
        else if (x >= small[0].offsetWidth - magnifiler[0].offsetWidth) x = small[0].offsetWidth - magnifiler[0].offsetWidth - 2;
        magnifiler.css({
            top: `${y}px`,
            left: `${x}px`
        });
        //bigPic移动
        let ratio = $('#big .swiper-slide-active')[0].offsetWidth / small[0].offsetWidth;
        $('#big .swiper-slide-active').css({
            top: `${y*-ratio}px`,
            left: `${x*-ratio+200}px`
        });
    })


});
small.on('mouseleave', function() { //鼠标移除事件
    magnifiler.css('display', 'none');
    big.css('display', 'none');
    $('.bigbox').css('display', 'none');

});
//modal
$('#myModal').on('shown.bs.modal', function() {
    $('#myInput').focus()
});
//tab
$('.likeTabs li').on('click', function() {
    $(this).addClass('tab-active').siblings().removeClass('tab-active');
    let index = $(this).index();
    $('.likeTabs>div').eq(index).addClass('tab-show').siblings().removeClass('tab-show');
})