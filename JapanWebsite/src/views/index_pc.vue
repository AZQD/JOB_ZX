<template>
  <div class="containerPC">

    <div class="partBox1">
      <img class="bgImage scaleBigSelector" src="../assets/images/01_Mac.jpg" />

      <div class="content">
        <div class="nav">
          <div class="left">
            <a href="https://www.baidu.com"><img class="logo" src="../assets/images/app_logo_white.svg" /></a>
          </div>
          <div class="right">
            <a href="https://www.baidu.com"><img class="link" src="../assets/images/icon01_white.svg" /></a>
            <a href="https://www.baidu.com"><img class="link" src="../assets/images/icon02_white.svg" /></a>
            <a href="https://www.baidu.com"><img class="link" src="../assets/images/icon03_white.svg" /></a>
            <a href="https://www.baidu.com"><img class="link" src="../assets/images/icon04_white.svg" /></a>
            <a href="https://www.baidu.com"><img class="link" src="../assets/images/icon05_white.svg" /></a>
          </div>
        </div>
        <div class="info opacityChangeSelector">
          <div class="desc1">温故知新の真髄を追求し、ここに新生。<br/>JS × COFO 全ライフスタイル対応兼用デスク</div>
          <div class="desc2">"人生を包み込む"、生涯愛用の机。</div>
          <div class="desc3">
            Makuakeにて公開間近!数量限定·特別価格にて<br/>
            自分のために最高の多機能昇降デスクを構成してください!<br/>
          </div>
        </div>
        <div class="form">
          <div class="title">電子信箱</div>
          <div class="inputWrap">
            <el-input placeholder="メルマガ登録で最大30%の限定情報をGET!" v-model="inputVal">
              <template slot="append">送信</template>
            </el-input>
          </div>
          <div class="lineBox">
            <div class="part"></div>
            <div class="center">or</div>
            <div class="part"></div>
          </div>
          <div class="buttonWrap">
            <el-input type="button" value="與LINE 連動登録">
              <template slot="append">
                <img class="icon" src="../assets/images/line_icon.svg" />
              </template>
            </el-input>
          </div>
        </div>
      </div>
    </div>

    <div class="partBox2" id="targetElement">
      <div class="topWrap">
        <div class="item">
          <div class="desc1">応援購入総額</div>
          <div class="desc2">
            6400<span class="unit">万人</span>
          </div>
        </div>
        <div class="item">
          <div class="desc1">応援購入支援者</div>
          <div class="desc2">
            1,170<span class="unit">人</span>
          </div>
        </div>
        <div class="item">
          <div class="desc1">応援購入総額ランディング</div>
          <div class="desc2">
            <span class="number">デスク部門</span>
            <span class="value">No.1</span>
          </div>
        </div>
      </div>
      <div class="makuake">
        <img class="logo" src="../assets/images/makuake_icon.svg" />
        <div class="desc">
          おかげさまでCOFO Deskシリ-ズはクラウドフアンディングサイト<br/>
          「Makuake」でサオ一夕一数<span class="light">1170</span>人、応援購入総額<span class="light">6400</span>万を突破し、<br/>
          Makuakeデスク部門<span class="light">NO.1</span>を獲得いたしました</div>
      </div>
    </div>

