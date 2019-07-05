<template>
  <div>test</div>
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
