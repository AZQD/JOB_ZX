<template>
  <div class="containerPC">

    <div class="partBox1">
      <div class="nav">
        <div class="left">
          <img class="logo" src="../assets/images/app_logo_white.png" />
        </div>
        <div class="right">
          <img class="link" src="../assets/images/icon01_white.png" />
          <img class="link" src="../assets/images/icon02_white.png" />
          <img class="link" src="../assets/images/icon03_white.png" />
          <img class="link" src="../assets/images/icon04_white.png" />
          <img class="link" src="../assets/images/icon05_white.png" />
        </div>
      </div>
      <div class="info">
        <div class="desc1">温故知新の真髄を追求し、ここに新生。<br/>JS × COFO 全ライフスタイル対応兼用デスク</div>
        <div class="desc2">"人生を包み込む"<br/>生涯愛用の机。</div>
        <div class="desc3">
          Makuakeにて公開間近!<br/>
          数量限定·特別価格にて自分のために最高の<br/>
          多機能昇降デスクを構成してください!<br/>
        </div>
      </div>
      <div class="form">
        <div class="title">電子信箱</div>
        <div class="inputWrap">
          <el-input placeholder="メルマガ登録で最大30%の限定情報をGET!" v-model="inputVal">
            <template slot="append">送<br/>信</template>
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
              <img class="icon" src="../assets/images/line_icon.png" />
            </template>
          </el-input>
        </div>
      </div>
    </div>

    <div class="partBox2">
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
      </div>
      <div class="num1Wrap">
        <div class="desc1">応援購入総額ランディング</div>
        <div class="desc2">
          デスク部門<span class="unit">No.1</span>
        </div>
      </div>
      <div class="makuake">
        <img class="logo" src="../assets/images/makuake_icon.png" />
        <div class="desc">おかげさまでCOFO Deskシリ-ズはクラウドフアンディングサイト「Makuake」でサオ一夕一数<span class="light">1170</span>人、応援購入総額<span class="light">6400</span>万を突破し、Makuakeデスク部門<span class="light">NO.1</span>を獲得いたしました</div>
      </div>
    </div>