<!--    图片分组-->
    <div class="partBox3">
      <img class="img imgLeft opacityChangeSelector" src="../assets/images/02.jpg" />
      <div class="desc">
        <div class="desc1">集中を極めるデスクとして。</div>
        <div class="desc2">画期的な叹納性を有する异降式デスクが、<br/>理想的な才フイス環境を整えます。</div>
        <div class="desc3">座ってでも、立ってでも・昇降テ-プルと贅沢な天然無垢材の上質さを携えた天板が、多彩な作業に最適な空間を提供し、疲労軽減と集中力の強化を実現します。</div>
      </div>
    </div>
    <div class="partBox3">
      <div class="desc">
        <div class="desc1">団戀を分かち合う食卓として。</div>
        <div class="desc2">温かみと品格を備えたテ-プルが、<br/>ご家庭に美味しさと楽しさを届けます。</div>
        <div class="desc3">部屋のインテリアに豊かに溶け込む、温かくて格式高いダイニングテ-プル。機能や構造面でも安全性と快適性を追求。食卓としても摇るぎない存在感を放ちます。</div>
      </div>
      <img class="img imgRight opacityChangeSelector" src="../assets/images/03.jpg" />
    </div>
    <div class="partBox3">
      <img class="img imgLeft opacityChangeSelector" src="../assets/images/04.jpg" />
      <div class="desc">
        <div class="desc1">寬ぎを導くロ-テ-プルとして。</div>
        <div class="desc2">ソフアにでったりの座卓にも変化、<br/>リラックス空間を存分に味わえます。</div>
        <div class="desc3">昇降機能を用いれば、ソフアや置の上にもしっとりと馴染むロ-テ-プルに姿を変えます。コ-ヒ-を飲んだり、ゲ-ムをしたり、談笑したり。寛ぎの時間をたっぷり楽しめます。</div>
      </div>
    </div>

    <div class="aboutUSBox">
      <img class="bgImage scaleBigSelector" src="../assets/images/05_Mac.jpg" />
      <div class="content translateYSelector">
        <div class="title">About us</div>
        <div class="desc1">
          "スタイル"を持つ人たちに、生涯愛用できる机をお届けしたい。<br/>
          JS × COFOは品格と機能性を兼ね備えた「スタンダード」を追求しました。<br/>
          この机は、ワークデスク・ダイニング・ローテーブルの全てを網羅します。
        </div>
        <div class="desc2">
          仕事をする時は作業台に。食事をする時は食卓に。<br/>
          リラックスをする時は座卓に。鮮烈に部屋に溶け込み人生を支えてくれる最高の相棒です。
        </div>
        <div class="btn"><a href="https://www.baidu.com">Read  More</a></div>
      </div>

    </div>

    <div class="partBox4">
      <div class="desc1">心地良さと快適さを探求するJS × COFOだからこそ。</div>
      <div class="desc2">
        共同チームが体現したのは天然無垢材の上質さと使用環境の美しさ。<br/>
        あらゆるライフイベントを想定し、部屋と人に調和する機構を紡ぎました。
      </div>
    </div>

    <div class="partBox5">
      <div class="partItem">
        <img class="img opacityChangeSelector" src="../assets/images/06.jpg" />
        <div class="descWrap">
          <div class="desc1">「天板裏マグネット収納」の美学</div>
          <div class="line"></div>
          <div class="desc2">COFO Deskの画期的な収納機能を踏襲し、「あなたらしい収納」を可能にする天板裏マグネット収納設計を完全導入。デスク周りの収納を自由にカスタマイズできます。</div>
        </div>
      </div>
      <div class="partItem">
        <img class="img opacityChangeSelector" src="../assets/images/07.jpg" />
        <div class="descWrap">
          <div class="desc1">「贅沢な高級天然無垢材」の美学</div>
          <div class="line"></div>
          <div class="desc2">厚さ2.5cmの天然無垢材の天板は温かみのある質感と長年使えるしっかりとした頑強さを併せ待ち、自然味に溢れる優しい肌触りをもたらします。</div>
        </div>
      </div>
    </div>
    <div class="partBox5">
      <div class="partItem">
        <img class="img opacityChangeSelector" src="../assets/images/08.jpg" />
        <div class="descWrap">
          <div class="desc1">「縁部の曲線と色彩感覚」の美学</div>
          <div class="line"></div>
          <div class="desc2">家具としての意匠を尽くす、スタイリッシュで滑らかな人間工学に基づく形状。縁部は様々な作業に調和するカーブを描き、ほど良い色彩の均衡が部屋の雰囲気を格上げします。</div>
        </div>
      </div>
      <div class="partItem">
        <img class="img opacityChangeSelector" src="../assets/images/09.jpg" />
        <div class="descWrap">
          <div class="desc1">「電子機器類の対応端子」の美学</div>
          <div class="line"></div>
          <div class="desc2">現代生活に欠かす事の出来ない様々な電子端末にも完全対応。手元に内蔵されたUSB-C/B端子により充電・給電が可能。ケーブルのわずらわしさを根本から解決します。</div>
        </div>
      </div>
    </div>

    <div class="partBoxBottom">
      <div class="info">
        <div class="title">
          Makuakeにて公開間近!数量限定·特別価格にて<br/>
          自分のために最高の多機能昇降デスクを構成してください!
        </div>
      </div>
      <div class="form">
        <div class="title">電子信箱</div>
        <div class="inputWrap">
          <el-input placeholder="メルマガ登録で最大30%の限定情報をGET!" v-model="inputVal">
            <template slot="append">送信</template>
          </el-input>
        </div>
        <div class="lineBox">
          <div class="part"></div>
          <div class="center">or</div>
          <div class="part"></div>
        </div>
        <div class="buttonWrap">
          <el-input type="button" value="與LINE 連動登録">
            <template slot="append">
              <img class="icon" src="../assets/images/line_icon.svg" />
            </template>
          </el-input>
        </div>
      </div>
      <div class="nav">
        <div class="left">
          <a href="https://www.baidu.com"><img class="logo" src="../assets/images/app_logo_black.svg" /></a>
        </div>
        <div class="right">
          <a href="https://www.baidu.com"><img class="link" src="../assets/images/icon01_black.svg" /></a>
          <a href="https://www.baidu.com"><img class="link" src="../assets/images/icon02_black.svg" /></a>
          <a href="https://www.baidu.com"><img class="link" src="../assets/images/icon03_black.svg" /></a>
          <a href="https://www.baidu.com"><img class="link" src="../assets/images/icon04_black.svg" /></a>
          <a href="https://www.baidu.com"><img class="link" src="../assets/images/icon05_black.svg" /></a>
        </div>
      </div>

      <div class="desc2">
        2016年創業、本社千葉県。癒しを求め続け、チ-ムの中に20年以上のエンジニアを筆頭に長年リラクゼ-ション製品<br/>
        の企画·販売に注力して参りました。今の時代に寄り添った・リラックスメ集中カを高める最高のデスクをより多く<br/>
        の方にお届けすベく、今日も奮聞しております。
      </div>
      <div class="desc3">
        <div class="part">会社名:FOS株式会社</div>
        <div class="part">所在地:〒289-1225千葉県山武市冲渡712-2</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return {
      inputVal: '',
      animateCtrlArr: [
        {
          selectorName: '.scaleBigSelector',
          animateClass: 'scaleBigClass',
        },
        {
          selectorName: '.translateYSelector',
          animateClass: 'translateYClass',
        },
        {
          selectorName: '.opacityChangeSelector',
          animateClass: 'opacityChangeClass',
        },
      ]
    }
  },
  mounted(){
    this.animateCtrlArr.forEach(item => this.observerDOMFun(item.selectorName, item.animateClass));
  }
}
</script>

