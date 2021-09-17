import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/common/Home'
import DocNew from "@/views/doc/DocNew";
import DocArchives from "@/views/doc/DocArchives";
import DocView from "@/views/doc/DocView";


Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'doc/new',
        component : DocNew
      },
      {
        path: 'doc/archives',
        component: DocArchives
      },
      {
        path: 'doc/view/:id',
        component: DocView
      }
    ]
  }
]

const router = new Router({
  routes
})

export default router
