<template>
  <div class="h-[calc(100vh-80px)] p-4 sm:p-6 lg:p-8 flex flex-col">
    <div class="bg-gray-800 border border-gray-700/50 shadow-2xl shadow-black/50 rounded-2xl flex-grow flex flex-col overflow-hidden">
      <!-- Calendar Component -->
      <FullCalendar ref="calendarRef" :options="calendarOptions" class="h-full w-full dark-calendar" />
    </div>

    <!-- Event Detail Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity backdrop-blur-sm" @click="closeModal"></div>

      <!-- Modal Panel -->
      <div class="relative bg-gray-800 border border-gray-700/50 rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-2xl shadow-black/50 transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-8">
        <div class="absolute top-4 right-4">
          <button @click="closeModal" type="button" class="bg-gray-700 rounded-full p-2 text-gray-400 hover:text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-800 transition-colors">
            <span class="sr-only">Close</span>
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="sm:flex sm:items-start">
          <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-cyan-500/10 sm:mx-0 sm:h-12 sm:w-12">
            <svg class="h-6 w-6 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
            <h3 class="text-xl leading-6 font-bold text-white" id="modal-title">
              {{ selectedEvent?.title || 'รายละเอียดการจอง' }}
            </h3>
            <div class="mt-4 space-y-4">
              <!-- Time -->
              <div class="flex items-start bg-gray-700/50 p-3 rounded-lg border border-gray-700">
                <svg class="h-5 w-5 text-cyan-500 mr-3 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div class="text-sm text-gray-600">
                  <p class="font-medium text-gray-200">เวลา</p>
                  <p class="text-gray-400">เริ่ม: {{ formatDateTime(selectedEvent?.start) }}</p>
                  <p class="text-gray-400">สิ้นสุด: {{ formatDateTime(selectedEvent?.end) }}</p>
                </div>
              </div>

              <!-- Location -->
              <div class="flex items-start bg-gray-700/50 p-3 rounded-lg border border-gray-700" v-if="selectedEvent?.extendedProps?.location">
                <svg class="h-5 w-5 text-cyan-500 mr-3 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div class="text-sm text-gray-600">
                   <p class="font-medium text-gray-200">สถานที่</p>
                   <p class="text-gray-400">{{ selectedEvent.extendedProps.location }}</p>
                </div>
              </div>

              <!-- Description -->
              <div class="flex items-start bg-gray-700/50 p-3 rounded-lg border border-gray-700" v-if="selectedEvent?.extendedProps?.description">
                <svg class="h-5 w-5 text-cyan-500 mr-3 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                <div class="text-sm text-gray-600 w-full">
                  <p class="font-medium text-gray-200">รายละเอียด</p>
                  <p class="whitespace-pre-wrap break-words text-gray-400 mb-2" v-html="eventDescription.html"></p>
                  
                  <div v-if="eventDescription.links.length > 0" class="mt-2 pt-2 border-t border-gray-600">
                      <p class="text-xs text-gray-500 mb-1">เอกสารแนบ:</p>
                      <div v-for="(link, idx) in eventDescription.links" :key="idx" class="mb-1">
                          <a :href="link" target="_blank" class="flex items-center text-blue-400 hover:text-blue-300 hover:underline">
                              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                              เอกสารแนบ {{ idx + 1 }}
                          </a>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="mt-8 sm:mt-6 sm:flex sm:flex-row-reverse gap-3">
          <template v-if="authStore.canManageEvent(selectedEvent)">
             <button 
              type="button" 
              class="w-full inline-flex justify-center items-center text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none dark:focus:ring-blue-800 shadow-lg sm:w-auto"
              @click="editEvent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              แก้ไข
            </button>
            <button 
              type="button" 
              class="w-full inline-flex justify-center items-center focus:outline-none text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-red-900 shadow-lg sm:w-auto"
              @click="handleDeleteEvent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              ยกเลิกการจอง
            </button>
          </template>
          
          <button 
            type="button" 
            class="w-full inline-flex justify-center text-gray-300 bg-gray-700 border border-gray-600 focus:outline-none hover:bg-gray-600 focus:ring-4 focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 sm:w-auto"
            @click="closeModal"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { GOOGLE_API_KEY } from '../firebase/config'
import { deleteEvent, getEvents } from '../services/gasApi'
import Swal from 'sweetalert2'
import { formatThaiDate, formatThaiTime } from '../utils/thaiDate'

const router = useRouter()
const authStore = useAuthStore()
const calendarRef = ref(null)
const showModal = ref(false)
const selectedEvent = ref(null)
const holidayDates = ref(new Set()) 

const handleEventClick = (info) => {
  selectedEvent.value = info.event
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedEvent.value = null
}

const formatDateTime = (date) => {
  if (!date) return '-'
  return `${formatThaiDate(date, 'short')} เวลา ${formatThaiTime(date)}`
}

