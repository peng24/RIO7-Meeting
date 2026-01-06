<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">สถานะห้องประชุม</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">ข้อมูลสถานะห้องประชุมแบบ Real-time</p>
      </div>
      <div class="mt-4 md:mt-0">
        <div class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
          {{ currentDateTime }}
        </div>
      </div>
    </div>

    <!-- Statistics Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <!-- Card 1: Today -->
      <div class="p-4 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center mb-2">
            <div class="p-2 mr-3 text-blue-600 bg-blue-100 rounded-lg dark:bg-blue-900 dark:text-blue-200">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">วันนี้</p>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white pl-1">{{ stats.today }}</h3>
      </div>

      <!-- Card 2: Tomorrow -->
       <div class="p-4 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center mb-2">
            <div class="p-2 mr-3 text-purple-600 bg-purple-100 rounded-lg dark:bg-purple-900 dark:text-purple-200">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">พรุ่งนี้</p>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white pl-1">{{ stats.tomorrow }}</h3>
      </div>

      <!-- Card 3: This Week -->
      <div class="p-4 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center mb-2">
            <div class="p-2 mr-3 text-green-600 bg-green-100 rounded-lg dark:bg-green-900 dark:text-green-200">
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            </div>
             <p class="text-sm font-medium text-gray-500 dark:text-gray-400">สัปดาห์นี้</p>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white pl-1">{{ stats.thisWeek }}</h3>
      </div>

      <!-- Card 4: This Month -->
      <div class="p-4 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center mb-2">
             <div class="p-2 mr-3 text-indigo-600 bg-indigo-100 rounded-lg dark:bg-indigo-900 dark:text-indigo-200">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">เดือนนี้</p>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white pl-1">{{ stats.thisMonth }}</h3>
      </div>
    </div>

    <!-- Room Status Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <div 
        v-for="room in rooms" 
        :key="room.name"
        class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex flex-col justify-between"
      >
        <div>
           <div class="flex justify-between items-start mb-4">
              <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2" :title="room.name">{{ room.name }}</h5>
              <span 
                :class="[
                  'text-xs font-medium px-2.5 py-0.5 rounded',
                  room.isBusy 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' 
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                ]"
              >
                {{ room.isBusy ? 'ไม่ว่าง' : 'ว่าง' }}
              </span>
           </div>
           
           <div v-if="room.isBusy" class="mb-4">
              <p class="font-normal text-gray-700 dark:text-gray-400">
                <span class="font-semibold text-blue-600 dark:text-blue-500">{{ room.currentEvent?.summary || 'มีการประชุม' }}</span>
              </p>
              <p class="mt-2 text-sm text-gray-500 dark:text-gray-400 flex items-center">
                 <svg class="w-3.5 h-3.5 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/>
                 </svg>
                 {{ formatThaiTime(room.currentEvent?.start) }} - {{ formatThaiTime(room.currentEvent?.end) }}
              </p>
           </div>
           <div v-else class="mb-4 flex flex-col items-center justify-center py-2 text-gray-400">
              <svg class="w-10 h-10 mb-2 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
              </svg>
              <p class="text-sm">ห้องว่างพร้อมใช้งาน</p>
           </div>
        </div>
        
        <router-link 
          :to="{ path: '/booking', query: { room: room.id } }"
          class="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          จองห้องนี้
          <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, reactive } from 'vue'
import { useAuthStore } from '../stores/auth'
import { formatThaiDate, formatThaiTime } from '../utils/thaiDate'
import { getEvents } from '../services/gasApi'

const authStore = useAuthStore()

// Room Definitions
const rooms = ref([
  { id: 'ห้องประชุม SWOC7', name: 'ห้องประชุม SWOC7', isBusy: false, currentEvent: null },
  { id: 'ห้องประชุมเล็ก', name: 'ห้องประชุมเล็ก', isBusy: false, currentEvent: null },
  { id: 'ห้องประชุมรวงผึ้ง(ฝ่ายออกแบบ)', name: 'ห้องประชุมรวงผึ้ง(ฝ่ายออกแบบ)', isBusy: false, currentEvent: null }
])

