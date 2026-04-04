import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/',        name: 'home',    component: HomeView },
  { path: '/catalog', name: 'catalog', component: () => import('../views/ProductView.vue') },
  { path: '/product/:id', name: 'product', component: () => import('../views/ProductView.vue') },
  { path: '/cart',    name: 'cart',    component: () => import('../views/CartView.vue') },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})