// Computed property to separate Description and Links & Format Text
const eventDescription = computed(() => {
    if (!selectedEvent.value?.extendedProps?.description) return { text: '', html: '', links: [] }
    
    const desc = selectedEvent.value.extendedProps.description
    const attachmentRegex = /📎 เอกสารแนบ \d+: (https?:\/\/[^\s]+)/g;
    
    const links = []
    let cleanText = desc.replace(attachmentRegex, (match, url) => {
        links.push(url)
        return '' // Remove link from main text
    }).trim()

    // Create HTML version with clickable links and newlines
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const htmlText = cleanText
        .replace(urlRegex, '<a href="$1" target="_blank" class="text-blue-400 hover:underline">$1</a>')
        .replace(/\n/g, '<br>')

    return { text: cleanText, html: htmlText, links }
})

// Check if event is editable (not a holiday)
const isEditable = (event) => {
  if (!event) return false
  const isHoliday = event.extendedProps?.isHoliday || event.display === 'background' || event.backgroundColor === 'transparent'
  return !isHoliday
}

const editEvent = () => {
    // Check permission again
    if (!authStore.canManageEvent(selectedEvent.value)) return

    if (selectedEvent.value) {
        router.push({ path: '/booking', query: { id: selectedEvent.value.id } })
    }
}

const handleDeleteEvent = async () => {
  if (!selectedEvent.value) return

  const result = await Swal.fire({
    title: 'ยืนยันการยกเลิก?',
    text: "คุณต้องการยกเลิกการจองนี้ใช่หรือไม่?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'ใช่, ยกเลิกเลย',
    cancelButtonText: 'ยกเลิก'
  })

  if (result.isConfirmed) {
    try {
      Swal.showLoading()
      
      // Use GAS API to delete
      await deleteEvent(selectedEvent.value.id)

      await Swal.fire(
        'ลบเรียบร้อย!',
        'การจองถูกยกเลิกแล้ว',
        'success'
      )
      
      closeModal()
      // Refresh calendar events
      const calendarApi = calendarRef.value.getApi()
      calendarApi.refetchEvents()
      
    } catch (error) {
      console.error('Error deleting event:', error)
      const handled = await authStore.handleAuthError(error)
      if (handled) return

      Swal.fire(
        'เกิดข้อผิดพลาด',
        'ไม่สามารถลบการจองได้',
        'error'
      )
    }
  }
}

