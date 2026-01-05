import { defineStore } from 'pinia'
import { auth, db } from '../firebase/config'
import { 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut,
    signInWithEmailAndPassword
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import Swal from 'sweetalert2'
import router from '../router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    accessToken: localStorage.getItem('accessToken') || null,
    role: localStorage.getItem('userRole') || 'guest', // Default to guest
    isAuthenticated: !!localStorage.getItem('user'),
  }),
  getters: {
    canBook: (state) => ['super_admin', 'staff'].includes(state.role)
  },
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

        // Role Logic
        const role = await this.fetchUserRole(user, 'staff') // Default google users to staff

        this.setUser(user, token, role)
        return user
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },
    
    async loginWithEmail(email, password) {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            const user = result.user
            
            // Initial token might be null/different for email/pass, 
            // but we might not need calendar scope for basic email users unless they are admins linking accounts.
            // For now, access token might be just the ID token or null if not using Google APIs directly.
            const token = await user.getIdToken() 

            const role = await this.fetchUserRole(user, 'guest') // Default email users to guest

            this.setUser(user, token, role)
            return user
        } catch (error) {
            console.error('Email Login Error:', error)
            throw error
        }
    },

    async fetchUserRole(user, defaultRole = 'guest') {
        const userRef = doc(db, 'users', user.uid)
        const userSnap = await getDoc(userRef)

        if (userSnap.exists()) {
            return userSnap.data().role
        } else {
            // Create user doc
            await setDoc(userRef, {
                email: user.email,
                role: defaultRole,
                createdAt: new Date()
            })
            return defaultRole
        }
    },

    setUser(user, token, role) {
        this.user = user
        this.accessToken = token
        this.role = role
        this.isAuthenticated = true

        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('accessToken', token)
        localStorage.setItem('userRole', role)
    },
    async logout() {
      try {
        await signOut(auth)
        this.user = null
        this.accessToken = null
        this.role = 'guest'
        this.isAuthenticated = false
        
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userRole')
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
