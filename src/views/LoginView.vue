<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div>
        <h2 class="mt-2 text-center text-3xl font-extrabold text-gray-900">
          ลงชื่อเข้าใช้ระบบ
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          เพื่อเข้าใช้งานระบบจองห้องประชุม
        </p>
      </div>

      <!-- Tabs -->
      <div class="border-b border-gray-200 dark:border-gray-700">
        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li class="mr-2 w-1/2">
                <button 
                    @click="activeTab = 'google'"
                    :class="[
                        'inline-block p-4 rounded-t-lg w-full group',
                        activeTab === 'google' 
                            ? 'text-blue-600 border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500' 
                            : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                    ]"
                >
                    <svg class="w-5 h-5 mr-2 inline-block text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" :class="{'text-blue-600 dark:text-blue-500': activeTab === 'google'}" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    Google Login
                </button>
            </li>
            <li class="mr-2 w-1/2">
                <button 
                    @click="activeTab = 'email'"
                    :class="[
                        'inline-block p-4 rounded-t-lg w-full group',
                        activeTab === 'email' 
                            ? 'text-blue-600 border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500' 
                            : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                    ]"
                >
                    <svg class="w-5 h-5 mr-2 inline-block text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" :class="{'text-blue-600 dark:text-blue-500': activeTab === 'email'}" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                    เจ้าหน้าที่
                </button>
            </li>
        </ul>
      </div>

      <!-- Tab Content -->
      <div class="mt-6">
        <!-- Google Login -->
        <div v-if="activeTab === 'google'" class="space-y-6">
            <p class="text-sm text-gray-500 text-center">เข้าสู่ระบบด้วยบัญชี Google ของท่าน</p>
            <button @click="handleGoogleLogin" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg class="w-5 h-5 text-red-500 group-hover:text-red-400 bg-white rounded-full p-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style="display: block;">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                </span>
                เข้าสู่ระบบด้วย Google
            </button>
        </div>

        <!-- Email Login -->
        <form v-if="activeTab === 'email'" @submit.prevent="handleEmailLogin" class="space-y-6">
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">อีเมล</label>
                <div class="mt-1">
                    <input id="email" v-model="email" name="email" type="email" autocomplete="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
            </div>

            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
                <div class="mt-1">
                    <input id="password" v-model="password" name="password" type="password" autocomplete="current-password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
            </div>

            <div>
                <button type="submit" :disabled="loading" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300">
                    <span v-if="loading" class="mr-2">
                        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    </span>
                    {{ loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ' }}
                </button>
            </div>
            <p class="text-xs text-center text-gray-500">สำหรับเจ้าหน้าที่ที่มีบัญชีผู้ใช้งานแล้ว</p>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const authStore = useAuthStore()
const router = useRouter()

const activeTab = ref('google')
const email = ref('')
const password = ref('')
const loading = ref(false)

const handleGoogleLogin = async () => {
  try {
    await authStore.loginWithGoogle()
    router.push('/')
  } catch (error) {
    console.error('Google Login failed', error)
    Swal.fire({
      icon: 'error',
      title: 'เข้าสู่ระบบไม่สำเร็จ',
      text: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับ Google',
      confirmButtonColor: '#d33'
    })
  }
}

const handleEmailLogin = async () => {
    loading.value = true
    try {
        await authStore.loginWithEmail(email.value, password.value)
        router.push('/')
    } catch (error) {
        console.error('Email Login failed', error)
        let msg = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
        if (error.code === 'auth/user-not-found') msg = 'ไม่พบผู้ใช้งานนี้ในระบบ'
        if (error.code === 'auth/wrong-password') msg = 'รหัสผ่านไม่ถูกต้อง'
        
        Swal.fire({
            icon: 'error',
            title: 'เข้าสู่ระบบไม่สำเร็จ',
            text: msg,
            confirmButtonColor: '#d33'
        })
    } finally {
        loading.value = false
    }
}
</script>
