# eshop

Taro • 云开发电商小程序示例
> 详细示例说明后续放出

# 关于 Taro

Taro 是由凹凸实验室打造的一套遵循 React 语法规范的多端统一开发解决方案。使用 Taro，我们可以只书写一套代码，再通过 Taro 的编译工具，将源代码分别编译出可以在不同端（字节跳动小程序、微信小程序、百度智能小程序、支付宝小程序、QQ 小程序、跨应用、H5、App 端等）运行的代码。同时 Taro 还提供开箱即用的语法检测和自动补全等功能，有效地提升了开发体验和开发效率。

Taro 作为 凹凸实验室 的主要开源产品之一，在 github 上拥有 20,000+ star， Taro 在业界获得广泛的关注。

# 关于云开发

文章中的几个数据集的模拟数据，已上传至 cloud/doc 中，可根据需要自行导入。

云函数的代码存放在 cloud/functions 中，代码是按模块进行分割，每个模块有一个入口文件和一些执行具体逻辑的文件。

# 关于云函数

在使用你自己的云函数环境时，需要将云函数初始化换成你小程序的云环境。有以下几个地方需要注意：

-   src/app.js
-   cloud/functions 下每个云函数里的 index.js
-   project.config.json 里的 appid 需要换成你的小程序的 appid

```jsx
// src/app.js
async componentDidMount () {
  Taro.cloud.init({
    env: 'xxyyzz', // 换成你的云函数环境
    traceUser: true // 是否要捕捉每个用户的访问记录。设置为true，用户可在管理端看到用户访问记录
  })
}
```

# 项目示例

## 项目流程图

![](http://storage.jd.com/taro-club-img/taro-eshop-process.jpg)

## 首页

![](http://storage.jd.com/taro-club-img/taro-eshop-test.jpg)

## 商详

![](http://storage.jd.com/taro-club-img/taro-eshop-detail1.gif)
![](http://storage.jd.com/taro-club-img/taro-eshop-detail.gif)

## 购物车

![](http://storage.jd.com/taro-club-img/taro-eshop-cart.jpg)
![](http://storage.jd.com/taro-club-img/taro-eshop-cart1.jpg)
![](http://storage.jd.com/taro-club-img/taro-eshop-cart2.gif)

## 订单

![](http://storage.jd.com/taro-club-img/taro-shop-order12.jpeg)
![](http://storage.jd.com/taro-club-img/taro-eshop-order.jpg)
![](http://storage.jd.com/taro-club-img/taro-eshop-order1.jpg)