<style lang="scss" scoped>
@function toRem($val){
  @return ($val/119)+rem;
}
$rem:750rem;
.containerPC {
  font-size: 0;
  background-color: #f8f8f8;
  .partBox1{
    padding-bottom: toRem(76);
    position: relative;
    .bgImage{
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      opacity: 0.1;
    }
    .content{
      position: relative;
      z-index: 1;
    }
    .nav{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: toRem(26) toRem(150) 0 toRem(150);
      .left {
        .logo {
          width: toRem(326);
        }
      }
      .right{
        display: flex;
        .link{
          width: toRem(30);
          height: toRem(30);
          margin-left: toRem(32);
        }
      }
    }
    .info{
      color: #f1eaea;
      text-align: center;
      .desc1{
        font-size: toRem(20);
        margin-top: toRem(104);
        line-height: toRem(40);
        font-weight: bold;
      }
      .desc2{
        font-size: toRem(50);
        margin-top: toRem(30);
        font-weight: bold;
      }
      .desc3{
        font-size: toRem(18);
        margin-top: toRem(56);
        line-height: toRem(26);
      }
    }
    .form{
      padding: toRem(18) toRem(380) 0;
      .title{
        font-size: toRem(12);
        color: #F3F3F3;
      }
      .inputWrap{
        /deep/ .el-input__inner{
          font-size: toRem(14);
          color: #fff;
          height: toRem(36);
          background-color: transparent;
          padding: 0 toRem(40);
          font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        }
        /deep/ .el-input-group__append{
          font-size: toRem(16);
          color: #fff;
          background-color: transparent;
          padding: 0 toRem(10);
        }
      }
      .lineBox{
        margin: toRem(14) 0 0;
        display: flex;
        .part{
          flex: 1;
          height: toRem(1);
          background-color: #f5f5f5;
        }
        .center{
          font-size: toRem(14);
          color: #f5f5f5;
          padding: 0 toRem(20);
          position: relative;
          top: toRem(-10);
          line-height: toRem(14);
        }
      }
      .buttonWrap{
        background-color: #2aac2a;
        border-radius: toRem(3);
        /deep/ .el-input__inner{
          height: toRem(36);
          line-height: toRem(36);
          font-size: toRem(14);
          color: #fff;
          background-color: transparent;
          text-align: center;
          border: none;
          outline: none;
          font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        }
        /deep/ .el-input-group__append{
          border: none;
          border-left: toRem(1) solid #f8f8f8;
          background-color: transparent;
          padding: 0 toRem(10);
        }
        .icon{
          width: toRem(22);
          height: toRem(22);
        }
      }
    }
  }

  .partBox2{
    padding: 0 toRem(126);
    .topWrap{
      padding: toRem(68) 0 toRem(54) 0;
      display: flex;
      .item{
        flex: 1;
        border-right: toRem(1) solid #999;
        text-align: center;
        &:last-child{
          border: none;
        }
        .desc1{
          font-size: toRem(16);
          color: #999;
          padding-top: toRem(38);
        }
        .desc2{
          font-size: toRem(60);
          color: #000;
          font-weight: bold;
          padding-top: toRem(28);
          .unit{
            font-size: toRem(18);
          }
          .number{
            font-size: toRem(36);
          }
          .value{
            font-size: toRem(52);
          }
        }
      }
    }
    .makuake{
      padding: toRem(40) 0;
      border-top: toRem(1) solid #999;
      border-bottom: toRem(1) solid #999;
      display: flex;
      align-items: center;
      margin-bottom: toRem(52);
      .logo{
        width: toRem(270);
        display: block;
        margin: 0 auto;
      }
      .desc{
        font-size: toRem(16);
        color: #999;
        line-height: toRem(32);
        text-align: justify;
        .light{
          font-size: toRem(18);
          color: #666;
          font-weight: bold;
        }
      }
    }
  }

  .partBox3{
    padding-top: toRem(62);
    display: flex;
    .img{
      width: toRem(536);
      opacity: 0.1;
    }
    .imgLeft{
      margin-left: toRem(44);
    }
    .imgRight{
      margin-right: toRem(44);
    }
    .desc{
      flex: 1;
      margin: 0 toRem(100);
      .desc1{
        font-size: toRem(24);
        color: #000;
        padding-top: toRem(66);
        font-weight: bold;
      }
      .desc2{
        font-size: toRem(16);
        color: #000;
        padding-top: toRem(34);
        padding-bottom: toRem(34);
        line-height: toRem(30);
      }
      .desc3{
        border-top: toRem(1) solid #999;
        font-size: toRem(18);
        color: #666;
        line-height: toRem(36);
        padding-top: toRem(34);
        text-align: justify;
      }
    }
  }

  .aboutUSBox{
    margin-top: toRem(78);
    text-align: center;
    overflow: hidden;
    position: relative;

    .bgImage{
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      opacity: 0;
    }
    .content{
      position: relative;
      z-index: 1;
    }
    .title{
      font-size: toRem(24);
      color: #fff;
      padding-top: toRem(146);
    }
    .desc1{
      font-size: toRem(21);
      color: #fff;
      line-height: toRem(46);
      padding-top: toRem(40);
    }
    .desc2{
      font-size: toRem(16);
      color: #f1f1f1;
      line-height: toRem(32);
      padding-top: toRem(56);
    }
    .btn{
      width: toRem(156);
      height: toRem(44);
      background-color: #fff;
      border-radius: toRem(40);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      margin-top: toRem(56);
      margin-bottom: toRem(140);
      a{
        font-size: toRem(20);
        color: #000;
      }
    }
  }

  .partBox4{
    padding: 0 toRem(80);
    .desc1{
      font-size: toRem(26);
      color: #000;
      padding-top: toRem(70);
      font-weight: bold;
    }
    .desc2{
      font-size: toRem(16);
      color: #666;
      padding-top: toRem(32);
      line-height: toRem(28);
    }
  }

  .partBox5{
    padding: 0 toRem(80);
    margin-top: toRem(48);
    display: flex;
    .partItem{
      flex: 1;
      &:nth-child(2n){
        padding-left: toRem(24);
      }
      &:nth-child(2n+1){
        padding-right: toRem(24);
      }
      .img{
        width: 100%;
        opacity: 0.1;
      }
      .descWrap{
        padding: 0 toRem(32);
        background-color: #fff;
        .desc1{
          font-size: toRem(20);
          color: #000;
          padding-top: toRem(34);
          font-weight: bold;
        }
        .line{
          width: toRem(42);
          height: toRem(2);
          background-color: #999;
          margin-top: toRem(20);
        }
        .desc2{
          font-size: toRem(14);
          color: #666;
          padding-top: toRem(20);
          padding-bottom: toRem(34);
          line-height: toRem(32);
          text-align: justify;
        }
      }
    }
  }

  .partBoxBottom{
    .info{
      text-align: center;
      .title{
        color: #000;
        font-size: toRem(18);
        margin-top: toRem(108);
        line-height: toRem(35);
      }
    }

    .form{
      padding: toRem(18) toRem(380) 0;
      .title{
        font-size: toRem(12);
        color: #333;
      }
      .inputWrap{
        /deep/ .el-input__inner{
          font-size: toRem(14);
          height: toRem(36);
          background-color: transparent;
          padding: 0 toRem(40);
          font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
          border: toRem(1) solid #333;
        }
        /deep/ .el-input-group__append{
          font-size: toRem(16);
          color: #000;
          background-color: transparent;
          padding: 0 toRem(10);
          border: toRem(1) solid #333;
          border-left: none;
        }
      }
      .lineBox{
        margin: toRem(14) 0 0;
        display: flex;
        .part{
          flex: 1;
          height: toRem(1);
          background-color: #999;
        }
        .center{
          font-size: toRem(14);
          color: #999;
          padding: 0 toRem(20);
          position: relative;
          top: toRem(-10);
          line-height: toRem(14);
        }
      }
      .buttonWrap{
        background-color: #2aac2a;
        border-radius: toRem(3);
        /deep/ .el-input__inner{
          height: toRem(36);
          line-height: toRem(36);
          font-size: toRem(14);
          color: #fff;
          background-color: transparent;
          text-align: center;
          border: none;
          outline: none;
          font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        }
        /deep/ .el-input-group__append{
          border: none;
          border-left: toRem(1) solid #f8f8f8;
          background-color: transparent;
          padding: 0 toRem(10);
        }
        .icon{
          width: toRem(22);
          height: toRem(22);
        }
      }
    }

    .nav{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: toRem(86) toRem(150) 0 toRem(150);
      .left {
        .logo {
          width: toRem(326);
        }
      }
      .right{
        display: flex;
        .link{
          width: toRem(30);
          height: toRem(30);
          margin-left: toRem(32);
        }
      }
    }

    .desc2{
      color: #999;
      font-size: toRem(14);
      margin-top: toRem(50);
      padding: 0 toRem(40);
      text-align: center;
      line-height: toRem(26);
    }
    .desc3{
      color: #666;
      font-size: toRem(14);
      padding: toRem(30) toRem(340) toRem(96);
      text-align: center;
      display: flex;
      justify-content: space-between;
    }
  }
}

</style>