<!--    图片分组-->
    <div class="partBox3">
      <img class="img" src="../assets/images/iphone/02.jpg" />
      <div class="desc1">集中を極めるデスクとして。</div>
      <div class="desc2">画期的な叹納性を有する异降式デスクが、<br/>理想的な才フイス環境を整えます。</div>
      <div class="desc3">座ってでも、立ってでも・昇降テ-プルと贅沢な天然無垢材の上質さを携えた天板が、多彩な作業に最適な空間を提供し、疲労軽減と集中力の強化を実現します。</div>
    </div>
    <div class="partBox3">
      <img class="img" src="../assets/images/iphone/03.jpg" />
      <div class="desc1">団戀を分かち合う食卓として。</div>
      <div class="desc2">温かみと品格を備えたテ-プルが、<br/>ご家庭に美味しさと楽しさを届けます。</div>
      <div class="desc3">部屋のインテリアに豊かに溶け込む、温かくて格式高いダイニングテ-プル。機能や構造面でも安全性と快適性を追求。食卓としても摇るぎない存在感を放ちます。</div>
    </div>
    <div class="partBox3">
      <img class="img" src="../assets/images/iphone/04.jpg" />
      <div class="desc1">寬ぎを導くロ-テ-プルとして。</div>
      <div class="desc2">ソフアにでったりの座卓にも変化、<br/>リラックス空間を存分に味わえます。</div>
      <div class="desc3">昇降機能を用いれば、ソフアや置の上にもしっとりと馴染むロ-テ-プルに姿を変えます。コ-ヒ-を飲んだり、ゲ-ムをしたり、談笑したり。寛ぎの時間をたっぷり楽しめます。</div>
    </div>

    <div class="aboutUSBox">
      <div class="title">About us</div>
      <div class="desc1">
        "スタイル"を持つ人たちに、<br/>
        生涯愛用できる机をお届けしたい。<br/>
        JS × COFOは品格と機能性を兼ね備えた<br/>
        「スタンダード」を追求しました。<br/>
        この机は、ワークデスク・ダイニング・ローテーブル<br/>
        の全てを網羅します。
      </div>
      <div class="desc2">
        仕事をする時は作業台に。<br/>
        食事をする時は食卓に。<br/>
        リラックスをする時は座卓に。<br/>
        鮮烈に部屋に溶け込み人生<br/>
        を支えてくれる最高の相棒です。
      </div>
      <div class="btn">Read  More</div>
    </div>

    <div class="partBox4">
      <div class="desc1">心地良さと快適さを探求する<br/>JS × COFOだからこそ。</div>
      <div class="desc2">
        共同チームが体現したのは天然無垢材の<br/>
        上質さと使用環境の美しさ。<br/>
        あらゆるライフイベントを想定し、部屋と人に<br/>
        調和する機構を紡ぎました。
      </div>
    </div>

    <div class="partBox5">
      <img class="img" src="../assets/images/iphone/06.jpg" />
      <div class="descWrap">
        <div class="desc1">「天板裏マグネット収納」の美学</div>
        <div class="line"></div>
        <div class="desc2">COFO Deskの画期的な収納機能を踏襲し、「あなたらしい収納」を可能にする天板裏マグネット収納設計を完全導入。デスク周りの収納を自由にカスタマイズできます。</div>
      </div>
    </div>
    <div class="partBox5">
      <img class="img" src="../assets/images/iphone/07.jpg" />
      <div class="descWrap">
        <div class="desc1">「贅沢な高級天然無垢材」の美学</div>
        <div class="line"></div>
        <div class="desc2">厚さ2.5cmの天然無垢材の天板は温かみのある質感と長年使えるしっかりとした頑強さを併せ待ち、自然味に溢れる優しい肌触りをもたらします。</div>
      </div>
    </div>
    <div class="partBox5">
      <img class="img" src="../assets/images/iphone/08.jpg" />
      <div class="descWrap">
        <div class="desc1">「縁部の曲線と色彩感覚」の美学</div>
        <div class="line"></div>
        <div class="desc2">家具としての意匠を尽くす、スタイリッシュで滑らかな人間工学に基づく形状。縁部は様々な作業に調和するカーブを描き、ほど良い色彩の均衡が部屋の雰囲気を格上げします。</div>
      </div>
    </div>
    <div class="partBox5">
      <img class="img" src="../assets/images/Mac/09.jpg" />
      <div class="descWrap">
        <div class="desc1">「電子機器類の対応端子」の美学</div>
        <div class="line"></div>
        <div class="desc2">現代生活に欠かす事の出来ない様々な電子端末にも完全対応。手元に内蔵されたUSB-C/B端子により充電・給電が可能。ケーブルのわずらわしさを根本から解決します。</div>
      </div>
    </div>

    <div class="partBoxBottom">
      <div class="info">
        <div class="desc3">
          Makuakeにて公開間近!<br/>
          数量限定·特別価格にて自分のために最高の<br/>
          多機能昇降デスクを構成してください!<br/>
        </div>
      </div>
      <div class="form">
        <div class="title">電子信箱</div>
        <div class="inputWrap">
          <el-input placeholder="メルマガ登録で最大30%の限定情報をGET!" v-model="inputVal">
            <template slot="append">送<br/>信</template>
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
              <img class="icon" src="../assets/images/line_icon.png" />
            </template>
          </el-input>
        </div>
      </div>
      <div class="nav">
        <div class="left">
          <img class="logo" src="../assets/images/app_logo_black.png" />
        </div>
        <div class="right">
          <img class="link" src="../assets/images/icon01_black.png" />
          <img class="link" src="../assets/images/icon02_black.png" />
          <img class="link" src="../assets/images/icon03_black.png" />
          <img class="link" src="../assets/images/icon04_black.png" />
          <img class="link" src="../assets/images/icon05_black.png" />
        </div>
      </div>

      <div class="desc2">
        2016年創業、本社千葉県。癒しを求め続け、チ-ムの中に20年以上のエンジニアを筆頭に長年リラクゼ-ション製品の企画·販売に注力して参りました。今の時代に寄り添った・リラックスメ集中カを高める最高のデスクをより多くの方にお届けすベく、今日も奮聞しております。
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
      inputVal: ''
    }
  },
  components: {
    // HelloWorld
  }
}
</script>

