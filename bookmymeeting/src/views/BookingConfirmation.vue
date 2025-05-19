<template>
  <div class="container py-6 max-w-2xl">
    <div v-if="booking">
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
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Booking ID</div>
                <div class="font-medium">{{ booking.id }}</div>
              </div>
              
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Date</div>
                <div class="font-medium">{{ formatDate(booking.date) }}</div>
              </div>
              
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Time</div>
                <div class="font-medium">{{ booking.timeSlot.startTime }} - {{ booking.timeSlot.endTime }}</div>
              </div>
              
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Purpose</div>
                <div class="font-medium">{{ booking.user.purpose }}</div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Room Details</h3>
            
            <div class="space-y-3">
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Room</div>
                <div class="font-medium">{{ booking.roomName }}</div>
              </div>
              
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Location</div>
                <div class="font-medium">{{ roomDetails ? roomDetails.location : 'N/A' }}</div>
              </div>
              
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Capacity</div>
                <div class="font-medium">{{ roomDetails ? roomDetails.capacity : 'N/A' }} people</div>
              </div>
              
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Contact Information</div>
                <div class="font-medium">{{ booking.user.name }}</div>
                <div class="text-sm">{{ booking.user.email }}</div>
                <div class="text-sm">{{ booking.user.phone }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
        <button @click="returnToHome" class="btn btn-outline w-full sm:w-auto">
          Book Another Room
        </button>
        <button @click="viewBookingHistory" class="btn btn-primary w-full sm:w-auto">
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

<script>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { format, parseISO } from 'date-fns';
import { useBookingStore } from '../stores/bookingStore';
import { CheckCircle } from 'lucide-vue-next';

export default {
  name: 'BookingConfirmation',
  components: {
    CheckCircle
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const bookingStore = useBookingStore();
    
    const bookingId = route.params.bookingId;
    
    const booking = computed(() => {
      return bookingStore.getBookingById(bookingId);
    });
    
    const roomDetails = computed(() => {
      if (!booking.value) return null;
      return bookingStore.rooms.find(room => room.id === booking.value.roomId);
    });
    
    const formatDate = (dateString) => {
      return format(parseISO(dateString), 'EEEE, MMMM do, yyyy');
    };
    
    const returnToHome = () => {
      bookingStore.resetBooking();
      router.push({ name: 'RoomSelection' });
    };
    
    const viewBookingHistory = () => {
      router.push({ name: 'ReservationHistory' });
    };
    
    return {
      booking,
      roomDetails,
      formatDate,
      returnToHome,
      viewBookingHistory
    };
  }
};
</script>