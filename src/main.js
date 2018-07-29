import Vue from 'vue'
import App from './App.vue'

//引入首页组件
import index from './components/index.vue'
import goodsInfo from './components/goodsInfo.vue'
//引入路由
import VueRouter from 'vue-router'
//导入ui框架
import ElementUI from 'element-ui';
//导入css
import 'element-ui/lib/theme-chalk/index.css';

import './assets/statics/site/css/style.css'

//导入懒加载
import VueLazyload from 'vue-lazyload'
import path from 'path'
//iview ui框架
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import moment from 'moment'
//引入axios 目的是让所有组件都可以使用
import axios from "axios";

//设置基地址
axios.defaults.baseURL = 'http://47.106.148.205:8899';
//挂载到Vue原型上->vue实例化出来的独享
Vue.prototype.axios = axios;



//element中间件
Vue.use(ElementUI);

//使用中间件
Vue.use(VueRouter)

// 使用懒加载中间件
Vue.use(VueLazyload,{
  // loading:path.join(__dirname,'./assets/statics/img/01.gif')
  loading:require('./assets/statics/img/01.gif')
});
//使用iview
Vue.use(iView);

const router = new VueRouter({
  routes:[
      { 
        path: '/', redirect: '/index'
       },
      { 
        path: '/index',
        component: index 
      },
      {
        path: '/goodsInfo/:id',
        component: goodsInfo
      }
  ]
})

// 注册全局过滤器
Vue.filter('cutTime',function(value){
  return moment(value).format("YYYY年MM月DD日");
});




Vue.config.productionTip = false

new Vue({
  // 选择器
  el:"#app",
  // 挂载到vue
  router,
  // 渲染 App组件
  render: h => h(App)
})