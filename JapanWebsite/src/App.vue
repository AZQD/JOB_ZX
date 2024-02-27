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
  color: #2c3e50;
}
</style>
