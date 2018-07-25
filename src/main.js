import Vue from 'vue'
import App from './App.vue'

//引入路由
import VueRouter from 'vue-router'

//引入首页组件
import index from './components/index.vue'

//使用中间件
Vue.use(VueRouter)


const router = new VueRouter({
  routes:[
      { 
        path: '/index',
        component: index 
        }
  ]
})

import './assets/statics/site/css/style.css'

Vue.config.productionTip = false

new Vue({
  // 选择器
  el:"#app",
  // 挂载到vue
  router,
  // 渲染 App组件
  render: h => h(App)
})