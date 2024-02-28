<template>
  <div class="containerPC">
    <div class="topBox">
      <div class="nav">
        <div class="left">
          <img class="logo" src="../assets/images/temp_icon.png" />
        </div>
        <div class="right">
          <img class="link" src="../assets/images/temp_icon.png" />
          <img class="link" src="../assets/images/temp_icon.png" />
          <img class="link" src="../assets/images/temp_icon.png" />
          <img class="link" src="../assets/images/temp_icon.png" />
          <img class="link" src="../assets/images/temp_icon.png" />
        </div>
      </div>
      <div class="info">
        <div class="desc1">温故知新の真髄を追求し、ここに新生。<br/>JS × COFO 全ライフスタイル対応兼用デスク</div>
        <div class="desc2">"人生を包み込む"<br/>生涯愛用の机。</div>
        <div class="desc3">
          测试文本测试文本测试文本<br/>
          测试文本测试文本测试文本测试文本测试文本<br/>
          测试文本测试文本测试文本测试文本<br/>
        </div>
      </div>
      <div class="form">


        <div class="title">测试文本</div>
        <div class="inputWrap">
          <el-input placeholder="测试文本测试文本测试文本" v-model="inputVal">
            <template slot="append">送<br/>信</template>
          </el-input>
        </div>

        <el-divider>or</el-divider>

        <div class="buttonWrap">
          <el-input type="button" placeholder="请输入内容" value="测试文本">
            <template slot="append">
              <img class="icon" src="../assets/images/temp_icon.png" />
            </template>
          </el-input>
        </div>


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
  .topBox{
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
          width: toRem(315);
          height: toRem(100);
        }
      }
      .right{
        display: flex;
        .link{
          width: toRem(34);
          height: toRem(34);
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
          height: toRem(106);
          font-size: toRem(26);
          background-color: transparent;
          padding: 0 toRem(42);
          font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        }
        /deep/ .el-input-group__append{
          font-size: toRem(36);
          color: #fff;
          background-color: transparent;
        }
      }
      /deep/ .el-divider{
        margin: toRem(50) 0;
        background-color: #DCDFE6;
        .el-divider__text{
          color: #DCDFE6;
          background-color: transparent;
        }
      }
      .buttonWrap{
        background-color: #1ac11a;
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
}

</style>
