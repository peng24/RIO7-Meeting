<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-6">
      <!-- Header -->
      <div class="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <svg class="w-6 h-6 mr-2 text-blue-700 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
           {{ pageTitle }}
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">กรอกรายละเอียดเพื่อสร้างนัดหมายในปฏิทิน</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitBooking">
        <div class="grid gap-6 mb-6 md:grid-cols-1">
          <div>
            <label for="topic" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">หัวข้อการประชุม <span class="text-red-600">*</span></label>
            <input 
                type="text" 
                id="topic" 
                v-model="form.topic"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="ระบุหัวข้อการประชุม" 
                required
            >
          </div>
        </div>

        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label for="meetingType" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รูปแบบการประชุม</label>
            <select 
                id="meetingType" 
                v-model="form.meetingType"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="ประชุมธรรมดา">ประชุมธรรมดา</option>
              <option value="ประชุม Zoom">ประชุม Zoom</option>
              <option value="อื่นๆ">อื่นๆ</option>
            </select>
          </div>
          <div>
            <label for="room" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ห้องประชุม</label>
            <select 
                id="room" 
                v-model="form.room"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="ห้องประชุม SWOC7">ห้องประชุม SWOC7</option>
              <option value="ห้องประชุมเล็ก">ห้องประชุมเล็ก</option>
              <option value="ห้องประชุมรวงผึ้ง(ฝ่ายออกแบบ)">ห้องประชุมรวงผึ้ง(ฝ่ายออกแบบ)</option>
            </select>
          </div>
        </div>
        
        <div v-if="form.meetingType === 'อื่นๆ'" class="mb-6">
            <label for="otherDetail" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ระบุเพิ่มเติม</label>
            <input 
                type="text" 
                id="otherDetail" 
                v-model="form.otherDetail"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="รายละเอียดเพิ่มเติม" 
            >
        </div>

        <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เวลาเริ่ม <span class="text-red-600">*</span></label>
                <input 
                    type="datetime-local"
                    v-model="form.startTime" 
                    id="startTime"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                >
            </div>
            <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เวลาสิ้นสุด <span class="text-red-600">*</span></label>
                <input 
                    type="datetime-local"
                    v-model="form.endTime" 
                    id="endTime"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                >
            </div>
        </div>

        <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">เอกสารแนบ (ถ้ามี)</label>
            <input 
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                id="file_input" 
                type="file"
                @change="handleFileUpload"
            >
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">แนบไฟล์เอกสารประกอบการประชุม (PDF, JPG, PNG)</p>
        </div>

        <div class="mb-6">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รายละเอียด / ลิงก์ Zoom</label>
            <textarea 
                id="description" 
                rows="4" 
                v-model="form.description"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="ระบุรายละเอียดการประชุม หรือแปะลิงก์ Zoom ที่นี่..."
            ></textarea>
        </div>

        <button 
            type="submit" 
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
            {{ submitButtonText }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Swal from 'sweetalert2'
import axios from 'axios'
import moment from 'moment'
import { formatThaiDate, formatThaiTime } from '../utils/thaiDate'
import { uploadToAdminDrive } from '../services/gasUpload'

const router = useRouter()
import { th } from 'date-fns/locale';

const route = useRoute()
const authStore = useAuthStore()

const isEditing = ref(false)
const eventId = ref(null)
const selectedFile = ref(null)
const uploading = ref(false)

const form = reactive({
  topic: '',
  meetingType: 'ประชุมธรรมดา',
  otherDetail: '',
  room: 'ห้องประชุม SWOC7',
  startTime: null,
  endTime: null,
  description: ''
})

const pageTitle = computed(() => isEditing.value ? 'แก้ไขการจอง' : 'จองห้องประชุม')
const submitButtonText = computed(() => isEditing.value ? 'บันทึกการแก้ไข' : 'ยืนยันการจอง')

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear() + 543;
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

onMounted(async () => {
  if (route.query.id) {
    isEditing.value = true
    eventId.value = route.query.id
    await fetchEventDetails(eventId.value)
  } else if (route.query.room) {
    form.room = route.query.room
  }
})

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0]
}

