<template>
  <div class="containerPC">
    <div class="topBox">
      <div class="nav">
        <div class="left">
          <img class="logo" src="../assets/logo.png" />
        </div>
        <div class="right">
          <img class="link" src="../assets/logo.png" />
          <img class="link" src="../assets/logo.png" />
        </div>
      </div>
      <div class="info">
        <div class="desc1">a手动阀手动阀收到罚单手动阀<br/>手动阀拉萨的风</div>
        <div class="desc2">a手动阀手动阀手动阀拉萨的风</div>
        <div class="desc3">a手动阀手动阀手动阀拉萨的风</div>
      </div>
      <div class="form">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    // HelloWorld
  }
}
</script>

<style lang="scss" scoped>

.containerPC {
  .topBox{
    width: 100%;
    height: 200px;
    background: url("../assets/images/Mac/01.jpg") no-repeat center center;
    background-size: 100% 100%;
    .nav{
      display: flex;
      align-items: center;
      justify-content: space-around;
      .left {
        .logo {
          width: 200px;
          height: 100px;
        }
      }
      .right{
        background-color: red;
        display: flex;
        .link{
          width: 16px;
          height: 16px;
        }
      }
    }
    .info{
      color: #fff;
      text-align: center;
    }
    .form{

    }
  }
}

</style>
