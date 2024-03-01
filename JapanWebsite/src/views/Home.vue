<template>
  <div>
    <index_mobile v-if="isMobile" />
    <index_pc v-else />
  </div>
</template>

<script>
import index_mobile from "@/views/index_mobile";
import index_pc from "@/views/index_pc";
export default {
  name: 'Home',
  data(){
    return {
      isMobile: navigator.userAgent.match( /(phone|pad|pod|iphone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQOBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOs|Symbian|Windows Phone)/i)
    }
  },
  components: {
    index_mobile,
    index_pc
  }
}
</script>
