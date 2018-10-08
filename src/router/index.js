import Vue from 'vue'
import Router from 'vue-router'
// import Lost from '@/components/Lost'
import Found from '@/components/Found'
import Detail from '@/components/Detail'
// import User from '@/components/User'
// import MyPost from '@/components/MyPost'
// import Post from '@/components/Post'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Found',
      component: Found,
      meta: {
        keepAlive: true
      }
    }, {
      path: '/home/detail/:id',
      name: 'Detail',
      component: Detail
    }
  ]
})
