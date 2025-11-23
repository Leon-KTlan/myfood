import { createRouter, createWebHistory } from 'vue-router'
import SmartCateringLanding from '../components/SmartCateringLanding.vue'
import ExplorePlatform from '../views/ExplorePlatform.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: SmartCateringLanding
  },
  {
    path: '/explore',
    name: 'Explore',
    component: ExplorePlatform
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

