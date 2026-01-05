<template>
<template>
  <div class="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full bg-gray-800 border border-gray-700/50 p-8 sm:p-10 rounded-2xl shadow-2xl shadow-black/50">
      <!-- Header -->
      <div class="text-center mb-8">
        <h2 class="text-2xl font-extrabold text-white tracking-tight">
          ยินดีต้อนรับสู่ระบบจองห้องประชุม
        </h2>
        <p class="text-sm text-gray-400 mt-2">สชป.7</p>
      </div>

      <!-- Tabs -->
      <div class="border-b border-gray-700 mb-6">
        <ul class="flex -mb-px text-sm font-medium text-center">
            <li class="flex-1">
                <button 
                    @click="activeTab = 'google'"
                    :class="[
                        'inline-block p-4 w-full rounded-t-lg transition-all',
                        activeTab === 'google' 
                            ? 'text-cyan-400 border-b-2 border-cyan-500 font-semibold' 
                            : 'text-gray-400 hover:text-gray-300 hover:border-gray-600 border-b-2 border-transparent'
                    ]"
                >
                    <svg class="w-5 h-5 mr-2 inline-block" :class="activeTab === 'google' ? 'text-cyan-400' : 'text-gray-500'" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    Google Login
                </button>
            </li>
            <li class="flex-1">
                <button 
                    @click="activeTab = 'email'"
                    :class="[
                        'inline-block p-4 w-full rounded-t-lg transition-all',
                        activeTab === 'email' 
                            ? 'text-cyan-400 border-b-2 border-cyan-500 font-semibold' 
                            : 'text-gray-400 hover:text-gray-300 hover:border-gray-600 border-b-2 border-transparent'
                    ]"
                >
                    <svg class="w-5 h-5 mr-2 inline-block" :class="activeTab === 'email' ? 'text-cyan-400' : 'text-gray-500'" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                    เจ้าหน้าที่
                </button>
            </li>
        </ul>
      </div>

      <!-- Tab Content -->
      <div class="mt-6">
        <!-- Google Login -->
        <div v-if="activeTab === 'google'" class="space-y-6">
            <p class="text-sm text-gray-400 text-center mb-4">เข้าสู่ระบบด้วยบัญชี Google ของท่าน</p>
            <button @click="handleGoogleLogin" class="group relative w-full flex justify-center items-center py-3 px-4 border border-gray-600 text-sm font-medium rounded-lg text-gray-200 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-800 transition-colors">
                <span class="absolute left-4 inset-y-0 flex items-center">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                </span>
                เข้าสู่ระบบด้วย Google
            </button>
        </div>

        <!-- Email Login -->
        <form v-if="activeTab === 'email'" @submit.prevent="handleEmailLogin" class="space-y-5">
            <div>
                <label for="email" class="block text-sm font-medium text-gray-300 mb-2">อีเมล</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>
                    </div>
                    <input 
                        id="email" 
                        v-model="email" 
                        name="email" 
                        type="email" 
                        autocomplete="email" 
                        required 
                        class="appearance-none block w-full pl-10 pr-3 py-2.5 border bg-gray-700 border-gray-600 placeholder-gray-400 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm transition-all"
                        placeholder="name@example.com"
                    >
                </div>
            </div>

            <div>
                <label for="password" class="block text-sm font-medium text-gray-300 mb-2">รหัสผ่าน</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <input 
                        id="password" 
                        v-model="password" 
                        name="password" 
                        type="password" 
                        autocomplete="current-password" 
                        required 
                        class="appearance-none block w-full pl-10 pr-3 py-2.5 border bg-gray-700 border-gray-600 placeholder-gray-400 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm transition-all"
                        placeholder="••••••••"
                    >
                </div>
            </div>

             <div v-if="isRegistering">
                <label for="confirm-password" class="block text-sm font-medium text-gray-300 mb-2">ยืนยันรหัสผ่าน</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <input 
                        id="confirm-password" 
                        v-model="confirmPassword" 
                        name="confirm-password" 
                        type="password" 
                        required 
                        class="appearance-none block w-full pl-10 pr-3 py-2.5 border bg-gray-700 border-gray-600 placeholder-gray-400 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm transition-all"
                        placeholder="••••••••"
                    >
                </div>
            </div>

            <div class="pt-2">
                <button 
                    type="submit" 
                    :disabled="loading" 
                    class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ loading ? (isRegistering ? 'กำลังสมัครสมาชิก...' : 'กำลังเข้าสู่ระบบ...') : (isRegistering ? 'ยืนยันการสมัคร' : 'เข้าสู่ระบบ') }}
                </button>
            </div>
            
            <div class="text-center mt-4">
                <button type="button" @click="isRegistering = !isRegistering" class="text-sm font-medium text-cyan-400 hover:text-cyan-300 hover:underline">
                    {{ isRegistering ? 'มีบัญชีอยู่แล้ว? เข้าสู่ระบบ' : 'ยังไม่มีบัญชี? สมัครสมาชิก' }}
                </button>
            </div>
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

const activeTab = ref('email')
const isRegistering = ref(false)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
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
        if (isRegistering.value) {
            // Registration Logic
            if (password.value !== confirmPassword.value) {
                throw new Error('รหัสผ่านไม่ตรงกัน')
            }
            if (password.value.length < 6) {
                throw new Error('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร')
            }
            
            await authStore.registerWithEmail(email.value, password.value)
            
            Swal.fire({
                icon: 'success',
                title: 'สมัครสมาชิกสำเร็จ',
                text: 'กรุณารอการอนุมัติสิทธิ์จากเจ้าหน้าที่',
                timer: 2000,
                showConfirmButton: false
            })
            router.push('/')
            
        } else {
            // Login Logic
            await authStore.loginWithEmail(email.value, password.value)
            router.push('/')
        }
    } catch (error) {
        console.error('Auth action failed', error)
        let msg = error.message
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
            msg = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง (หากใช้อีเมลส่วนตัวกรุณาเลือก Login with Google)'
        } else if (error.code === 'auth/email-already-in-use') {
             msg = 'อีเมลนี้ถูกใช้งานแล้ว'
        }
        
        Swal.fire({
            icon: 'error',
            title: isRegistering.value ? 'สมัครสมาชิกไม่สำเร็จ' : 'เข้าสู่ระบบไม่สำเร็จ',
            text: msg,
            confirmButtonColor: '#d33'
        })
    } finally {
        loading.value = false
    }
}
</script>
