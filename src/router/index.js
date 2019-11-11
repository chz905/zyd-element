import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Index = () => import('../views/home/index') //主页
const Echarts = () => import('../views/Home') //主页
const Login = () => import('../views/login') //登录
const bigdata = () => import('../components/bigdata.vue') //数据可视化

//数据统计  statistical
const policeStatistics = () => import('../views/statistical/policeStatistics.vue') //报警统计
const runStatistics = () => import('../views/statistical/runStatistics.vue') //运行数据统计
//车辆监控  carmonitoring
const carTracking = () => import('../views/carmonitoring/carTracking.vue') //车辆跟踪
const carTrajectory = () => import('../views/carmonitoring/carTrajectory.vue') //车辆轨迹
//车辆管理
const carmanagement = () => import('../views/carmanagement') 
//围栏管理
const fencemanagement = () => import('../views/fencemanagement') 
const fencemanagement1 = () => import('../views/fencemanagement/index - 副本.vue') 
//保险管理  insurance
const insurancePlan = () => import('../views/insurance/insurancePlan.vue') //保险套餐
const carInsurance = () => import('../views/insurance/carInsurance.vue') //车辆保险
//修车管理  repair
const storeManagement = () => import('../views/repair/storeManagement.vue') //门店管理
const trailerRecord = () => import('../views/repair/trailerRecord.vue') //拖车记录
//系统设置  setUp
const user = () => import('../views/setUp/user.vue') //用户管理
const trailer = () => import('../views/setUp/trailer.vue') //拖车管理

const routes = [
  {
    path: '/',
    name: 'home',
    component: Index,
    redirect: '/echarts',
    meta: { name: '首页' },
    children:[
      {
        path: '/echarts',
        name: 'echarts',
        component: Echarts,
        meta: { name: '系统总览' },
      },
      {
        path: '/policeStatistics',
        name: 'policeStatistics',
        component: policeStatistics,
        meta: { name: '报警统计' },
      },
      {
        path: '/runStatistics',
        name: 'runStatistics',
        component: runStatistics,
        meta: { name: '运行数据统计' },
      },
      {
        path: '/carTracking',
        name: 'carTracking',
        component: carTracking,
        meta: { name: '车辆跟踪' },
      },
      {
        path: '/carTrajectory',
        name: 'carTrajectory',
        component: carTrajectory,
        meta: { name: '车辆轨迹' },
      },
      {
        path: '/carmanagement',
        name: 'carmanagement',
        component: carmanagement,
        meta: { name: '车辆管理' },
      },
      {
        path: '/fencemanagement',
        name: 'fencemanagement',
        component: fencemanagement,
        meta: { name: '围栏管理' },
      },
      {
        path: '/fencemanagement1',
        name: 'fencemanagement1',
        component: fencemanagement1,
        meta: { name: '围栏管理' },
      },
      {
        path: '/insurancePlan',
        name: 'insurancePlan',
        component: insurancePlan,
        meta: { name: '保险套餐' },
      },
      {
        path: '/carInsurance',
        name: 'carInsurance',
        component: carInsurance,
        meta: { name: '车辆保险' },
      },
      {
        path: '/storeManagement',
        name: 'storeManagement',
        component: storeManagement,
        meta: { name: '门店管理' },
      },
      {
        path: '/trailerRecord',
        name: 'trailerRecord',
        component: trailerRecord,
        meta: { name: '拖车记录' },
      },
      {
        path: '/user',
        name: 'user',
        component: user,
        meta: { name: '用户管理' },
      },
      {
        path: '/trailer',
        name: 'trailer',
        component: trailer,
        meta: { name: '拖车管理' },
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/bigdata',
    name: 'bigdata',
    component: bigdata
  },

  {path : "*" , redirect: '/'}

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.token ? true : false;
  if (to.path == '/login') {
    next();
  } else {
    // 是否在登录状态下
    if (isLogin) {
      next()
    } else {
      next('/login')
    }
  }
});

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
