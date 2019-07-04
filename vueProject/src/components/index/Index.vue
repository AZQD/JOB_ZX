<template>
  <div class="container">
    <div class="headBox">
      <div class="part left">
        <!--<img class="logo" :src="ossDomain+'index/logo_icon2.png'" alt="logo" />-->
        <img class="logo" src="./../../assets/images/index/logo_icon2.png" alt="logo"/>
      </div>
      <div class="part right">
        <div class="codeNameBox">
          <a href="javascript:void(0)" v-on:click="codeCtrl(1)" class="codeNameItem">共建网小程序</a>
          <span class="separate">|</span>
          <a href="javascript:void(0)" v-on:click="codeCtrl(2)" class="codeNameItem">微信公众号</a>
        </div>
        <div v-if="codeType" :class="[{ codeBox2: codeType===2 }, 'codeBox']">
          <div class="inner">
            <i class="up_icon"></i>
            <i class="close_icon" v-on:click="codeCtrl(0)"></i>
            <!--<img v-if="codeType===1" class="code_img" :src="ossDomain+'index/code_img1.png'" alt="共建网小程序二维码" />-->
            <!--<img v-if="codeType===2"  class="code_img" :src="ossDomain+'index/code_img2.png'" alt="共建网小程序二维码" />-->
            <!--<img :src="ossDomain+'index/'+(codeType===1?'code_img1':'code_img2')+'.png'" class="code_img" alt="c">-->
            <!--<img :src="'./../../assets/images/index/'+(codeType===1?'code_img1':'code_img2')+'.png'" class="fl-l img" alt="共建网小程序二维码">-->
            <img v-if="codeType===1" src="./../../assets/images/index/code_img1.png" class="code_img" alt="共建网小程序二维码">
            <img v-if="codeType===2" src="./../../assets/images/index/code_img2.png" class="code_img" alt="共建网小程序二维码">
            <div v-if="codeType===1" class="code_desc">
              <h2 class="title">共建网小程序：</h2>
              <p class="desc1">让建筑更简单<br>随时了解招投标</p>
              <p class="desc2">扫码使用共建网小程序<br>招标、企业、建材，一手掌控</p>
            </div>
            <div v-if="codeType===2" class="code_desc">
              <h2 class="title">微信公众号：</h2>
              <p class="desc3">扫一扫关注共建网<br>最新建筑资讯等你来</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="contentBox">
      <!--<img class="info_img" :src="ossDomain+'index/gongjian_info_origin.png'" alt="logo" />-->
      <img class="info_img" src="./../../assets/images/index/gongjian_info_origin.png" alt="logo"/>
    </div>
    <div class="footerBox">
      Copyright @ 2018-2019 www.gongjianwang.com.cn all Rights Reserved<br>
      共建网 版权所有 沪ICP备18012655号-2&nbsp;&nbsp;
      <img src="./../../assets/images/index/police_icon.png" class="police_icon" alt="police_icon">
      <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010702004889">沪公网安备 31010702004889号</a><br>
      地址：上海市普陀区澳门路158号1楼&nbsp;&nbsp;客服电话：400 0000 216
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      ossDomain: 'https://file.gongjian.mobi/wechat/gongjian/images/website/', // 阿里云图片域名
      codeType: 0 // 0：不展示二维码；1：共建网小程序；2：微信公众号
    }
  },
  methods: {
    codeCtrl: function (type) {
      // console.log(666, type)
      this.codeType = type
      console.log(111, this.codeType)
      // this.data.codeType = type
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .container {
    /*min-width: 1440px;*/
    .headBox {
      /*width: 1080px;*/
      /*max-width: 1080px;*/
      margin: 0 18%;
      height: 90px;
      .part {
        float: left;
      }
      .left {
        .logo {
          /*width: 240px;*/
          height: 48px;
          margin-top: 20px;
        }
      }
      .right {
        float: right;
        position: relative;
        .codeNameBox {
          padding-top: 25px;
          .codeNameItem {
            line-height: 38px;
            font-size: 14px;
            color: #222;
            margin: 0 14px;
            display: inline-block;
            position: relative;
          }
          .codeNameItem:hover {
            color: #fe5164;
            /*background: url(https://file.gongjian.mobi/wechat/images/gongjian/website/index/color_bg.png) no-repeat left bottom;*/
            background: url(./../../assets/images/index/color_bg.png) no-repeat left bottom;
            background-size: 100% 2px;
          }
          .separate {
            width: 2px;
            color: #9A9A9A;
          }
        }
        .codeBox {
          color: #fe5164;
          position: absolute;
          width: 442px;
          height: 252px;
          /*background: url(https://file.gongjian.mobi/wechat/images/gongjian/website/index/code_bg.png) no-repeat;*/
          background: url(./../../assets/images/index/code_bg.png) no-repeat;
          background-size: 100% 100%;
          left: -14px;
          top: 60px;
          .inner {
            position: relative;
            height: 100%;
            padding: 38px 0 0 22px;
            .up_icon {
              position: absolute;
              top: 5px;
              left: 40px;
              width: 39px;
              height: 21px;
              /*background: url(https://file.gongjian.mobi/wechat/images/gongjian/website/index/up_icon.png) no-repeat;*/
              background: url(./../../assets/images/index/up_icon.png) no-repeat;
              z-index: 10;
              display: block;
            }
            .close_icon {
              position: absolute;
              top: 35px;
              right: 15px;
              width: 20px;
              height: 20px;
              /*background: url(https://file.gongjian.mobi/wechat/images/gongjian/website/index/close_icon.png) no-repeat;*/
              background: url(./../../assets/images/index/close_icon.png) no-repeat;
              display: block;
              cursor: pointer;
            }
            .code_img {
              float: left;
              width: 189px;
            }
            .code_desc {
              float: left;
              padding: 28px 0 0 16px;
              .title {
                font-size: 18px;
              }
              .desc1 {
                font-size: 14px;
                line-height: 22px;
                padding-left: 9px;
              }
              .desc2 {
                padding-top: 20px;
              }
              .desc3 {
                padding-top: 10px;
                line-height: 25px;
              }
            }
          }
        }
        .codeBox2 {
          left: 36px;
          .inner {
            .up_icon {
              left: 110px;
            }
          }
        }
      }
    }

    .contentBox {
      font-size: 0;
      .info_img {
        width: 100%;
        /*min-height: 738px;*/
      }
    }

    .footerBox {
      border-top: solid 1px #f0f0f2;
      padding: 5px 0;
      text-align: center;
      line-height: 25px;
      color: #000;
      font-size: 12px;
      a{
        color: #000;
        font-size: 12px;
      }
      .police_icon{
        width: 16px;
        vertical-align: sub; /*垂直对齐文本的下标*/
      }
    }
  }

  @media screen and (max-width: 769px) {
    .container {
      min-width: 375px;
      .headBox {
        margin: 0 auto;
      }
    }
  }
</style>
