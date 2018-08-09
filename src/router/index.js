import Vue from 'vue'
import Router from 'vue-router'
import Lost from '@/components/Lost'
import Found from '@/components/Found'
import Detail from '@/components/Detail'
import User from '@/components/User'
import MyPost from '@/components/MyPost'
import Post from '@/components/Post'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home/lost',
      name: 'Lost',
      component: Lost,
      meta: {
        keepAlive: true // true 表示需要使用缓存
      }
    }, {
      path: '/home/found',
      name: 'Found',
      component: Found,
      meta: {
        keepAlive: true
      }
    }, {
      path: '/home/detail/:id',
      name: 'Detail',
      component: Detail
    }, {
      path: '/home/user',
      name: 'User',
      component: User
    }, {
      path: '/home/mypost',
      name: 'MyPost',
      component: MyPost,
      meta: {
        keepAlive: true
      }
    }, {
      path: '/home/post',
      name: 'Post',
      component: Post,
      meta: {
        keepAlive: true
      }
    }
  ]
})
