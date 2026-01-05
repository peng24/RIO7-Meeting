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

      <!-- Pending Warning -->
      <div v-if="authStore.role === 'pending'" class="mb-6 p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-100 dark:bg-yellow-200 dark:text-yellow-900" role="alert">
        <span class="font-medium">⚠️ กรุณารออนุมัติก่อน</span> ถ้าต้องการด่วน โทรภายใน 408
      </div>

      <!-- Access Control Check -->
      <div v-if="!authStore.canBook" class="p-8 text-center bg-red-50 dark:bg-red-900 rounded-lg border border-red-200 dark:border-red-700">
        <svg class="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h3 class="mt-2 text-lg font-medium text-red-800 dark:text-red-200">⛔ คุณไม่มีสิทธิ์จองห้องประชุม (Guest User)</h3>
        <p class="mt-1 text-sm text-red-600 dark:text-red-300">กรุณาติดต่อ Admin เพื่อขอสิทธิ์</p>
        <p class="mt-4 text-xs text-gray-500 dark:text-gray-400 font-mono">Current Role: {{ authStore.role }}</p>
        <div class="mt-6">
            <router-link to="/" class="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">กลับสู่หน้าหลัก <span aria-hidden="true">&rarr;</span></router-link>
        </div>
      </div>

      <!-- Form -->
      <form v-else @submit.prevent="submitBooking">
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
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เอกสารแนบ (ถ้ามี)</label>
            
            <!-- Dropzone -->
            <div @click="$refs.fileInput.click()" class="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <input 
                    ref="fileInput"
                    type="file"
                    multiple
                    @change="handleFileSelect"
                    class="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                >
                <div class="text-center">
                    <!-- Cloud Upload Icon -->
                    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div class="mt-4 flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                        <span class="font-semibold text-blue-600 dark:text-blue-400">คลิกเพื่อเลือกไฟล์</span>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">รองรับ PDF, JPG, PNG (เลือกได้หลายไฟล์)</p>
                </div>
            </div>

            <!-- Selected Files List -->
            <div v-if="selectedFiles.length > 0" class="mt-3 space-y-2">
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">ไฟล์ที่เลือก:</p>
                <div v-for="(file, index) in selectedFiles" :key="index" class="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900 rounded-lg">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"></path>
                        </svg>
                        <span class="text-sm text-gray-700 dark:text-gray-200">{{ file.name }}</span>
                    </div>
                    <button @click.stop="removeFile(index)" type="button" class="text-red-600 hover:text-red-800 dark:text-red-400">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            </div>
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
const selectedFiles = ref([])
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

const handleFileSelect = (event) => {
  selectedFiles.value = Array.from(event.target.files)
}

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
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


  // 3. Upload Files (if any)
  if (selectedFiles.value.length > 0) {
    try {
      uploading.value = true
      Swal.update({
        title: 'กำลังอัปโหลดไฟล์...',
        text: `กำลังอัปโหลด ${selectedFiles.value.length} ไฟล์`
      })
      
      const uploadedUrls = []
      for (let i = 0; i < selectedFiles.value.length; i++) {
        const file = selectedFiles.value[i]
        Swal.update({
          text: `กำลังอัปโหลดไฟล์ ${i + 1}/${selectedFiles.value.length}: ${file.name}`
        })
        const publicUrl = await uploadToAdminDrive(file)
        uploadedUrls.push({ name: file.name, url: publicUrl })
      }
      
      // Append all links to description
      if (uploadedUrls.length > 0) {
        form.description += '\n\n'
        uploadedUrls.forEach((item, index) => {
          form.description += `📎 เอกสารแนบ ${index + 1}: ${item.url}\n`
        })
      }
      
      selectedFiles.value = [] // Clear after upload
    } catch (uploadError) {
      console.error('File Upload Error:', uploadError)
      return Swal.fire({
        icon: 'error',
        title: 'อัปโหลดไฟล์ไม่สำเร็จ',
        text: 'กรุณาลองใหม่อีกครั้ง',
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
    },
    extendedProperties: {
      shared: {
        creatorId: authStore.user?.uid || '',
        creatorName: authStore.user?.displayName || authStore.user?.email || 'Unknown',
        type: form.meetingType
      }
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