const fetchEvents = async (fetchInfo, successCallback, failureCallback) => {
  try {
    // Use GAS API instead of direct Google API call
    const eventsData = await getEvents(fetchInfo.startStr, fetchInfo.endStr)

    // Map GAS/Google API format to FullCalendar format
    const events = eventsData.map(item => ({
      id: item.id,
      title: item.summary,
      start: item.start.dateTime || item.start.date,
      end: item.end.dateTime || item.end.date,
      location: item.location,
      description: item.description,
      extendedProps: {
        location: item.location,
        description: item.description,
        isHoliday: false,
        shared: item.extendedProperties?.shared || {}
      },
      backgroundColor: '#1a56db', // Blue-700
      borderColor: '#1a56db',
      textColor: '#ffffff'
    }))

    successCallback(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    failureCallback(error)
  }
}

const fetchHolidays = async (fetchInfo, successCallback, failureCallback) => {
  try {
     const calendarId = 'th.th#holiday@group.v.calendar.google.com'
     const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`
     const params = new URLSearchParams({
        key: GOOGLE_API_KEY,
        timeMin: fetchInfo.startStr,
        timeMax: fetchInfo.endStr,
        singleEvents: 'true'
     })

     const response = await fetch(`${url}?${params.toString()}`)
     if (!response.ok) throw new Error('Failed to fetch holidays')
     
     const data = await response.json()
    
    // Clear and repopulate holiday dates
    const newHolidayDates = new Set(holidayDates.value)

    const events = data.items
        .filter(item => {
            const title = item.summary || ''
            // Filter keywords
            const excluded = ['วาเลนไทน์', 'ตรุษจีน', 'คริสต์มาส', 'ฮาโลวีน', 'ลอยกระทง', 'ไหว้พระจันทร์', 'สารทจีน', 'อีสเตอร์']
            return !excluded.some(keyword => title.includes(keyword))
        })
        .map(item => {
        // Store date for background highlighting
        const dateStr = item.start.date || item.start.dateTime.split('T')[0]
        newHolidayDates.add(dateStr)

        return {
            id: item.id,
            title: item.summary,
            start: item.start.dateTime || item.start.date,
            end: item.end.dateTime || item.end.date,
            backgroundColor: 'transparent', 
            borderColor: 'transparent',
            textColor: '#dc2626', // Red-600
            editable: false,
            classNames: ['holiday-event'],
            extendedProps: {
                isHoliday: true,
                description: item.description
            }
        }
    })
    
    holidayDates.value = newHolidayDates
    successCallback(events)

  } catch (error) {
    console.warn('Error fetching holidays', error)
    successCallback([]) // Fail gracefully
  }
}

const dayCellClassNames = (arg) => {
    // Check if the cell's date matches a holiday
    const d = arg.date
    // Format to YYYY-MM-DD manually to avoid timezone issues with toISOString if not careful, 
    // but FullCalendar dates are usually local or UTC depending on settings. 
    // Safest for 'dayGridMonth' (where dates are 00:00 local usually):
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const dateStr = `${year}-${month}-${day}`

    if (holidayDates.value.has(dateStr)) {
        return ['bg-red-50 text-red-900'] 
    }
    return []
}

const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,listMonth'
  },
  locale: 'th',
  buttonText: {
    today: 'วันนี้',
    month: 'เดือน',
    week: 'สัปดาห์',
    day: 'วัน',
    list: 'รายการ'
  },
  eventClick: handleEventClick,
  eventSources: [
    {
      events: fetchEvents
    },
    {
      events: fetchHolidays,
      id: 'thai-holidays'
    }
  ],
  dayCellClassNames: dayCellClassNames, 
  height: '100%',
  dayMaxEvents: true,
  nowIndicator: true,
  allDaySlot: true,
  slotMinTime: '06:00:00',
  slotMaxTime: '22:00:00',
  views: {
    listMonth: {
      dayHeaderContent: (arg) => {
        const date = arg.date
        const weekday = new Intl.DateTimeFormat('th-TH', { weekday: 'long' }).format(date)
        const day = new Intl.DateTimeFormat('th-TH', { day: 'numeric' }).format(date)
        const month = new Intl.DateTimeFormat('th-TH', { month: 'long' }).format(date)
        const year = new Intl.DateTimeFormat('th-TH', { year: 'numeric', calendar: 'buddhist' }).format(date)
        return `${weekday}ที่ ${day} ${month} ${year}`
      }
    }
  },
  eventClassNames: (arg) => {
      // Style holidays or all-day events distinctively
      if (arg.event.allDay || arg.event.title.includes('วันหยุด')) {
          return ['holiday-event']
      }
      return []
  }
})
</script>

<style>
/* Custom Calendar Styling */
.fc {
  font-family: 'Prompt', sans-serif;
  --fc-border-color: #e5e7eb;
}

/* Button Overrides */
.fc .fc-button-primary {
  background-color: #1a56db; /* blue-700 */
  border-color: #1a56db;
  color: #ffffff;
  opacity: 1;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.fc .fc-button-primary:hover {
  background-color: #1e429f; /* blue-800 approx */
  border-color: #1e429f;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.fc .fc-button-primary:disabled {
  background-color: #9ca3af;
  border-color: #9ca3af;
}

.fc .fc-button-primary:focus {
  box-shadow: 0 0 0 3px rgba(26, 86, 219, 0.5); /* Ring effect */
}

/* Remove default inheritance issues */
.fc .fc-button:focus {
    box-shadow: none !important; /* Managed by specific primary focus */
}

/* Title */
.fc-toolbar-title {
  font-size: 1.5rem !important;
  font-weight: 800 !important;
  color: #f3f4f6 !important; /* gray-100 */
  letter-spacing: -0.025em;
}

/* Headers */
.fc-col-header-cell-cushion {
  color: #e5e7eb; /* gray-200 */
  font-weight: 600;
  padding: 8px 0 !important;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
}

/* Dark Theme Overrides for Calendar */
.fc-theme-standard td, .fc-theme-standard th {
    border-color: #374151 !important; /* gray-700 */
}

.fc-day-today {
    background-color: rgba(6, 182, 212, 0.1) !important; /* cyan-500/10 */
}

.fc-list {
    border-color: #374151 !important;
}

.fc-list-event:hover td {
    background-color: #374151 !important; /* gray-700 */
}

.fc-list-day-cushion {
    background-color: #1f2937 !important; /* gray-800 */
}

/* Button Overrides - Dark */
.fc .fc-button-primary {
  background-color: #374151; /* gray-700 */
  border-color: #4b5563; /* gray-600 */
  color: #e5e7eb;
}

.fc .fc-button-primary:hover {
    background-color: #4b5563; /* gray-600 */
    border-color: #6b7280; /* gray-500 */
    color: #ffffff;
}

.fc .fc-button-primary:not(:disabled).fc-button-active {
    background-color: #06b6d4; /* cyan-500 */
    border-color: #0891b2; /* cyan-600 */
    color: #ffffff;
}

.fc-daygrid-day.bg-red-50 {
    background-color: rgba(153, 27, 27, 0.2) !important; /* Red 900 with opacity */
}
.fc-daygrid-day.bg-red-50 .fc-daygrid-day-number {
    color: #fca5a5; /* red-300 */
}

/* Holiday Event Styling */
.holiday-event {
    font-weight: 800 !important;
    text-align: center !important;
    justify-content: center !important;
}

.holiday-event .fc-event-title {
    font-weight: 800 !important;
    text-align: center !important;
}
</style>
