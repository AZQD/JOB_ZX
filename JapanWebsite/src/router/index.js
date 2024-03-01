import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// 报错：NavigationDuplicated: Avoided redundant navigation to current location: “/“
// 原因：路由重复导致
//解决方案：
// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      console.log('路由独享的守卫');
      console.log('to', to);
      console.log('from', from);
      console.log('next', next);
      next();
    }
  },
]

const router = new VueRouter({
  // mode: 'hash',//hash模式下，浏览器地址不规整,带有#
  mode: 'history',//history模式下，浏览器地址规整，但需要后台支持
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log('全局前置守卫');
  console.log('to', to);
  console.log('from', from);
  console.log('next', next);
  next();
});

// 全局后置钩子
router.afterEach((to, from) => {
  console.log('全局后置钩子');
  console.log('to', to);
  console.log('from', from);
});

export default router
