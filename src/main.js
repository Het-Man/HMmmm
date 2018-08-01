import Vue from 'vue'
import App from './App.vue'

//引入首页组件
import index from './components/index.vue'
import goodsInfo from './components/goodsInfo.vue'
import buycart from './components/buycart.vue'
import payOrder from './components/payOrder.vue'
import login from './components/login.vue'
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
//引入vuex
import Vuex from 'vuex'


//设置基地址
axios.defaults.baseURL = 'http://47.106.148.205:8899';
//挂载到Vue原型上->vue实例化出来的独享
Vue.prototype.axios = axios;
// 设置带上cookie
axios.defaults.withCredentials = true


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
//引入vuex中间件
Vue.use(Vuex)
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
      },
      {
        path: '/buycart/',
        component: buycart
      },
      {
        path: '/payOrder/',
        component: payOrder
      },
      {
        path: '/login/',
        component: login
      }
  ]
})

// 注册全局过滤器
Vue.filter('cutTime',function(value){
  return moment(value).format("YYYY年MM月DD日");
});


//判断数据是否存在
let buyList = JSON.parse(window.localStorage.getItem('buyList')) || {}

const store = new Vuex.Store({
  state: {
    // buyList:{}
    buyList,
    //判断是否登陆
    isLogin:false
  },
  getters:{
    totalCount(state){
      let num = 0;

      for (const key in state.buyList) {

        num += parseInt(state.buyList[key])
      }

      return num
    }

  },
  mutations: {
    /*
    info{
      goodId:xxx,
      goodNum:xxx
    }
    
    */
   //我们点击加入购物车 把对应的id以及数量存储在vux里的buyList
    buyGood (state,info) {
      //如果有就累加
      if(state.buyList[info.goodId]){

        let oldNum = parseInt(state.buyList[info.goodId]);

        oldNum += parseInt(info.goodNum) 

        state.buyList[info.goodId] = oldNum
      }else{
        //没有就赋值 这种方法 vuex 不会跟踪
        // state.buyList[info.goodId] = info.goodNum
        //Vue.set(obj, 'newProp', 123) 需要使用这种方法
        Vue.set(state.buyList, info.goodId, parseInt(info.goodNum));
      }
    },
    //当购物车的商品件数更改的时候 头顶的购物车也要同步更新 
    //我们这里直接重新赋值比较方便
    changeCount(state,info){
      state.buyList[info.goodId] = info.goodNum;
    },
    //根据id删除数据
    delGoodById(state,id){
      Vue.delete(state.buyList,id)
    },
    //修改登录状态
    changeLogin(state,isLogin){
      state.isLogin = isLogin
    },
    //修改来时的路由
    rememberFromPath(state,path){
      state.fromPath = path
    }
    
  }
})

// 注册路由守卫(每次路由跳转时 增加的过滤规则)
// 🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖
router.beforeEach((to, from, next) => {
  // 从哪来
  // console.log(from);
  // 保存数据
  store.commit('rememberFromPath',from.path);
  // 去订单支付页
  if(to.path=='/payOrder'){
    axios
    .get("/site/account/islogin")
    .then(response => {
      // console.log(response);
      if (response.data.code == "nologin") {
        // console.log("没登录");
        // 打到登录页
        next('/login');
      } else {
        // 登陆了 继续执行即可
        next();
         
      }
    })
    .catch(err => {
      // console.log(err);
    });
  }else{
    // 如果去的不是订单支付页 直接可以访问
    next();
  }
});


Vue.config.productionTip = false

new Vue({
  // 选择器
  el:"#app",
  // 挂载到vue
  router,
  // 渲染 App组件
  render: h => h(App),
  store
})

//数据常驻 页面关闭 以及页面刷新
window.onbeforeunload = function (){
  window.localStorage.setItem('buyList',JSON.stringify(store.state.buyList));
}