<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-gray-800 border border-gray-700/50 shadow-2xl shadow-black/50 sm:rounded-2xl p-6">
      <div class="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 class="text-2xl font-extrabold text-white tracking-tight flex items-center">
            <svg class="w-6 h-6 mr-2 text-blue-700 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
           {{ pageTitle }}
        </h2>
        <p class="text-sm text-gray-400 mt-1">กรอกรายละเอียดเพื่อสร้างนัดหมายในปฏิทิน</p>
      </div>

      <div v-if="authStore.role === 'pending'" class="mb-6 p-4 text-sm text-yellow-800 rounded-lg bg-yellow-100 dark:bg-yellow-200 dark:text-yellow-900" role="alert">
        <span class="font-medium">⚠️ กรุณารออนุมัติก่อน</span> ถ้าต้องการด่วน โทรภายใน 408
      </div>

      <div v-if="!authStore.canBook" class="p-8 text-center bg-gray-900 border border-red-500/50 rounded-lg shadow-lg shadow-red-500/10">
        <h3 class="mt-2 text-lg font-medium text-red-800 dark:text-red-200">⛔ คุณไม่มีสิทธิ์จองห้องประชุม</h3>
        <p class="mt-4 text-xs text-gray-500 dark:text-gray-400 font-mono">Current Role: {{ authStore.role }}</p>
        <div class="mt-6">
            <router-link to="/" class="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">กลับสู่หน้าหลัก <span aria-hidden="true">&rarr;</span></router-link>
        </div>
      </div>

      <form v-else @submit.prevent="submitBooking">
        <div class="grid gap-6 mb-6 md:grid-cols-1">
          <div>
            <label for="topic" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">หัวข้อการประชุม <span class="text-red-600">*</span></label>
            <input type="text" id="topic" v-model="form.topic" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="ระบุหัวข้อการประชุม" required>
          </div>
        </div>

        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label for="meetingType" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รูปแบบการประชุม</label>
            <select id="meetingType" v-model="form.meetingType" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
              <option value="ประชุมธรรมดา">ประชุมธรรมดา</option>
              <option value="ประชุม Zoom">ประชุม Zoom</option>
              <option value="อื่นๆ">อื่นๆ</option>
            </select>
          </div>
          <div>
            <label for="room" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ห้องประชุม</label>
            <select id="room" v-model="form.room" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
              <option v-for="room in MEETING_ROOMS" :key="room" :value="room">{{ room }}</option>
              <option value="อื่นๆ">อื่นๆ</option>
            </select>
          </div>
        </div>

        <div v-if="form.room === 'อื่นๆ'" class="mb-6">
            <label for="otherRoomDetail" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ระบุห้องประชุม / สถานที่ <span class="text-red-600">*</span></label>
            <input type="text" id="otherRoomDetail" v-model="form.otherRoomDetail" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required>
        </div>
        
        <div v-if="form.meetingType === 'อื่นๆ'" class="mb-6">
            <label for="otherDetail" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ระบุเพิ่มเติม</label>
            <input type="text" id="otherDetail" v-model="form.otherDetail" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
        </div>

        <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เวลาเริ่ม <span class="text-red-600">*</span></label>
                <input type="datetime-local" v-model="form.startTime" id="startTime" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required>
            </div>
            <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เวลาสิ้นสุด <span class="text-red-600">*</span></label>
                <input type="datetime-local" v-model="form.endTime" id="endTime" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required>
            </div>
        </div>

        <!-- NEW File Upload Section -->
        <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เอกสารแนบ (ถ้ามี)</label>
            
            <!-- Existing Files -->
            <div v-if="existingFiles.length > 0" class="mb-4 space-y-2">
                <p class="text-xs text-gray-400 font-medium">ไฟล์เดิม:</p>
                <div v-for="(file, index) in existingFiles" :key="'exist-'+index" class="flex items-center justify-between p-3 bg-gray-700/50 border border-gray-600 rounded-lg group hover:border-blue-500/50 transition-colors">
                    <a :href="file.url" target="_blank" class="flex items-center text-blue-400 hover:text-blue-300 text-sm truncate">
                        <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        {{ file.name }}
                    </a>
                    <button @click="removeExistingFile(index)" type="button" class="text-gray-400 hover:text-red-400 p-1 rounded-full hover:bg-gray-600 transition-colors">
                         <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Dropzone -->
            <div 
                @click="$refs.fileInput.click()" 
                @dragover.prevent="onDragOver"
                @dragleave.prevent="onDragLeave"
                @drop.prevent="onDrop"
                class="relative border-2 border-dashed rounded-xl p-8 sm:p-10 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center group"
                :class="isDragging ? 'border-blue-500 bg-blue-500/10 scale-[1.01]' : 'border-gray-600 bg-gray-700/30 hover:border-gray-500 hover:bg-gray-700/50'"
            >
                <input ref="fileInput" type="file" multiple @change="handleFileSelect" class="hidden" accept=".pdf,.jpg,.jpeg,.png">
                
                <!-- Icon -->
                <div class="mb-4 p-3 rounded-full bg-gray-800 border border-gray-600 group-hover:border-gray-500 transition-colors shadow-lg">
                     <svg class="w-8 h-8 text-gray-400 group-hover:text-blue-400 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                </div>

                <p class="text-base font-medium text-gray-300 group-hover:text-white transition-colors mb-2">
                    <span v-if="isDragging" class="text-blue-400">วางไฟล์ที่นี่เพื่ออัปโหลด</span>
                    <span v-else>คลิกเพื่อเลือกไฟล์ หรือลากไฟล์มาวางที่นี่</span>
                </p>
                <p class="text-xs text-gray-500">รองรับ PDF, JPG, PNG (ไม่เกิน 10MB)</p>
            </div>

            <!-- Selected New Files -->
            <div v-if="selectedFiles.length > 0" class="mt-4 space-y-2">
                <p class="text-xs text-gray-400 font-medium">ไฟล์ใหม่:</p>
                <div v-for="(file, index) in selectedFiles" :key="'new-'+index" class="flex items-center justify-between p-3 bg-gray-800 border border-gray-600 rounded-lg shadow-sm">
                     <div class="flex items-center min-w-0">
                        <div class="p-2 bg-gray-700 rounded mr-3">
                            <svg class="w-5 h-5 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div class="truncate">
                            <p class="text-sm font-medium text-gray-200 truncate">{{ file.name }}</p>
                            <p class="text-xs text-gray-500">{{ (file.size / 1024 / 1024).toFixed(2) }} MB</p>
                        </div>
                    </div>
                    <button @click.stop="removeFile(index)" type="button" class="text-gray-400 hover:text-red-400 p-1.5 hover:bg-gray-700 rounded-full transition-colors ml-2">
                         <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div class="mb-6">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รายละเอียด / ลิงก์ Zoom</label>
            <textarea id="description" rows="4" v-model="form.description" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="ระบุรายละเอียด..."></textarea>
        </div>

        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">{{ submitButtonText }}</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Swal from 'sweetalert2'
