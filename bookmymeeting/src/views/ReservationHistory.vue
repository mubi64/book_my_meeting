<template>
  <div class="container py-6 max-w-3xl">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Reservation History</h2>
      <p class="text-gray-600 dark:text-gray-400">View your past and upcoming bookings</p>
    </div>
    
    <div class="card p-6 mb-8">
      <form @submit.prevent="searchBookings">
        <label for="email" class="form-label">Enter your email address to view your reservations</label>
        <div class="flex space-x-4 items-center">
          <input 
            type="email" 
            id="email" 
            v-model="searchEmail" 
            class="form-input flex-grow p-2"
            placeholder="Enter your email address"
            required
          />
          <button type="submit" class="btn btn-primary p-2">
            <Search size="18" class="mr-2" />
            Search
          </button>
        </div>
      </form>
    </div>
    
    <div v-if="hasSearched">
      <div v-if="userBookings.length > 0">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Found {{ userBookings.length }} reservation{{ userBookings.length !== 1 ? 's' : '' }}
        </h3>
        
        <div class="space-y-4">
          <div 
            v-for="booking in userBookings" 
            :key="booking.id"
            class="card hover:shadow-md transition-all duration-200"
          >
            <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                <span class="text-sm font-medium">
                  {{ formatDate(booking.date) }}
                </span>
                <span class="mx-2 text-gray-400">|</span>
                <span class="text-sm">
                  {{ booking.timeSlot.startTime }} - {{ booking.timeSlot.endTime }}
                </span>
              </div>
              <span 
                :class="[
                  'badge',
                  isUpcoming(booking.date) 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                ]"
              >
                {{ isUpcoming(booking.date) ? 'Upcoming' : 'Past' }}
              </span>
            </div>
            
            <div class="p-4">
              <h4 class="font-medium text-lg text-gray-900 dark:text-white mb-2">
                {{ booking.roomName }}
              </h4>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Purpose</div>
                  <div class="font-medium">{{ booking.user.purpose }}</div>
                </div>
                
                <div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Contact</div>
                  <div class="font-medium">{{ booking.user.name }}</div>
                  <div class="text-sm">{{ booking.user.email }}</div>
                  <div class="text-sm">{{ booking.user.phone }}</div>
                </div>
              </div>
              
              <div class="mt-4 text-xs text-gray-500 dark:text-gray-400">
                Booked on {{ formatDateTime(booking.createdAt) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-12 card p-8">
        <CalendarX size="48" class="mx-auto text-gray-400 mb-4" />
        <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">No reservations found</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          We couldn't find any reservations for {{ searchEmail }}
        </p>
        <button @click="goToRoomSelection" class="btn btn-primary">
          Make a Booking
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { format, parseISO, isAfter } from 'date-fns';
import { useBookingStore } from '../stores/bookingStore';
import { Search, CalendarX } from 'lucide-vue-next';

export default {
  name: 'ReservationHistory',
  components: {
    Search,
    CalendarX
  },
  setup() {
    const router = useRouter();
    const bookingStore = useBookingStore();
    
    const searchEmail = ref('');
    const userBookings = ref([]);
    const hasSearched = ref(false);
    
    const searchBookings = () => {
      userBookings.value = bookingStore.getBookingsByEmail(searchEmail.value);
      hasSearched.value = true;
    };
    
    const formatDate = (dateString) => {
      return format(parseISO(dateString), 'EEEE, MMMM do, yyyy');
    };
    
    const formatDateTime = (dateTimeString) => {
      return format(parseISO(dateTimeString), 'MMM d, yyyy h:mm a');
    };
    
    const isUpcoming = (dateString) => {
      return isAfter(parseISO(dateString), new Date());
    };
    
    const goToRoomSelection = () => {
      router.push({ name: 'RoomSelection' });
    };
    
    return {
      searchEmail,
      userBookings,
      hasSearched,
      searchBookings,
      formatDate,
      formatDateTime,
      isUpcoming,
      goToRoomSelection
    };
  }
};
</script>