<template>
  <div class="container py-6 max-w-2xl">
    <div v-if="selectedRoom && selectedSlot">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Booking Details</h2>
        <p class="text-gray-600 dark:text-gray-400">
          Complete your booking for <span class="font-medium text-blue-600 dark:text-blue-400">{{ selectedRoom.name }}</span>
          on <span class="font-medium">{{ formattedDate }}</span> at 
          <span class="font-medium">{{ selectedSlot.startTime }} - {{ selectedSlot.endTime }}</span>
        </p>
      </div>
      
      <div class="card p-6">
        <form @submit.prevent="submitBooking">
          <div class="form-group">
            <label for="name" class="form-label">Full Name <span class="text-red-500">*</span></label>
            <input 
              type="text" 
              id="name" 
              v-model="userDetails.name" 
              class="form-input" 
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="email" class="form-label">Email Address <span class="text-red-500">*</span></label>
            <input 
              type="email" 
              id="email" 
              v-model="userDetails.email" 
              class="form-input" 
              placeholder="Enter your email address"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="phone" class="form-label">Phone Number <span class="text-red-500">*</span></label>
            <input 
              type="tel" 
              id="phone" 
              v-model="userDetails.phone" 
              class="form-input" 
              placeholder="Enter your phone number"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="purpose" class="form-label">Purpose of Meeting <span class="text-red-500">*</span></label>
            <textarea 
              id="purpose" 
              v-model="userDetails.purpose" 
              class="form-input min-h-[100px]" 
              placeholder="Briefly describe the purpose of your meeting"
              required
            ></textarea>
          </div>
          
          <div class="mt-8 flex items-center justify-between">
            <button type="button" @click="goBack" class="btn btn-outline p-2">
              Back
            </button>
            <button type="submit" class="btn btn-primary p-2" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="flex items-center">
                <RefreshCw size="16" class="animate-spin mr-2" />
                Submitting...
              </span>
              <span v-else>Confirm Booking</span>
            </button>
          </div>
        </form>
      </div>
    </div>
    <div v-else class="text-center py-12">
      <p class="text-gray-600 dark:text-gray-400">Please select a room and time slot first.</p>
      <button @click="goToRoomSelection" class="btn btn-primary mt-4">
        Go to Room Selection
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { format } from 'date-fns';
import { useBookingStore } from '../stores/bookingStore';
import { RefreshCw } from 'lucide-vue-next';

export default {
  name: 'BookingForm',
  components: {
    RefreshCw
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const bookingStore = useBookingStore();
    
    const userDetails = ref({
      name: '',
      email: '',
      phone: '',
      purpose: ''
    });
    
    const isSubmitting = ref(false);
    
    const formattedDate = computed(() => {
      return format(bookingStore.selectedDate, 'EEEE, MMMM do, yyyy');
    });
    
    const submitBooking = async () => {
      isSubmitting.value = true;
      
      try {
        // Set user details in the store
        bookingStore.setUserDetails(userDetails.value);
        
        // Create booking and get booking ID
        const bookingId = bookingStore.createBooking();
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Navigate to confirmation page
        router.push({
          name: 'BookingConfirmation',
          params: { bookingId }
        });
      } catch (error) {
        console.error('Error creating booking:', error);
        alert('There was an error creating your booking. Please try again.');
      } finally {
        isSubmitting.value = false;
      }
    };
    
    const goBack = () => {
      router.back();
    };
    
    const goToRoomSelection = () => {
      router.push({ name: 'RoomSelection' });
    };
    
    return {
      selectedRoom: bookingStore.selectedRoom,
      selectedSlot: bookingStore.selectedSlot,
      formattedDate,
      userDetails,
      isSubmitting,
      submitBooking,
      goBack,
      goToRoomSelection
    };
  }
};
</script>