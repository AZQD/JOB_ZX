<template>
  <div id="app">

    <keep-alive>
      <router-view/>
    </keep-alive>

  </div>
</template>

<script>
import './assets/css/common.css'
import './assets/js/flexible.js'
  export default {
    data(){
      return {
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
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>
