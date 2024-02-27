<template>
  <div id="app">

    <keep-alive>
      <router-view/>
    </keep-alive>


  </div>
</template>

<script>
import './assets/css/common.css'
  export default {
    data(){
      return {
        type: 1
      }
    },
    created(){
      console.log('App.vue ---- created');
    }
  }
</script>

<!--scoped：样式作用域为当前组件-->
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

  .el-menu-item{
    a{
      display: block;
    }
  }


//el-cascader 级联选择器，如何隐藏单选框，点击文本直接选中：
//参考：https://blog.csdn.net/cc25485697/article/details/107164094
.el-cascader-panel .el-radio{
  z-index: 10;
  width: 99%;
  height: 99%;
  position: absolute;
  top: 10px;
  right: -12px;
}
.el-cascader-panel .el-radio__input{
  visibility: hidden;
}
.el-cascader-panel .el-cascader-node__postfix{
  top: 10px;
}


//el-dialog自适应高度，仅body内容部分滚动
//参考链接：https://blog.csdn.net/zhaou_csdn/article/details/105242724
.abow_dialog {
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
  .el-dialog {
    margin: 0 auto !important;
    height: 90%;
    overflow: hidden;
    .el-dialog__body {
      position: absolute;
      left: 0;
      top: 54px;
      bottom: 0;
      right: 0;
      padding: 0;
      z-index: 1;
      overflow: hidden;
      overflow-y: auto;
    }
  }
}


//自定义textarea的高度，一般用不到，使用autosize即可；
//.el-textarea__inner{
//  height: 90px;
//  overflow-y: auto; // 兼容ie
//}
</style>
