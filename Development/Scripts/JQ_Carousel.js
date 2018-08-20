/**
 * JQ_Carousel
 * Developer：YanEr
 * Blogs：https://www.cnblogs.com/leona-d
 * Time：2018-08-20
 * Versions：v0.1
 * Describe：JQ移动端全屏banner简单左右轮播效果
 */
function carousel(options) {
    return this.each(function () {
        /**
         * --调用方法
         *  [HTML]
         *  <div class="carousel-banner">
         *      <div class="carousel-wrap">
         *          <a href="###" class="carousel-img"><img src="Images/1.jpg"></a>
         *          <a href="###" class="carousel-img"><img src="Images/2.jpg"></a>
         *          <a href="###" class="carousel-img"><img src="Images/3.jpg"></a>
         *      </div>
         *  </div>
         * 
         *  [CSS]
         *  .carousel-banner { width: 6.9rem; height: 3.24rem; overflow: hidden;}
         *  .carousel-banner .carousel-wrap { width: auto; height: 100%; white-space: nowrap; font-size: 0; }
         *  .carousel-banner .carousel-wrap .carousel-img { display: inline-block; width: 6.9rem;  height: 3.24rem;  font-size: 0.14rem; overflow: hidden; }
         *  .carousel-banner .carousel-wrap .carousel-img img { width: 100%; height: 100%; }
         *  注：图片及banner宽高可根据情况自定义
         * 
         *  [Javascript]
         *  $("bannerSelectorName").carousel();
         * 
         * --param参数说明
         *  <param type="JQ Object" val="imgWrap" required="false">轮播图片包裹元素</param>
         *  <param type="JQ Object" val="img" required="false">轮播图片元素</param>
         *  <param type="Number" val="timer" required="false">自动轮播切换图片毫秒数</param>
         *  <param type="Number" val="animateTimer" required="false">切换图片JQ animate动画毫秒数</param>
         */

        // 初始化参数
        var options = {} || options;
        var imgWrap = options.imgWrap || $(this).find(".carousel-wrap");
        var imgEl = options.img || $(this).find(".carousel-img");
        var imgNum = imgEl.length;
        var containerLimit = $(this).width();
        var maxMove = containerLimit * imgNum - containerLimit;
        var timerName = this.className + new Date().getTime();
        var timer = options.timer || 2000;
        var resetTimer;
        var animateTimer = options.animateTimer || 800;
        var coor = {};
        var nowMove = 0;

        // 注册移动端touch滑动事件
        if (maxMove > 0) {
            $(this).on("touchstart", function (event) {
                event.preventDefault(); // 禁止默认事件
                carouselkAutoplay(false); // 停止自动轮播
                clearTimeout(resetTimer); // 清除[touchend后重新开始自动轮播]定时器
                imgWrap.stop(); // 停止元素当前队列中正在进行动画

                // 获取起点坐标
                var touch = event.originalEvent.targetTouches[0];
                coor.sx = touch.clientX;
            })
            $(this).on("touchend", function (event) {
                event.preventDefault(); // 禁止默认事件

                // 获取终点坐标
                var touch = event.originalEvent.changedTouches[0];
                coor.ex = touch.clientX;

                // 计算移动距离
                var move = coor.sx - coor.ex;

                // <向左滑动
                if (move > 10 && nowMove < imgNum - 1) {
                    if (nowMove < imgNum - 1) {
                        nowMove++;
                    } else {
                        nowMove = imgNum - 1;
                    };
                };

                // 向右滑动>
                if (move < 10 && nowMove > 0) {
                    if (nowMove > 0) {
                        nowMove--;
                    } else {
                        nowMove = 0;
                    };
                };

                // 执行图片滑动
                imgWrap.animate({ "margin-left": -containerLimit * nowMove }, animateTimer);

                // [timer]毫秒后执行重新自动轮播
                resetTimer = setTimeout(function () {
                    carouselkAutoplay(true);
                }, timer);
            })
        }

        // 图片自动轮播函数
        var flag = true;
        function carouselkAutoplay(open) {
            var open = true && open;
            if (open) {
                // 开始自动轮播
                timerName = setInterval(function () {
                    // 向右轮播>
                    if (flag && nowMove <= imgNum - 1) {
                        nowMove++;
                    };
                    // 到达最后一张图片
                    if (nowMove > imgNum - 1) {
                        nowMove = imgNum - 1;
                        flag = false;
                    };
                    // <向右轮播
                    if (!flag && nowMove > 0) {
                        nowMove--;
                    };
                    // 到达第一张图片
                    if (nowMove <= 0) {
                        flag = true;
                    };
                    // 执行切换图片
                    imgWrap.stop().animate({ "margin-left": -containerLimit * nowMove }, animateTimer);
                }, timer)

            } else {
                // 停止自动轮播
                clearInterval(timerName);
            }
        }

        // 执行图片自动轮播
        carouselkAutoplay(true);
    })
}

$.fn.extend({ carousel });