import { formatThaiDate, formatThaiTime } from '../utils/thaiDate'
import { uploadFile, createEvent, updateEvent, getEventById } from '../services/gasApi'
import { MEETING_ROOMS } from '../constants'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const isEditing = ref(false)
const eventId = ref(null)
const existingFiles = ref([])
const selectedFiles = ref([])
const uploading = ref(false)
const isDragging = ref(false)

const form = reactive({
  topic: '',
  meetingType: 'ประชุมธรรมดา',
  otherDetail: '',
  room: 'ห้องประชุม SWOC7',
  otherRoomDetail: '',
  startTime: null,
  endTime: null,
  description: ''
})

const pageTitle = computed(() => isEditing.value ? 'แก้ไขการจอง' : 'จองห้องประชุม')
const submitButtonText = computed(() => isEditing.value ? 'บันทึกการแก้ไข' : 'ยืนยันการจอง')

// Helper for input[type="datetime-local"]
const toDateTimeLocal = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  const localDate = new Date(date.getTime() - offsetMs);
  return localDate.toISOString().slice(0, 16);
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
    selectedFiles.value = [...selectedFiles.value, ...Array.from(event.target.files)] 
}
const removeFile = (index) => { selectedFiles.value.splice(index, 1) }
const removeExistingFile = (index) => { existingFiles.value.splice(index, 1) }

// Drag & Drop Handlers
const onDragOver = (event) => {
    isDragging.value = true
}
const onDragLeave = (event) => {
    isDragging.value = false
}
const onDrop = (event) => {
    isDragging.value = false
    const files = Array.from(event.dataTransfer.files)
    selectedFiles.value = [...selectedFiles.value, ...files]
}

