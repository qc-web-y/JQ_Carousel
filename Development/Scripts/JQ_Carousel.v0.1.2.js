/*
 * JQ_Carousel
 * Developer：YanEr
 * Blogs：https://www.cnblogs.com/leona-d
 * Time：2018-08-20
 * Versions：v0.1.2
 * Describe：简单的JQ移动端PC端通用banner左右轮播效果插件
 */
$.fn.extend({
    carousel: function (opt) {
        var options = opt || {};
        return this.each(function () {
            // 初始化参数
            var _this = this;
            var $this = $(_this);
            var imgWrap = options.imgWrap || $this.find(".carousel-wrap");
            var imgEl = options.img || $this.find(".carousel-img");
            var imgNum = imgEl.length;
            var timer = options.timer || 2000;
            var flag = false;
            var nowMove = 0;

            // 重新开始计时器变量
            var resetTimer;

            // 单位
            var unit;
            if (options.containerW) {
                unit = options.containerW.replace(/\d+\.?\d+/, "");
            } else {
                unit = "px";
            }

            // 切换图片箭头元素
            var arrow = false;
            if (options.arrow) {
                if (options.arrow.l && options.arrow.r) {
                    arrow = options.arrow;
                }
            } else {
                var l = $this.find(".arrowLeft");
                var r = $this.find(".arrowRight");
                if (l.length > 0 && r.length > 0) {
                    arrow = {
                        l: l,
                        r: r
                    };
                }
            }

            // 是否手机端
            var isPhone = false;
            if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
                isPhone = true;
            }

            // 移动图片
            var animateTimer = options.animateTimer || 800; // 动画毫秒数
            var containerLimit; // 容器限制宽
            if (unit === "rem") {
                containerLimit = options.containerW.match(/\d+\.?\d+/)[0];
            } else if (unit === "px") {
                containerLimit = $this.width();
            }
            function moveImg(moveVal) {
                if (!isPhone) {
                    // 左箭头显示与否
                    if (moveVal === imgNum - 1) {
                        arrow.l.fadeOut(500);
                    } else if (arrow.l.css("display") === "none") {
                        arrow.l.fadeIn(500);
                    }
                    // 右箭头显示与否
                    if (moveVal === 0) {
                        arrow.r.fadeOut(500);
                    } else if (arrow.r.css("display") === "none") {
                        arrow.r.fadeIn(500);
                    }
                }

                imgWrap.stop().animate({ "margin-left": -containerLimit * moveVal + unit }, animateTimer);
            }

            // 移动端touch事件
            var coor = {}; // 坐标存储
            function mobileTouchEvent() {
                $this.on("touchstart", function (event) {
                    event.preventDefault();
                    carouselkAutoplay(false);
                    clearTimeout(resetTimer);
                    imgWrap.stop();

                    // 获取起点坐标
                    var touch = event.originalEvent.targetTouches[0];
                    coor.sx = touch.clientX;
                });
                $this.on("touchend", function (event) {
                    event.preventDefault();

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
                        }
                    }

                    // 向右滑动>
                    if (move < 10 && nowMove > 0) {
                        if (nowMove > 0) {
                            nowMove--;
                        } else {
                            nowMove = 0;
                        }
                    }

                    // 执行图片滑动
                    moveImg(nowMove);

                    // [timer]毫秒后执行重新自动轮播
                    resetTimer = setTimeout(function () {
                        carouselkAutoplay(true);
                        clearTimeout(resetTimer);
                    }, timer);
                });
            }

            // 图片自动轮播函数
            var timerName = _this.className + new Date().getTime();
            function carouselkAutoplay(openArg) {
                var open = openArg && true;
                if (open) {
                    // 开始自动轮播
                    timerName = setInterval(function () {
                        if (nowMove <= 0 && flag) {
                            flag = false;
                        }
                        if (nowMove >= 0 && !flag) {
                            nowMove++;
                        }
                        if (nowMove <= imgNum && flag) {
                            nowMove--;
                        }
                        if (nowMove >= imgNum - 1 && !flag) {
                            flag = true;
                        }
                        moveImg(nowMove);
                    }, timer);
                } else {
                    // 停止自动轮播
                    clearInterval(timerName);
                }
            }

            // 鼠标悬停于元素上时停止轮播
            $this.hover(function () {
                carouselkAutoplay(false);
            }, function () {
                carouselkAutoplay(true);
            });

            if (imgNum > 1) {
                // 执行图片自动轮播
                carouselkAutoplay(true);

                // 注册移动端touch滑动事件
                mobileTouchEvent();
            }

            if (arrow) {
                if (isPhone) {
                    // 隐藏箭头
                    arrow.r.hide();
                    arrow.l.hide();
                } else {
                    // 隐藏当前不可点击的右箭头
                    arrow.r.hide();

                    // 点击左箭头事件
                    arrow.l.click(function () {
                        clearTimeout(resetTimer);
                        carouselkAutoplay(false);
                        if (nowMove !== imgNum - 1) {
                            nowMove++;
                            moveImg(nowMove);
                        } else if (!flag) {
                            flag = true;
                        }
                        // [timer]毫秒后执行重新自动轮播
                        resetTimer = setTimeout(function () {
                            carouselkAutoplay(true);
                            clearTimeout(resetTimer);
                        }, timer);
                    });

                    // 点击右箭头事件
                    arrow.r.click(function () {
                        clearTimeout(resetTimer);
                        carouselkAutoplay(false);
                        if (nowMove !== 0) {
                            nowMove--;
                            moveImg(nowMove);
                        } else if (flag) {
                            flag = false;
                        }
                        // [timer]毫秒后执行重新自动轮播
                        resetTimer = setTimeout(function () {
                            carouselkAutoplay(true);
                            clearTimeout(resetTimer);
                        }, timer);
                    });
                }
            }
        });
    }
});