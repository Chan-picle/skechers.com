import './lib/jquery.js';
import './lib/searchbox.js';
import { baseUrl } from './lib/config.js'

$('#header').load('../html/header.html');
$('#footer').load('../html/footer.html');

sliderPic(); //firstline

function sliderPic() {
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
};
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
});
//数据渲染
(function() {
    let id = location.search.split('=').pop();
    let temp = ``;
    let colorType = 0;
    $.ajax({
        type: "get",
        url: baseUrl + "/product/getItem",
        data: { id: id },
        dataType: "json",
        success: function(res) {
            const content = res[0];
            const colorArr = JSON.parse(content.color);
            const picturesUrl = JSON.parse(content.picture);
            //右边信息
            let tempStr = ``;
            for (let i = 0; i < colorArr.length; i++) {
                if (i == 0) {
                    tempStr += ` <button class="btn-active"><img src="../${picturesUrl[i].small[0].src}" alt=""></button>`
                } else {
                    tempStr += `<button><img src="../${picturesUrl[i].small[0].src}" alt=""></button>`;
                }
            }
            temp = `
            <div class="p-title">
                <h1>${content.title}</h1>
            </div>
            <div class="p-classify">
                <p>${content.classify}</p>
            </div>
            <div class="p-price">
                <h2>
                    <del>￥${content.price}</del><em>￥${content.sell_price}</em>
                </h2>
            </div>
            <div class="p-no">
                <p>货号：<span>${content.no}</span></p>
            </div>
            <div class="p-color">
                <p>颜色:<span>${colorArr[0]}</span></p>
                <div id="color-tab">
                    ${tempStr};
                </div>
            </div>
            `;
            $('.p-size').before(temp);
            //左边 SmallPic
            const tempSmall = $('.tempSmall img');
            tempSmall.each((i, elm) => {
                if (i <= 5 && i >= 1) {
                    // console.log(picturesUrl[1].small[0].src);
                    $(elm).attr('src', `../${picturesUrl[colorType].small[i - 1].src}`);
                } else if (i === 0) {
                    $(elm).attr('src', `../${picturesUrl[colorType].small[4].src}`);
                } else if (i === 6) {
                    $(elm).attr('src', `../${picturesUrl[colorType].small[1].src}`);
                }
            });

            //放大镜 BigPic
            const tempBig = $('.tempBig img');
            tempBig.each((i, elm) => {
                if (i <= 5 && i >= 1) {
                    $(elm).attr('src', `../${picturesUrl[colorType].big[i - 1].src}`);
                } else if (i === 0) {
                    $(elm).attr('src', `../${picturesUrl[colorType].big[4].src}`);
                } else if (i === 6) {
                    $(elm).attr('src', `../${picturesUrl[colorType].big[1].src}`);
                }
            });
            //轮播按钮
            const tempBtn = $('.swiper-pagination-bullet>img');
            tempBtn.each((i, elm) => {
                $(elm).attr('src', `../${picturesUrl[colorType].small[i].src}`);
            });

            //tab 颜色切换
            $('#color-tab button').on('click', function() {
                $(this).addClass('btn-active').siblings().removeClass('btn-active');
                colorType = $(this).index();
                tempSmall.each((i, elm) => {
                    if (i <= 5 && i >= 1) {
                        // console.log(picturesUrl[1].small[0].src);
                        $(elm).attr('src', `../${picturesUrl[colorType].small[i - 1].src}`);
                    } else if (i === 0) {
                        $(elm).attr('src', `../${picturesUrl[colorType].small[4].src}`);
                    } else if (i === 6) {
                        $(elm).attr('src', `../${picturesUrl[colorType].small[1].src}`);
                    }
                });
                tempBig.each((i, elm) => {
                    if (i <= 5 && i >= 1) {
                        $(elm).attr('src', `../${picturesUrl[colorType].big[i - 1].src}`);
                    } else if (i === 0) {
                        $(elm).attr('src', `../${picturesUrl[colorType].big[4].src}`);
                    } else if (i === 6) {
                        $(elm).attr('src', `../${picturesUrl[colorType].big[1].src}`);
                    }
                });
                tempBtn.each((i, elm) => {
                    $(elm).attr('src', `../${picturesUrl[colorType].small[i].src}`);
                });
            });
            //下面具体信息
            $('.details-pic img').attr('src', `../${picturesUrl[0].big[0].src}`)
            $('#detail_body').prepend(content.detail);
        }
    });
})();