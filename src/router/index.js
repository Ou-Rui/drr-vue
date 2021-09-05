import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/common/Home'
import New from "@/views/doc/New";



Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'doc/new',
        component : New
      }
    ]
  }
]

const router = new Router({
  routes
})

export default router
