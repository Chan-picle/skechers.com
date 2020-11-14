   import './lib/jquery.lazyload.min.js';
   import './lib/searchbox.js';
   import { baseUrl } from './lib/config.js'

   //header fixed
   $(window).on('scroll', function() {
       if (document.documentElement.scrollTop >= 25) {
           $('.navbar-default').addClass('navbar-fixed-top');
       } else {
           $('.navbar-default').removeClass('navbar-fixed-top');

       }
   });
   //swipwr
   const mySwiper3 = new Swiper('#small-slider', {
       loop: true, // 循环模式选项
       autoplay: true
   })
   $('#closetop').on('click', function() {
       $(this.parentNode).css('display', 'none');
   })

   //将banner的框设置的和屏幕同宽，图片大小和当前框同步
   function bannerint() {
       let h = document.documentElement.clientHeight - 75;
       let w = document.documentElement.clientWidth;
       $('#banner').css({
           width: `${w}px`,
           height: `${h}px`
       });
       $('#banner div img').css({
           width: `${w}px`,
           height: `${h}px`
       });
   }
   bannerint();

   $(window).on('resize', bannerint);

   // $('#banner')
   $.fn.extend({
       slider: function(options) {
           let main = null,
               init = null,
               start = null,
               stop = null,
               prev = null,
               next = null,
               elm = {},
               defaults = {
                   speed: 300,
                   delay: 1000
               },
               timer = null;
           $.extend(defaults, options);

           init = function() {
               //初始化，获取图片宽度，设置最后一张图
               elm.width = this.children('div').children('img').width();
               elm.sliderbox = this.children('div');
               elm.index = 1;
               elm.dots = this.children('.dot').children('li');
               this.children('div').append(this.children('div').children('img').first().clone());
               //此时页面还没加载出图片，只是有DOM结构，所以无法获取到正确的offset().left
               // elm.last = elm.sliderbox.children('img').last().offset().left - this.offset().left;
               //鼠标悬浮事件
               this.hover(() => {
                   elm.sliderbox.siblings('span').css({
                       visibility: 'visible'
                   });
                   stop();
               }, () => {
                   elm.sliderbox.siblings('span').css({
                       visibility: 'hidden'
                   });
                   timer = setInterval(start.bind(null, 1), defaults.speed + defaults.delay);
               });
               //箭头点击事件
               this.children('span').first().on('click', function() {
                   prev();
               })
               this.children('span').last().on('click', function() {
                       next();
                   })
                   //小圆点事件
               elm.dots.on('click', function() {
                   let oldindex = elm.index,
                       newindex = parseInt($(this).attr('data-index'));
                   $(this).addClass('active').siblings().removeClass('active');
                   switch (newindex - oldindex) {
                       case 0:
                           break;
                       case 1:
                           next();
                           break;
                       case 2:
                           next();
                           next();
                           break;
                       case -1:
                           prev();
                           break;
                       case -2:
                           prev();
                           prev();
                           break;
                   }
               })
           }.bind(this);

           start = function(direction) {
               //开始滚动，
               elm.width = document.documentElement.clientWidth;
               // console.log(elm.width);
               let move = `-=${elm.width}`;
               if (!direction) {
                   move = `+=${elm.width}`;
                   if (elm.index === 1) {
                       elm.index = 4;
                       elm.last = elm.sliderbox.children('img').last().offset().left - this.offset().left;
                       elm.sliderbox.css('left', `-${elm.last}px`);
                   }
               }
               elm.sliderbox.animate({
                   'left': move
               }, defaults.speed, function() {
                   if (direction) {
                       elm.index++;
                   } else {
                       elm.index--;
                   }
                   if (elm.index === 4) {
                       elm.sliderbox.css('left', '0');
                       elm.index = 1;
                   }
                   //给小圆点设置active
                   elm.dots.eq(elm.index - 1).addClass('active').siblings().removeClass('active');
               })
           }.bind(this);
           stop = function() {
               clearInterval(timer);
               elm.sliderbox.stop(true, true);
           }
           prev = function() {
               stop();
               start(0);
           }
           next = function() {
               stop();
               start(1);
           }
           main = function() {
               init();
               // start();
               clearInterval(timer);
               timer = setInterval(start.bind(null, 1), defaults.speed + defaults.delay);
               //此处绑定的this指向，无所谓是什么，调用时会重新绑定this,最后调用的是绑定了this的strat函数,这里主要就是传入一个指定参数
           }
           main();
       }
   });
   $('#banner').slider({
       speed: 250,
       delay: 2000
   });
   //图片懒加载
   $('[data-original]').lazyload({
       event: 'scroll',
       threshold: 500,
       effect: 'fadeIn',
       skip_invisible: false
   });
   (function() {
       $.ajax({
           type: "get",
           url: baseUrl + "/product/getProducts",
           dataType: "json",
           success: function(res) {
               let temp1 = ``;
               let temp2 = ``;
               res.forEach((elm, i) => {
                   if (i < 4) {
                       temp1 += `
                       <div>
                                <a href="./html/details.html?id=${elm.product_id}" target="_blank">
                                    <img src=${elm.index_picture}  alt="">
                                    <div class="text-center">
                                        <p>${elm.title}</p>
                                        <span>立即选购 &gt;</span>
                                    </div>
                                </a>
                            </div>
                       `;
                   } else if (i >= 4 && i < 8) {
                       temp2 += `
                       <div>
                                <a href="./html/details.html?id=${elm.product_id}" target="_blank">
                                    <img src=${elm.index_picture}  alt="">
                                    <div class="text-center">
                                        <p>${elm.title}</p>
                                        <span>立即选购 &gt;</span>
                                    </div>
                                </a>
                            </div>
                       `;
                   }
               });
               $('.render-1').append(temp1);
               $('.render-2').append(temp2);
           }
       });
       const mySwiper1 = new Swiper('.swiper1', {
           loop: true, // 循环模式选项
           navigation: {
               nextEl: '.a2',
               prevEl: '.a1',
           }
       });
       const mySwiper2 = new Swiper('.swiper2', {
           loop: true, // 循环模式选项
           navigation: {
               nextEl: '.you',
               prevEl: '.zuo',
           }
       });

   })()