// Stats State
const stats = reactive({
    today: 0,
    tomorrow: 0,
    thisWeek: 0,
    thisMonth: 0
})

// Current Date Time Display
const now = ref(new Date())
let timer = null

const currentDateTime = computed(() => {
  return `${formatThaiDate(now.value, 'long')} เวลา ${formatThaiTime(now.value)}`
})

onMounted(async () => {
  // Update time every second
  timer = setInterval(() => {
    now.value = new Date()
  }, 1000)

  await fetchAllData()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const getStartOfDay = (date) => {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    return d
}

const getEndOfDay = (date) => {
    const d = new Date(date)
    d.setHours(23, 59, 59, 999)
    return d
}

const addDays = (date, days) => {
    const d = new Date(date)
    d.setDate(d.getDate() + days)
    return d
}

const fetchAllData = async () => {
    try {
        // Fetch broad range for stats and current status
        // From start of month - 7 days to end of month + 7 days
        const today = new Date()
        const startDate = new Date(today.getFullYear(), today.getMonth(), 1)
        startDate.setDate(startDate.getDate() - 7)
        
        const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        endDate.setDate(endDate.getDate() + 7)

        const startIso = startDate.toISOString()
        const endIso = endDate.toISOString()

        const events = await getEvents(startIso, endIso)
        
        // Update Stats
        calculateStats(events)
        
        // Update Room Status
        updateRoomStatus(events)

    } catch (error) {
        console.error('Error fetching dashboard data:', error)
    }
}

const calculateStats = (events) => {
    const today = new Date()
    const todayStr = getStartOfDay(today).toISOString().split('T')[0]
    
    const tomorrow = addDays(today, 1)
    const tomorrowStr = getStartOfDay(tomorrow).toISOString().split('T')[0]
    
    // Week (Sunday - Saturday)
    const day = today.getDay()
    const diff = today.getDate() - day + (day == 0 ? -6 : 1) - 1; // adjust when day is sunday
    // Actually standard JS Sunday=0. Let's assume start of week is Sunday
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay())
    startOfWeek.setHours(0,0,0,0)
    
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23,59,59,999)

    // Month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    endOfMonth.setHours(23,59,59,999)

    let todayCount = 0
    let tomorrowCount = 0
    let weekCount = 0
    let monthCount = 0

    events.forEach(event => {
        if (event.status === 'cancelled') return 
        
        const evtStart = new Date(event.start.dateTime || event.start.date)
        const dateStr = evtStart.toISOString().split('T')[0] // Careful with UTC vs Local, but simple comparison suffices for broad stats
        
        // To be precise with local date string comparison:
        const evtLocalStr = new Date(evtStart.getTime() - (evtStart.getTimezoneOffset() * 60000)).toISOString().split('T')[0]
        // Note: Better to just comparing timestamps for ranges

        // Today
        if (evtLocalStr === todayStr) todayCount++
        
        // Tomorrow
        if (evtLocalStr === tomorrowStr) tomorrowCount++
        
        // This Week
        if (evtStart >= startOfWeek && evtStart <= endOfWeek) weekCount++
        
        // This Month
        if (evtStart >= startOfMonth && evtStart <= endOfMonth) monthCount++
    })

    stats.today = todayCount
    stats.tomorrow = tomorrowCount
    stats.thisWeek = weekCount
    stats.thisMonth = monthCount
}

const updateRoomStatus = (events) => {
  const currentTime = new Date()

  // Reset status
  rooms.value.forEach(r => {
    r.isBusy = false
    r.currentEvent = null
  })

  // Map events to rooms
  events.forEach(event => {
    const location = event.location
    const start = new Date(event.start.dateTime || event.start.date)
    const end = new Date(event.end.dateTime || event.end.date)

    // Check if event is happening NOW
    if (currentTime >= start && currentTime <= end) {
      const roomIndex = rooms.value.findIndex(r => r.id === location)
      if (roomIndex !== -1) {
        rooms.value[roomIndex].isBusy = true
        rooms.value[roomIndex].currentEvent = {
          summary: event.summary,
          start: start.toISOString(),
          end: end.toISOString()
        }
      }
    }
  })
}
</script>