<style lang="scss" scoped>
@function toRem($val){
  @return ($val/78.6)+rem;
}
$rem:750rem;
.containerPC {
  font-size: 0;
  background-color: #f8f8f8;
  .partBox1{
    //width: 100/$rem;
    width: toRem(786);
    //width: 10rem;
    //height: 200px;
    background: url("../assets/images/iphone/01.jpg") no-repeat center;
    background-size: cover;
    padding-bottom: toRem(200);
    .nav{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: toRem(110) toRem(36) 0 toRem(40);
      .left {
        .logo {
          width: toRem(300);
        }
      }
      .right{
        display: flex;
        .link{
          width: toRem(32);
          height: toRem(32);
          margin-left: toRem(36);
        }
      }
    }
    .info{
      color: #f1eaea;
      text-align: center;
      .desc1{
        font-size: toRem(24);
        margin-top: toRem(150);
        line-height: toRem(50);
        font-weight: bold;
      }
      .desc2{
        font-size: toRem(70);
        margin-top: toRem(60);
        line-height: toRem(130);
        font-weight: bold;
      }
      .desc3{
        font-size: toRem(28);
        margin-top: toRem(150);
        line-height: toRem(65);
      }
    }
    .form{
      padding: toRem(65) toRem(65) 0;
      .title{
        font-size: toRem(22);
        color: #F3F3F3;
      }
      .inputWrap{
        /deep/ .el-input__inner{
          font-size: toRem(36);
          color: #fff;
          height: toRem(106);
          background-color: transparent;
          padding: 0 toRem(36);
          font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        }
        /deep/ .el-input-group__append{
          font-size: toRem(36);
          color: #fff;
          background-color: transparent;
        }
      }
      .lineBox{
        margin: toRem(50) 0 toRem(30);
        display: flex;
        .part{
          flex: 1;
          height: toRem(1);
          background-color: #f5f5f5;
        }
        .center{
          font-size: toRem(16);
          color: #f5f5f5;
          padding: 0 toRem(30);
          position: relative;
          top: toRem(-10);
        }
      }
      .buttonWrap{
        background-color: #2aac2a;
        border-radius: toRem(10);
        /deep/ .el-input__inner{
          height: toRem(106);
          font-size: toRem(26);
          color: #fff;
          background-color: transparent;
          text-align: center;
          border: none;
          outline: none;
          font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        }
        /deep/ .el-input-group__append{
          border: none;
          border-left: toRem(2) solid #999;
          border-radius: 20%;
          background-color: transparent;
        }
        .icon{
          width: toRem(50);
          height: toRem(50);
        }
      }
    }
  }

  .partBox2{
    .topWrap{
      padding: toRem(56) 0 toRem(70) 0;
      display: flex;
      .item{
        flex: 1;
        border-right: toRem(1) solid #999;
        text-align: center;
        &:last-child{
          border: none;
        }
        .desc1{
          font-size: toRem(26);
          color: #999;
          padding-top: toRem(50);
        }
        .desc2{
          font-size: toRem(80);
          color: #000;
          font-weight: bold;
          padding-top: toRem(30);
          .unit{
            font-size: toRem(26);
          }
        }
      }
    }
    .num1Wrap{
      margin: 0 toRem(110);
      border-top: toRem(1) solid #999;
      border-bottom: toRem(1) solid #999;
      text-align: center;
      .desc1{
        font-size: toRem(26);
        color: #999;
        padding-top: toRem(80);
      }
      .desc2{
        font-size: toRem(40);
        color: #000;
        font-weight: bold;
        padding-top: toRem(20);
        padding-bottom: toRem(70);
        .unit{
          font-size: toRem(80);
        }
      }
    }
    .makuake{
      padding: 0 toRem(62) toRem(120);
      .logo{
        width: toRem(400);
        display: block;
        margin: 0 auto;
        margin-top: toRem(55);
        margin-bottom: toRem(45);
      }
      .desc{
        font-size: toRem(34);
        color: #999;
        line-height: toRem(68);
        text-align: justify;
        .light{
          font-size: toRem(38);
          color: #666;
          font-weight: bold;
        }
      }
    }
  }

  .partBox3{
    padding: 0 toRem(80);
    .img{
      width: 100%;
    }
    .desc1{
      font-size: toRem(42);
      color: #000;
      padding-top: toRem(60);
      font-weight: bold;
    }
    .desc2{
      font-size: toRem(24);
      color: #000;
      padding-top: toRem(45);
      padding-bottom: toRem(50);
      line-height: toRem(44);
    }
    .desc3{
      border-top: toRem(1) solid #999;
      font-size: toRem(28);
      color: #666;
      line-height: toRem(58);
      padding-top: toRem(50);
      padding-bottom: toRem(70);
      text-align: justify;
    }
  }

  .aboutUSBox{
    background: url("../assets/images/iphone/05.jpg") no-repeat center;
    background-size: 100% 100%;
    text-align: center;
    overflow: hidden;
    .title{
      font-size: toRem(42);
      color: #fff;
      padding-top: toRem(230);
    }
    .desc1{
      font-size: toRem(28);
      color: #fff;
      line-height: toRem(64);
      padding-top: toRem(94);
    }
    .desc2{
      font-size: toRem(24);
      color: #fff;
      line-height: toRem(60);
      padding-top: toRem(140);
    }
    .btn{
      width: toRem(350);
      height: toRem(94);
      background-color: #fff;
      border-radius: toRem(94);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: toRem(44);
      color: #000;
      margin: 0 auto;
      margin-top: toRem(110);
      margin-bottom: toRem(280);
    }
  }

  .partBox4{
    padding: 0 toRem(80);
    .desc1{
      font-size: toRem(36);
      color: #000;
      padding-top: toRem(150);
      font-weight: bold;
    }
    .desc2{
      font-size: toRem(24);
      color: #666;
      padding-top: toRem(66);
      padding-bottom: toRem(90);
      line-height: toRem(44);
    }
  }

  .partBox5{
    padding: 0 toRem(80);
    margin-top: toRem(30);
    .img{
      width: 100%;
    }
    .descWrap{
      padding: 0 toRem(50);
      background-color: #fff;
      .desc1{
        font-size: toRem(34);
        color: #000;
        padding-top: toRem(44);
        font-weight: bold;
      }
      .line{
        width: toRem(60);
        height: toRem(1);
        background-color: #999;
        margin-top: toRem(28);
      }
      .desc2{
        font-size: toRem(22);
        color: #666;
        padding-top: toRem(28);
        padding-bottom: toRem(46);
        line-height: toRem(44);
      }
    }
  }

  .partBoxBottom{
    .info{
      text-align: center;
      .desc3{
        color: #333;
        font-size: toRem(28);
        margin-top: toRem(70);
        line-height: toRem(65);
      }
    }
    .form{
      padding: toRem(50) toRem(65) 0;
      .title{
        font-size: toRem(22);
        color: #333;
      }
      .inputWrap{
        /deep/ .el-input__inner{
          font-size: toRem(36);
          height: toRem(106);
          background-color: transparent;
          padding: 0 toRem(36);
          font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
          border: toRem(1) solid #333;
        }
        /deep/ .el-input-group__append{
          font-size: toRem(36);
          color: #000;
          background-color: transparent;
          border: toRem(1) solid #333;
        }
      }
      .lineBox{
        margin: toRem(50) 0 toRem(30);
        display: flex;
        .part{
          flex: 1;
          height: toRem(1);
          background-color: #f5f5f5;
        }
        .center{
          font-size: toRem(16);
          color: #f5f5f5;
          padding: 0 toRem(30);
          position: relative;
          top: toRem(-10);
        }
      }
      .buttonWrap{
        background-color: #2aac2a;
        border-radius: toRem(10);
        /deep/ .el-input__inner{
          height: toRem(106);
          font-size: toRem(26);
          color: #fff;
          background-color: transparent;
          text-align: center;
          border: none;
          outline: none;
          font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        }
        /deep/ .el-input-group__append{
          border: none;
          border-left: toRem(2) solid #777;
          border-radius: 20%;
          background-color: transparent;
        }
        .icon{
          width: toRem(50);
          height: toRem(50);
        }
      }
    }
    .nav{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: toRem(90) toRem(36) 0 toRem(40);
      .left {
        .logo {
          width: toRem(300);
        }
      }
      .right{
        display: flex;
        .link{
          width: toRem(32);
          height: toRem(32);
          margin-left: toRem(36);
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
      color: #333;
      font-size: toRem(14);
      padding: toRem(30) toRem(120) toRem(90);
      text-align: center;
      display: flex;
      justify-content: space-between;
    }
  }
}

</style>
