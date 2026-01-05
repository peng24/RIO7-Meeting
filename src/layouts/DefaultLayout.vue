<template>
  <div class="antialiased bg-gray-50 dark:bg-gray-900 min-h-screen">
    <!-- Navbar -->
    <nav class="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <div class="flex flex-wrap justify-between items-center">
        <div class="flex justify-start items-center">
          <button
            @click="toggleSidebar"
            class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Toggle sidebar</span>
          </button>
          <a href="#" class="flex items-center justify-between mr-4">
            <span class="self-center text-lg sm:text-xl font-bold whitespace-nowrap dark:text-white truncate max-w-[200px] sm:max-w-none">ระบบจองห้องประชุม สำนักงานชลประทานที่ 7</span>
          </a>
        </div>
        <div class="flex items-center lg:order-2">
          <template v-if="authStore.isAuthenticated && authStore.user">
             <button
              type="button"
              class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="dropdown"
            >
              <span class="sr-only">Open user menu</span>
              <img v-if="authStore.user?.photoURL" class="w-8 h-8 rounded-full object-cover" :src="authStore.user.photoURL" alt="user photo" />
              <div v-else class="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                <svg class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </button>
            <!-- Dropdown menu -->
            <div
              class="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              id="dropdown"
            >
              <div class="py-3 px-4">
                <span class="block text-sm font-semibold text-gray-900 dark:text-white">
                  {{ authStore.user.displayName || authStore.user.email }} 
                  <span class="text-xs font-normal text-gray-500">({{ authStore.role }})</span>
                </span>
                <span class="block text-sm text-gray-500 truncate dark:text-gray-400">{{ authStore.user.email }}</span>
              </div>
              <ul class="py-1 text-gray-500 dark:text-gray-400" aria-labelledby="user-menu-button">
                 <li v-if="authStore.isAdmin">
                    <router-link
                       to="/admin"
                       class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                     >
                       จัดการสมาชิก
                     </router-link>
                 </li>
                <li>
                  <a
                    href="#"
                    @click.prevent="handleLogout"
                    class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                    >Sign out</a
                  >
                </li>
              </ul>
            </div>
          </template>
           <template v-else>
            <router-link
              to="/login"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Login
            </router-link>
          </template>
        </div>
      </div>
    </nav>

    <!-- Sidebar -->
    <aside
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-gradient-to-b from-slate-900 via-[#0B1120] to-gray-900 border-r border-gray-800/50 md:translate-x-0"
      :class="{ 'transform-none': isSidebarOpen }"
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <!-- Logo Section -->
      <div class="px-4 pt-6 pb-4 border-b border-gray-800">
        <div class="flex items-center space-x-3">
          <!-- Water Drop Icon -->
          <svg class="w-10 h-10 flex-shrink-0" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4C20 4 10 16 10 24C10 29.5228 14.4772 34 20 34C25.5228 34 30 29.5228 30 24C30 16 20 4 20 4Z" 
                  fill="url(#waterGradient)" stroke="white" stroke-width="1.5"/>
            <circle cx="16" cy="22" r="2.5" fill="white" opacity="0.4"/>
            <defs>
              <linearGradient id="waterGradient" x1="20" y1="4" x2="20" y2="34" gradientUnits="userSpaceOnUse">
                <stop stop-color="#67E8F9"/>
                <stop offset="1" stop-color="#06B6D4"/>
              </linearGradient>
            </defs>
          </svg>
          <!-- Text -->
          <div class="flex flex-col">
            <span class="text-white font-bold text-lg leading-tight">Smart Meeting</span>
            <span class="text-cyan-300 text-xs font-medium tracking-wide">RIO 7</span>
          </div>
        </div>
      </div>

      <div class="overflow-y-auto py-6 px-4 h-[calc(100%-180px)]">
        <ul class="space-y-2">
          <li>
            <router-link
              to="/"
              class="flex items-center p-3 text-base font-medium text-gray-400 rounded-xl hover:text-cyan-300 hover:bg-white/5 transition-all duration-200 group"
              active-class="bg-cyan-500/10 text-cyan-400 font-bold border-l-4 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            >
              <svg aria-hidden="true" class="w-6 h-6 transition duration-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
              <span class="ml-3">Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link
              v-if="authStore.isAuthenticated"
              to="/booking"
              class="flex items-center p-3 text-base font-medium text-gray-400 rounded-xl hover:text-cyan-300 hover:bg-white/5 transition-all duration-200 group"
              active-class="bg-cyan-500/10 text-cyan-400 font-bold border-l-4 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            >
              <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 transition duration-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
              <span class="ml-3">จองห้องประชุม</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/calendar"
              class="flex items-center p-3 text-base font-medium text-gray-400 rounded-xl hover:text-cyan-300 hover:bg-white/5 transition-all duration-200 group"
              active-class="bg-cyan-500/10 text-cyan-400 font-bold border-l-4 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            >
              <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 transition duration-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
              <span class="ml-3">ปฏิทิน</span>
            </router-link>
          </li>
        </ul>
      </div>
      
       <!-- Footer in Sidebar -->
       <div class="absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-gray-900/80 border-t border-gray-800 z-20">
          <div class="text-xs text-center text-gray-400">
             <p>จัดทำโดย ฝ่ายประชาสัมพันธ์และสารสนเทศ สชป.7</p>
             <p class="text-cyan-400 font-semibold mt-1">โทร 408</p>
          </div>
       </div>
    </aside>

    <main class="p-4 md:ml-64 h-auto pt-20">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { initFlowbite } from 'flowbite'

const authStore = useAuthStore()
const router = useRouter()
const isSidebarOpen = ref(false)

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
}

onMounted(() => {
    initFlowbite()
})
</script>
