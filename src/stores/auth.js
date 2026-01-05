import { defineStore } from 'pinia'
import { auth } from '../firebase/config'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import Swal from 'sweetalert2'
import router from '../router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    accessToken: localStorage.getItem('accessToken') || null,
    isAuthenticated: !!localStorage.getItem('user'),
  }),
  actions: {
    async loginWithGoogle() {
      try {
        const provider = new GoogleAuthProvider()
        provider.addScope('https://www.googleapis.com/auth/calendar')
        provider.addScope('https://www.googleapis.com/auth/calendar.events')

        const result = await signInWithPopup(auth, provider)
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        const user = result.user

        this.user = user
        this.accessToken = token
        this.isAuthenticated = true

        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('accessToken', token)

        return user
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },
    async logout() {
      try {
        await signOut(auth)
        this.user = null
        this.accessToken = null
        this.isAuthenticated = false
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
      } catch (error) {
        console.error('Logout error:', error)
      }
    },
    async handleAuthError(error) {
      if (error.response && error.response.status === 401) {
        await this.logout()
        await Swal.fire({
          icon: 'warning',
          title: 'เซสชันหมดอายุ',
          text: 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
          confirmButtonColor: '#4f46e5',
          confirmButtonText: 'ตกลง'
        })
        router.push('/login')
        return true
      }
      return false
    }
  }
})
