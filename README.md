# JQ_Carousel
简单的JQ移动端PC端通用banner左右轮播效果插件

## 介绍
- 可自动轮播图片或元素
- 轮播图片元素可设置说明文字
- 移动端手指可滑动切换图片
- PC端可使用箭头点击切换图片

## 使用方法
> [调用]
```
$(selector).carousel({name:value, name:value, ...});
```
> [可选参数]

| 参数名称 | Type | 值/描述 | 默认值 |
| --- | --- | --- | --- |
| imgWrap | Object | 轮播图片包裹元素，该值应该JQ对象 -> $(selector) | ``` $(".carousel-wrap") ``` |
| img | Object | 轮播图片元素，该值应该JQ对象 -> $(selector) | ``` $(".carousel-img") ``` |
| arrow | Object | 轮播切换图片箭头按钮元素，该值应该JQ对象组 -> {r:$(selector),l:$(selector)} | ```{r:$(".arrowLeft"),l:$(".arrowRight")} ``` |
| containerW | String | 轮播图片容器限制宽度，针对单位为rem时自动获取的容器宽度不准确而提供的优化参数 -> '6rem' | ``` 自动获取容器宽度 ``` |
| timer | Number | 自动轮播切换图片毫秒数 | 2000 |
| animateTimer | Number | 切换图片JQ animate动画毫秒数 | 800 |

## 最新版下载
- [生产版本：v0.1.0.min.zip](https://github.com/qc-web-y/JQ_Carousel/files/2302202/JQ_Carousel.v0.1.0.min.zip)
- [开发版本：v0.1.0.zip](https://github.com/qc-web-y/JQ_Carousel/files/2302213/JQ_Carousel.v0.1.0.zip)
- [完整版本：v0.1.0.all.zip](https://github.com/qc-web-y/JQ_Carousel/files/2302195/v0.1.0.zip)