const fetchEventDetails = async (id) => {
  try {
    Swal.fire({
      title: 'กำลังโหลดข้อมูล...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    })

    const response = await axios.get(
      `https://www.googleapis.com/calendar/v3/calendars/sarabun07@gmail.com/events/${id}`,
      {
        headers: { 'Authorization': `Bearer ${authStore.accessToken}` }
      }
    )

    const event = response.data
    
    // Parse Logic
    // Summary format: "[Type] Topic (Detail)"
    const summary = event.summary || ''
    const typeMatch = summary.match(/^\[(.*?)\] (.*?)(?: \((.*)\))?$/)

    if (typeMatch) {
      form.meetingType = typeMatch[1]
      form.topic = typeMatch[2]
      form.otherDetail = typeMatch[3] || ''
    } else {
      form.topic = summary
      form.meetingType = 'อื่นๆ' // Fallback
    }

    form.room = event.location || 'ห้องประชุม SWOC7'
    form.description = event.description || ''
    
    // Date formatting for datetime-local (YYYY-MM-DDTHH:mm)
    const start = event.start.dateTime || event.start.date
    const end = event.end.dateTime || event.end.date
    
    form.startTime = moment(start).format('YYYY-MM-DDTHH:mm')
    form.endTime = moment(end).format('YYYY-MM-DDTHH:mm')

    Swal.close()
  } catch (error) {
    console.error('Error fetching event:', error)
    const handled = await authStore.handleAuthError(error)
    if (handled) return

    Swal.fire({
      icon: 'error',
      title: 'ไม่สามารถโหลดข้อมูลได้',
      text: 'กลับไปหน้าปฏิทิน',
      confirmButtonText: 'ตกลง'
    }).then(() => {
      router.push('/calendar')
    })
  }
}

const submitBooking = async () => {
  // 1. Validation
  const start = new Date(form.startTime)
  const end = new Date(form.endTime)

  if (start >= end) {
    return Swal.fire({
      icon: 'error',
      title: 'เวลาไม่ถูกต้อง',
      text: 'เวลาเริ่มต้องมาก่อนเวลาสิ้นสุด',
      confirmButtonColor: '#4f46e5'
    })
  }
  
  // 1.5 Confirmation
  const confirmResult = await Swal.fire({
    title: 'ยืนยันการจอง?',
    text: `ยืนยันการจองวันที่ ${formatThaiDate(start, 'short')} เวลา ${formatThaiTime(start)} - ${formatThaiTime(end)} ใช่หรือไม่?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'ยืนยัน',
    cancelButtonText: 'ยกเลิก',
    confirmButtonColor: '#4f46e5'
  })

  if (!confirmResult.isConfirmed) return

  // 2. Loading
  Swal.fire({
    title: 'กำลังบันทึกข้อมูล...',
    text: 'กรุณารอสักครู่',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    }
  })


  // 3. Upload File (if any)
  if (selectedFile.value) {
    try {
      uploading.value = true
      Swal.update({
        title: 'กำลังอัปโหลดไฟล์...',
        text: 'กรุณารอสักครู่ อาจใช้เวลาสักครู่ขึ้นอยู่กับขนาดไฟล์'
      })
      
      const publicUrl = await uploadToAdminDrive(selectedFile.value)
      form.description += `\n\n📎 เอกสารแนบ: ${publicUrl}`
      selectedFile.value = null // Prevent re-upload on retry
    } catch (uploadError) {
      console.error('File Upload Error:', uploadError)
      return Swal.fire({
        icon: 'error',
        title: 'อัปโหลดไฟล์ไม่สำเร็จ',
        text: 'กรุณาลองใหม่อีกครั้ง หรือบันทึกโดยไม่แนบไฟล์',
        confirmButtonColor: '#d33'
      })
    } finally {
      uploading.value = false
    }
  }

  // 4. Prepare Data
  let summary = ''
  if (form.meetingType === 'ประชุมธรรมดา') {
    summary = form.topic
  } else if (form.meetingType === 'ประชุม Zoom') {
    summary = `[Zoom] ${form.topic}`
  } else if (form.meetingType === 'อื่นๆ') {
    summary = `[${form.otherDetail || 'อื่นๆ'}] ${form.topic}`
  }

  const event = {
    summary: summary,
    location: form.room,
    description: form.description,
    start: {
      dateTime: new Date(form.startTime).toISOString(),
      timeZone: 'Asia/Bangkok'
    },
    end: {
      dateTime: new Date(form.endTime).toISOString(),
      timeZone: 'Asia/Bangkok'
    }
  }

  try {
    if (!authStore.accessToken) {
      throw new Error('ไม่พบ Access Token กรุณาเข้าสู่ระบบใหม่')
    }

    const headers = {
        'Authorization': `Bearer ${authStore.accessToken}`,
        'Content-Type': 'application/json'
    }

    if (isEditing.value) {
        // PUT Request
        await axios.put(
            `https://www.googleapis.com/calendar/v3/calendars/sarabun07@gmail.com/events/${eventId.value}`,
            event,
            { headers }
        )
    } else {
        // POST Request
        await axios.post(
            'https://www.googleapis.com/calendar/v3/calendars/sarabun07@gmail.com/events',
            event,
            { headers }
        )
    }

    // 5. Success
    await Swal.fire({
      icon: 'success',
      title: isEditing.value ? 'แก้ไขสำเร็จ' : 'จองห้องประชุมสำเร็จ',
      text: 'บันทึกข้อมูลลงในปฏิทินเรียบร้อยแล้ว',
      confirmButtonColor: '#4f46e5'
    })

    // Redirect
    router.push('/calendar')
    
  } catch (error) {
    console.error('Error saving event:', error)
    const handled = await authStore.handleAuthError(error)
    if (handled) return

    const errorMsg = error.response?.data?.error?.message || error.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ'
    
    Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: errorMsg,
      confirmButtonColor: '#d33'
    })
  }
}
</script>