const fetchEventDetails = async (id) => {
  try {
    Swal.fire({ title: 'กำลังโหลดข้อมูล...', allowOutsideClick: false, didOpen: () => Swal.showLoading() })
    
    // FETCH FROM GAS
    const event = await getEventById(id)
    
    // Parse Logic
    const summary = event.summary || ''
    const typeMatch = summary.match(/^\[(.*?)\] (.*?)(?: \((.*)\))?$/)
    if (typeMatch) {
      form.meetingType = typeMatch[1]
      form.topic = typeMatch[2]
      form.otherDetail = typeMatch[3] || ''
    } else {
      form.topic = summary
      form.meetingType = 'อื่นๆ'
    }

    const room = event.location || 'ห้องประชุม SWOC7'
    if (MEETING_ROOMS.includes(room)) {
        form.room = room
        form.otherRoomDetail = ''
    } else {
        form.room = 'อื่นๆ'
        form.otherRoomDetail = room
    }

    const fullDescription = event.description || ''
    const attachmentRegex = /📎 เอกสารแนบ \d+: (https?:\/\/[^\s]+)/g;
    const matches = [...fullDescription.matchAll(attachmentRegex)];
    existingFiles.value = matches.map((m, index) => ({ name: `เอกสารแนบ ${index + 1}`, url: m[1] }));
    form.description = fullDescription.replace(attachmentRegex, '').trim();

    // Use toDateTimeLocal for form inputs
    const start = event.start.dateTime || event.start.date
    const end = event.end.dateTime || event.end.date
    form.startTime = toDateTimeLocal(start)
    form.endTime = toDateTimeLocal(end)

    Swal.close()
  } catch (error) {
    console.error('Error fetching event:', error)
    Swal.fire({ icon: 'error', title: 'ไม่สามารถโหลดข้อมูลได้', text: 'กลับไปหน้าปฏิทิน' })
    router.push('/calendar')
  }
}

const submitBooking = async () => {
  const start = new Date(form.startTime)
  const end = new Date(form.endTime)

  if (start >= end) {
    return Swal.fire({ icon: 'error', title: 'เวลาไม่ถูกต้อง', text: 'เวลาเริ่มต้องมาก่อนเวลาสิ้นสุด' })
  }

  const confirmResult = await Swal.fire({
    title: 'ยืนยันการจอง?',
    text: `วันที่ ${formatThaiDate(start, 'short')} เวลา ${formatThaiTime(start)} - ${formatThaiTime(end)}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'ยืนยัน'
  })

  if (!confirmResult.isConfirmed) return

  Swal.fire({ title: 'กำลังบันทึกข้อมูล...', allowOutsideClick: false, didOpen: () => Swal.showLoading() })

  let uploadedUrls = []
  if (selectedFiles.value.length > 0) {
    try {
      for (const file of selectedFiles.value) {
        const publicUrl = await uploadFile(file)
        uploadedUrls.push({ name: file.name, url: publicUrl })
      }
    } catch (e) {
      return Swal.fire({ icon: 'error', title: 'อัปโหลดไฟล์ไม่สำเร็จ' })
    }
  }

  let summary = ''
  if (form.meetingType === 'ประชุมธรรมดา') summary = form.topic
  else if (form.meetingType === 'ประชุม Zoom') summary = `[Zoom] ${form.topic}`
  else summary = `[${form.otherDetail || 'อื่นๆ'}] ${form.topic}`

  let finalDescription = form.description
  if (existingFiles.value.length > 0) {
    finalDescription += '\n\n' + existingFiles.value.map((f, i) => `📎 เอกสารแนบ ${i + 1}: ${f.url}`).join('\n')
  }
  if (uploadedUrls.length > 0) {
    if (existingFiles.value.length === 0) finalDescription += '\n\n'
    uploadedUrls.forEach((item, index) => {
        finalDescription += `📎 เอกสารแนบ ${existingFiles.value.length + index + 1}: ${item.url}\n`
    })
  }

  const finalLocation = form.room === 'อื่นๆ' ? (form.otherRoomDetail || 'ระบุเอง') : form.room

  try {
      const eventData = {
          title: summary,
          startTime: new Date(form.startTime).toISOString(),
          endTime: new Date(form.endTime).toISOString(),
          description: finalDescription,
          location: finalLocation,
          creatorId: authStore.user?.uid || '',
          creatorName: authStore.user?.displayName || authStore.user?.email || 'Unknown',
          type: form.meetingType,
          eventId: eventId.value
      }

      if (isEditing.value) await updateEvent(eventId.value, eventData)
      else await createEvent(eventData)

    await Swal.fire({ icon: 'success', title: 'สำเร็จ', text: 'บันทึกข้อมูลแล้ว' })
    router.push('/calendar')
    
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'เกิดข้อผิดพลาด', text: error.message })
  }
}
</script>
