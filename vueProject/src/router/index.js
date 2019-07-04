import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/index/Index'
import Prize from '@/components/index/Prize'

Vue.use(Router)

export default new Router({
  // mode: 'history', // 去掉url中的#
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/prize',
      name: 'Prize',
      component: Prize
    },
    {
      path: '/vue',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '*',
      redirect: '/'
    } // 路由按顺序从上到下，依次匹配。最后一个*能匹配全部，然后重定向到主页面
  ]
})
