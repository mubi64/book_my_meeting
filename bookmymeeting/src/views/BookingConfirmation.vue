<template>
  <div class="container py-6 max-w-2xl">
    <div v-if="roomName && date && start_time && end_time">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <CheckCircle size="32" class="text-green-600 dark:text-green-400" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Booking Confirmed!</h2>
        <p class="text-gray-600 dark:text-gray-400">
          Your booking has been successfully confirmed. Below are your booking details.
        </p>
      </div>
      
      <div class="card p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Booking Information</h3>
            
            <div class="space-y-3">
              <!-- <div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Booking ID</div>
                <div class="font-medium">{{ booking.id }}</div>
              </div> -->
              
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Date</div>
                <div class="font-medium">{{ formatDate(date) }}</div>
              </div>
              
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Time</div>
                <div class="font-medium">{{ start_time }} - {{ end_time }}</div>
              </div>
              
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Purpose</div>
                <div class="font-medium">{{ purpose }}</div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Room Details</h3>
            
            <div class="space-y-3">
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Room</div>
                <div class="font-medium">{{ roomName }}</div>
              </div>
              
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Contact Information</div>
                <div class="font-medium">{{ name }}</div>
                <div class="text-sm">{{ email }}</div>
                <div class="text-sm">{{ phone }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
        <button @click="returnToHome" class="btn btn-outline w-full sm:w-auto p-2">
          Book Another Room
        </button>
        <button @click="viewBookingHistory" class="btn btn-primary w-full sm:w-auto p-2">
          View My Bookings
        </button>
      </div>
    </div>
    <div v-else class="text-center py-12">
      <p class="text-gray-600 dark:text-gray-400">Booking not found. Please try again.</p>
      <button @click="returnToHome" class="btn btn-primary mt-4">
        Return to Room Selection
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import router from '@/router'
import { format, parseISO } from 'date-fns';
import { CheckCircle } from 'lucide-vue-next';

const route = useRoute();

const {
  roomName,
  date,
  start_time,
  end_time,
  name,
  email,
  phone,
  purpose
} = route.query;

const formatDate = (dateString) => {
  return format(parseISO(dateString), 'EEEE, MMMM do, yyyy');
};

const returnToHome = () => {
  router.push({ name: 'RoomSelection' });
};

const viewBookingHistory = () => {
  router.push({ name: 'ReservationHistory' });
};

// export default {
//   name: 'BookingConfirmation',
//   components: {
//     CheckCircle
//   },
//   setup() {
//     const route = useRoute();
//     const router = useRouter();
//     const bookingStore = useBookingStore();
    
//     const bookingId = route.params.bookingId;
    
//     const booking = computed(() => {
//       return bookingStore.getBookingById(bookingId);
//     });
    
//     const roomDetails = computed(() => {
//       if (!booking.value) return null;
//       return bookingStore.rooms.find(room => room.id === booking.value.roomId);
//     });
    
//     const formatDate = (dateString) => {
//       return format(parseISO(dateString), 'EEEE, MMMM do, yyyy');
//     };
    
//     const returnToHome = () => {
//       bookingStore.resetBooking();
//       router.push({ name: 'RoomSelection' });
//     };
    
//     const viewBookingHistory = () => {
//       router.push({ name: 'ReservationHistory' });
//     };
    
//     return {
//       booking,
//       roomDetails,
//       formatDate,
//       returnToHome,
//       viewBookingHistory
//     };
//   }
// };
</script>