# JQ_Carousel
JQ移动端全屏banner简单左右轮播效果插件

## 介绍
- 可自动轮播图片或元素
- 移动端触摸滑动可切换图片

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
| timer | Number | 自动轮播切换图片毫秒数 | 2000 |
| animateTimer | Number | 切换图片JQ animate动画毫秒数 | 800 |
