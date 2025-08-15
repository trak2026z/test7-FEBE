// index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import UsersView from '@/views/UsersView.vue'
const UserDetailsView = () => import('@/views/UserDetailsView.vue')

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Users', component: UsersView },
  { path: '/users/:id', name: 'UserDetails', component: UserDetailsView, props: true },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
