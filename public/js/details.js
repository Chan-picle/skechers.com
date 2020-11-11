import './lib/jquery.js';
import './lib/searchbox.js';

$('#header').load('../html/header.html');
$('#footer').load('../html/footer.html');









const mySwiper4 = new Swiper('#swiperProduct', {
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
$('#swiperProduct').hover(() => {
    console.log(0);
}, () => {
    console.log(1);
});