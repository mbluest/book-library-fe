import { createRouter, createWebHistory } from 'vue-router'
import BaseView from '../views/BaseView.vue'
import member from './member.js'
import book from './book.js'
import history from './history.js'
import admin from './admin.js'

let menus = []
menus = menus.concat(member, book, history, admin)

const routes = [
  {
    path: '/',
    name: 'Home',
    role: [0],
    component: BaseView,
    children: menus,
  },
  {
    path: '/not-have-access',
    name: 'NotHaveAccess',
    role: [0],
    component: () => import(/* webpackChunkName: "about" */ '../views/NotHaveAccess.vue')
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
