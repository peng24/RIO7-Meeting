<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black">
    <div class="w-full max-w-md bg-gray-800/80 backdrop-blur-xl border border-gray-700 rounded-3xl shadow-2xl overflow-hidden relative">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-2 bg-cyan-500 blur-[50px] opacity-40"></div>

      <div class="p-8 sm:p-10">
        <div class="text-center mb-10">
          <h1 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
            ระบบจองห้องประชุม
          </h1>
          <p class="text-gray-400 text-sm tracking-wide">สำนักงานชลประทานที่ 7</p>
        </div>

        <div class="flex mb-8 bg-gray-900/50 p-1 rounded-xl">
          <button 
            @click="activeTab = 'staff'"
            :class="[
              'flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300',
              activeTab === 'staff' 
                ? 'bg-gray-700 text-white shadow-lg' 
                : 'text-gray-500 hover:text-gray-300'
            ]"
          >
            เจ้าหน้าที่
          </button>
          <button 
            @click="activeTab = 'google'"
            :class="[
              'flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300',
              activeTab === 'google' 
                ? 'bg-gray-700 text-white shadow-lg' 
                : 'text-gray-500 hover:text-gray-300'
            ]"
          >
            Google Login
          </button>
        </div>

        <div v-if="activeTab === 'staff'" class="space-y-6">
          <div v-if="!isRegister">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-1">อีเมล</label>
                <input v-model="email" type="email" placeholder="user@rio7.local" 
                  class="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-1">รหัสผ่าน</label>
                <input v-model="password" type="password" placeholder="••••••••" 
                  class="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all">
              </div>
            </div>
            
            <button @click="handleEmailLogin" :disabled="loading"
              class="w-full mt-6 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              <span v-if="loading">กำลังเข้าสู่ระบบ...</span>
              <span v-else>เข้าสู่ระบบ</span>
            </button>

            <p class="mt-6 text-center text-sm text-gray-400">
              ยังไม่มีบัญชี? 
              <a href="#" @click.prevent="isRegister = true" class="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">สมัครสมาชิก</a>
            </p>
          </div>

          <div v-else>
            <div class="space-y-4">
               <div>
                <label class="block text-sm font-medium text-gray-400 mb-1">อีเมล</label>
                <input v-model="email" type="email" placeholder="user@rio7.local" 
                  class="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-1">รหัสผ่าน</label>
                <input v-model="password" type="password" placeholder="กำหนดรหัสผ่าน" 
                  class="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-1">ยืนยันรหัสผ่าน</label>
                <input v-model="confirmPassword" type="password" placeholder="ยืนยันรหัสผ่านอีกครั้ง" 
                  class="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all">
              </div>
            </div>

            <button @click="handleRegister" :disabled="loading"
              class="w-full mt-6 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-green-500/20 transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              <span v-if="loading">กำลังสมัคร...</span>
              <span v-else>ยืนยันการสมัคร</span>
            </button>

            <p class="mt-6 text-center text-sm text-gray-400">
              มีบัญชีอยู่แล้ว? 
              <a href="#" @click.prevent="isRegister = false" class="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">เข้าสู่ระบบ</a>
            </p>
          </div>
        </div>

        <div v-if="activeTab === 'google'" class="flex flex-col items-center justify-center space-y-6 py-4">
          <p class="text-gray-400 text-sm">เข้าใช้งานด้วยบัญชี Google ของท่าน</p>
          <button @click="handleGoogleLogin" :disabled="loading"
            class="w-full py-3.5 bg-white hover:bg-gray-50 text-gray-900 font-bold rounded-xl shadow-lg transform hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            เข้าสู่ระบบด้วย Google
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const authStore = useAuthStore();
const router = useRouter();

const activeTab = ref('staff'); // Default to staff
const isRegister = ref(false);
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);

const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'รหัสผ่านไม่ถูกต้อง (หรือไม่มีผู้ใช้งานนี้)';
    case 'auth/user-not-found':
      return 'ไม่พบผู้ใช้งานนี้';
    case 'auth/email-already-in-use':
      return 'อีเมลนี้มีผู้ใช้งานแล้ว';
    case 'auth/too-many-requests':
      return 'ล็อกอินบ่อยเกินไป กรุณารอสักครู่';
    case 'auth/invalid-email':
       return 'รูปแบบอีเมลไม่ถูกต้อง';
    default:
      return 'เกิดข้อผิดพลาด: ' + errorCode;
  }
};

onMounted(async () => {
  // Auto logout on mount to prevent stale sessions
  await authStore.logout();
});

const handleGoogleLogin = async () => {
  loading.value = true;
  try {
    await authStore.loginWithGoogle();
    router.push('/');
  } catch (error) {
    Swal.fire('Error', getErrorMessage(error.code) || error.message, 'error');
  } finally {
    loading.value = false;
  }
};

const handleEmailLogin = async () => {
  if (!email.value || !password.value) {
    Swal.fire('แจ้งเตือน', 'กรุณากรอกข้อมูลให้ครบถ้วน', 'warning');
    return;
  }
  loading.value = true;
  try {
    await authStore.loginWithEmail(email.value, password.value);
    router.push('/');
  } catch (error) {
    console.error(error);
    Swal.fire('เข้าสู่ระบบไม่สำเร็จ', getErrorMessage(error.code), 'error');
  } finally {
    loading.value = false;
  }
};

const handleRegister = async () => {
  if (!email.value || !password.value || !confirmPassword.value) {
    Swal.fire('แจ้งเตือน', 'กรุณากรอกข้อมูลให้ครบถ้วน', 'warning');
    return;
  }
  if (password.value !== confirmPassword.value) {
    Swal.fire('แจ้งเตือน', 'รหัสผ่านไม่ตรงกัน', 'warning');
    return;
  }
  loading.value = true;
  try {
    await authStore.registerWithEmail(email.value, password.value);
    
    await Swal.fire({
      icon: 'success',
      title: 'สมัครสมาชิกสำเร็จ!',
      text: 'ระบบจะนำท่านเข้าสู่หน้าหลัก...',
      timer: 1500,
      showConfirmButton: false
    });
    
    setTimeout(() => {
        router.push('/');
    }, 500);

  } catch (error) {
    console.error(error);
    Swal.fire('สมัครสมาชิกไม่สำเร็จ', getErrorMessage(error.code), 'error');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
