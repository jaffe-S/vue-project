import Vue from 'vue'
import App from './App.vue'
//2.1导入axios
import axios from "axios"

//3.1导入路由
import VueRouter from "vue-router"

// 1.1.element - 引入
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';

//4.1导入组件
import Login from "./pages/Login.vue"
import Admin from "./pages/Admin.vue"
import GoodsList from "./pages/GoodsList.vue"

// 1.2element - 注册
Vue.use(ElementUI)

//3.2注册路由
Vue.use(VueRouter);

//3.3配置路由
const routes=[
  { path: "/", redirect:"login"},
  { path: "/login", component: Login ,meta:"登陆"},
  {
    path: "/admin", component: Admin, meta: "商品管理",
   children:[
     { path: "goods-list", component: GoodsList, meta: "栏目管理"}
   ]
},

]

//3.4创建路由对象
const router = new VueRouter({ routes })

// 设置导航卫士
router.beforeEach((to,from,next)=>{

  // console.log(to, from)
  //判断当前是不是登陆也
  if(to.path=="/login"){
    return next()
  }
  //判断本地是否有登陆数据
  if(!(localStorage.getItem('username'))){
     //没有登陆过，跳转到登陆页
     return next('/login')

  }else{
    //登陆过,直接进行下一步操作
    next();
  }
})


//是否生成环境
Vue.config.productionTip = false

// 2.2把axios绑定到原型，每个组件都可以通过this.$axios可以访问到
Vue.prototype.$axios = axios;

axios.defaults.baseURL ="http://localhost:8899"

new Vue({
//3.5路由挂载
  router,

  render: h => h(App),
}).$mount('#app')
