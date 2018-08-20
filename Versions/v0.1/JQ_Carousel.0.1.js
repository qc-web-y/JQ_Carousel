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

        if (maxMove > 0) {
            $(this).on("touchstart", function (event) {
                event.preventDefault(); 
                carouselkAutoplay(false); 
                clearTimeout(resetTimer); 
                imgWrap.stop(); 
                var touch = event.originalEvent.targetTouches[0];
                coor.sx = touch.clientX;
            })
            $(this).on("touchend", function (event) {
                event.preventDefault(); 
                var touch = event.originalEvent.changedTouches[0];
                coor.ex = touch.clientX;
                var move = coor.sx - coor.ex;
                if (move > 10 && nowMove < imgNum - 1) {
                    if (nowMove < imgNum - 1) {
                        nowMove++;
                    } else {
                        nowMove = imgNum - 1;
                    };
                };
                if (move < 10 && nowMove > 0) {
                    if (nowMove > 0) {
                        nowMove--;
                    } else {
                        nowMove = 0;
                    };
                };
                imgWrap.animate({ "margin-left": -containerLimit * nowMove }, animateTimer);
                resetTimer = setTimeout(function () {
                    carouselkAutoplay(true);
                }, timer);
            })
        }

        var flag = true;
        function carouselkAutoplay(open) {
            var open = true && open;
            if (open) {
                timerName = setInterval(function () {
                    if (flag && nowMove <= imgNum - 1) {
                        nowMove++;
                    };
                    if (nowMove > imgNum - 1) {
                        nowMove = imgNum - 1;
                        flag = false;
                    };
                    if (!flag && nowMove > 0) {
                        nowMove--;
                    };
                    if (nowMove <= 0) {
                        flag = true;
                    };
                    imgWrap.stop().animate({ "margin-left": -containerLimit * nowMove }, animateTimer);
                }, timer)

            } else {
                clearInterval(timerName);
            }
        }
        carouselkAutoplay(true);
    })
}

$.fn.extend({ carousel });