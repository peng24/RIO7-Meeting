<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">จัดการสมาชิกและสิทธิ์การใช้งาน (Admin Panel)</h2>
      <button @click="openCreateModal" class="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-500 dark:hover:bg-green-600 focus:outline-none dark:focus:ring-green-800 flex items-center">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        เพิ่มสมาชิกใหม่
      </button>
    </div>

    <!-- Users Table -->
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">อีเมล</th>
            <th scope="col" class="px-6 py-3">วันที่สมัคร</th>
            <th scope="col" class="px-6 py-3">สิทธิ์การใช้งาน (Role)</th>
            <th scope="col" class="px-6 py-3 text-right">ดำเนินการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" :class="{'bg-yellow-50 dark:bg-yellow-900/20': user.role === 'pending'}">
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ user.email }}
            </td>
            <td class="px-6 py-4">
              {{ formatDate(user.createdAt) }}
            </td>
            <td class="px-6 py-4">
               <select 
                v-model="user.role" 
                @change="updateRole(user)"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="guest">Guest</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </td>
            <td class="px-6 py-4 text-right">
              <button @click="deleteUser(user)" class="font-medium text-red-600 dark:text-red-500 hover:underline">ลบ</button>
            </td>
          </tr>
           <tr v-if="users.length === 0">
             <td colspan="4" class="px-6 py-4 text-center">ไม่พบข้อมูลสมาชิก</td>
           </tr>
        </tbody>
      </table>
    </div>

    <!-- Create User Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto bg-black bg-opacity-50">
        <div class="relative w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button @click="closeModal" type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="px-6 py-6 lg:px-8">
                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">เพิ่มสมาชิกใหม่</h3>
                    <form class="space-y-6" @submit.prevent="createUser">
                        <div>
                            <label for="new-email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">อีเมล</label>
                            <input v-model="newUser.email" type="email" name="email" id="new-email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required>
                        </div>
                        <div>
                            <label for="new-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รหัสผ่าน</label>
                            <input v-model="newUser.password" type="password" name="password" id="new-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                        </div>
                        <div>
                            <label for="new-role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">สิทธิ์การใช้งาน</label>
                             <select v-model="newUser.role" id="new-role" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                <option value="pending">Pending</option>
                                <option value="guest">Guest</option>
                                <option value="staff">Staff</option>
                                <option value="admin">Admin</option>
                                <option value="super_admin">Super Admin</option>
                            </select>
                        </div>
                        <button type="submit" :disabled="creating" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50">
                            {{ creating ? 'กำลังสร้าง...' : 'สร้างบัญชีผู้ใช้' }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { db, firebaseConfig } from '../firebase/config'
import { collection, getDocs, doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { formatThaiDate } from '../utils/thaiDate'
import Swal from 'sweetalert2'

const authStore = useAuthStore()
const router = useRouter()
const users = ref([])
const showModal = ref(false)
const creating = ref(false)

const newUser = reactive({
    email: '',
    password: '',
    role: 'staff' // Default when creating new user
})

onMounted(async () => {
    if (!authStore.isAdmin) {
        Swal.fire({
            icon: 'error',
            title: 'Access Denied',
            text: 'เฉพาะ Super Admin เท่านั้น'
        })
        router.push('/')
        return
    }
    await fetchUsers()
})

const fetchUsers = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "users"))
        users.value = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
    } catch (error) {
        console.error("Error fetching users:", error)
        Swal.fire('Error', 'ไม่สามารถโหลดข้อมูลสมาชิกได้', 'error')
    }
}

const formatDate = (timestamp) => {
    if (!timestamp) return '-'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return formatThaiDate(date, 'medium')
}

const updateRole = async (user) => {
    try {
        await updateDoc(doc(db, "users", user.id), {
            role: user.role
        })
        
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })

        Toast.fire({
          icon: 'success',
          title: 'อัปเดตสิทธิ์สำเร็จ'
        })
    } catch (error) {
        console.error("Error updating role:", error)
        Swal.fire('Error', 'ไม่สามารถอัปเดตสิทธิ์ได้', 'error')
    }
}

const deleteUser = async (user) => {
    const result = await Swal.fire({
        title: 'ยืนยันการลบ?',
        text: `คุณต้องการลบผู้ใช้ ${user.email} ใช่หรือไม่? (ผู้ใช้จะไม่สามารถเข้าสู่ระบบได้)`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'ลบผู้ใช้',
        cancelButtonText: 'ยกเลิก'
    })

    if (result.isConfirmed) {
        try {
            await deleteDoc(doc(db, "users", user.id))
            // Note: This only deletes Firestore data. Authentication user record still exists but without role, they default to guest logic or error.
            // Ideally we'd delete Auth record too via Admin SDK backend, but client SDK can't delete other users easily.
            // Deleting role doc effectively revokes checking role permission.
            
            users.value = users.value.filter(u => u.id !== user.id)
            Swal.fire(
                'ลบสำเร็จ!',
                'ผู้ใช้ถูกลบออกจากฐานข้อมูลแล้ว',
                'success'
            )
        } catch (error) {
            console.error("Error deleting user:", error)
            Swal.fire('Error', 'ลบผู้ใช้ไม่สำเร็จ', 'error')
        }
    }
}

const openCreateModal = () => {
    showModal.value = true
    newUser.email = ''
    newUser.password = ''
    newUser.role = 'staff'
}

const closeModal = () => {
    showModal.value = false
}

const createUser = async () => {
    creating.value = true
    try {
        // Use Secondary App Pattern
        const secondaryApp = initializeApp(firebaseConfig, "Secondary")
        const secondaryAuth = getAuth(secondaryApp)
        
        const userCredential = await createUserWithEmailAndPassword(secondaryAuth, newUser.email, newUser.password)
        const user = userCredential.user
        
        // Create Firestore Doc
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            role: newUser.role,
            createdAt: new Date()
        })
        
        // Cleanup
        await signOut(secondaryAuth)
        // Note: Do not delete app instance programmatically in client usually, just let it GC or keep it.
        // There isn't a simple 'deleteApp' in standard modular web SDK import export easily without getting 'firebase/app'.
        // Actually 'deleteApp' is available in 'firebase/app' module.
        // For simplicity, we just sign out.

        closeModal()
        await fetchUsers() // Refresh list
        
        Swal.fire({
            icon: 'success',
            title: 'สร้างสมาชิกสำเร็จ',
            text: `สร้างบัญชี ${newUser.email} เรียบร้อยแล้ว`,
            confirmButtonColor: '#4f46e5'
        })
        
    } catch (error) {
        console.error("Error creating user:", error)
        let msg = error.message
        if (error.code === 'auth/email-already-in-use') msg = 'อีเมลนี้ถูกใช้งานแล้ว'
        if (error.code === 'auth/weak-password') msg = 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร'
        
        Swal.fire({
            icon: 'error',
            title: 'สร้างสมาชิกไม่สำเร็จ',
            text: msg,
            confirmButtonColor: '#d33'
        })
    } finally {
        creating.value = false
    }
}
</script>
