# website

> Website project for gongjianwang by liuchaojie

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 网站地址：

https://gongjian.mobi/index.html

https://www.gongjianwang.com.cn/index.html


# 开发注意事项：

1.VUE-CLI Vue安装及开发，npm run build无法查看项目的问题：
https://blog.csdn.net/kids_calamus/article/details/82720226

2.router打不开：
路由的写法应该为：http://localhost:8080/hello

3.去掉#号的方法：// mode: 'history',//将这个模式关闭就好  但是npm run build时打不开，需要后端做配置；
参考链接：https://www.jianshu.com/p/ec0ce1f644d2

4.路由出错重定向：；
{path: '*', redirect: '/'} // 路由按顺序从上到下，依次匹配

5.支持less语法：
(1).安装：cnpm install less less-loader --save-dev

(2).style中配置：

```
    <style lang="less" scoped>
    .container{
      background-color: pink;
      .headBox{
        background-color: blue;
      }
    }
    </style>
```

https://file.gongjian.mobi/wechat/images/gongjian/website/index/close_icon.png

6.图片引入格式：
```
    <img :src="ossDomain+'index/logo_icon.png'" alt="logo" />
    <img :src="ossDomain+'index/'+(codeType===1?'code_img1':'code_img2')+'.png'" class="fl-l img" alt="共建网小程序二维码">
    <img :src="'./../../assets/images/index/'+(codeType===1?'code_img1':'code_img2')+'.png'" class="fl-l img" alt="共建网小程序二维码">
    <img v-if="codeType===1"  src="./../../assets/images/index/code_img1.png" class="fl-l img" alt="共建网小程序二维码">
```

7.after伪类：content: "";

8.vue中添加favicon：
https://www.cnblogs.com/conglvse/p/9871578.html

9.去掉hash：
需要后端配置服务器：
https://www.jianshu.com/p/444476c37c01
https://www.csdn.net/gather_21/MtTaAg0sMzIxOS1ibG9n.html
