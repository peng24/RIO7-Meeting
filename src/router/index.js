import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import HomeView from '../views/HomeView.vue'
import BookingView from '../views/BookingView.vue'
import CalendarView from '../views/CalendarView.vue'
import AdminView from '../views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/LoginView.vue')
        },
        {
          path: 'booking',
          name: 'booking',
          component: BookingView
        },
        {
          path: 'calendar',
          name: 'calendar',
          component: CalendarView
        },
        {
            path: 'admin',
            name: 'admin',
            component: AdminView,
            beforeEnter: (to, from, next) => {
                const authStore = useAuthStore()
                if (authStore.isAdmin) {
                    next()
                } else {
                    next('/')
                }
            }
        }
      ]
    }
  ]
})

import { useAuthStore } from '../stores/auth'

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.name === 'booking' && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
