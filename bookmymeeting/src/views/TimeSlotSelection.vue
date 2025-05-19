<template>
  <div class="container py-6">
    <div v-if="selectedRoom.data">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Select a Time Slot</h2>
        <p class="text-gray-600 dark:text-gray-400">
          Booking for <span class="font-medium text-blue-600 dark:text-blue-400">{{ selectedRoom.data.name }}</span>
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">Select Date</h3>
          <DatePicker v-model="selectedDate" />
        </div>
        
        <div class="lg:col-span-2" v-if="!selectedRoom.loading">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Available Time Slots for {{ formattedSelectedDate }}
          </h3>
          
          <div class="space-y-3">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <TimeSlotCard 
                v-for="slot in selectedRoom.data.timeslots" 
                :key="slot.id" 
                :slot="slot" 
                :isSelected="selectedSlotId === slot.id"
                @select="selectTimeSlot"
              />
            </div>
          </div>
          
          <div class="mt-6">
            <button 
              class="btn btn-primary btn-lg"
              :disabled="!selectedSlotId"
              @click="proceedToBooking"
            >
              Continue
            </button>
          </div>
        </div>
        <div v-else class="flex items-center justify-center h-screen">
          <Spinner class="w-8" />
        </div>
      </div>
    </div>
    <div v-else class="flex items-center justify-center h-screen">
      <Spinner class="w-8" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import router from '@/router'
import { createResource, Spinner } from 'frappe-ui'
import { useRoute } from 'vue-router';
import { format } from 'date-fns';
import DatePicker from '@/components/ui/DatePicker.vue';
import TimeSlotCard from '@/components/ui/TimeSlotCard.vue';

const route = useRoute();
const roomId = route.params.id;
const selectedDate = ref(new Date());
const selectedSlotId = ref(null);

let selectedRoom = createResource({
  url: 'book_my_meeting.book_my_meeting.api.meeting_room.get_meeting_room_by_name',
  params:{
    name: roomId,
    date: selectedDate.value.toISOString().split('T')[0]
  },
  auto: true
})

const formattedSelectedDate = computed(() => {
  return format(selectedDate.value, 'EEEE, MMMM do, yyyy');
});

watch(selectedDate, (newDate) => {
  const adjustedDate = new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000);
  selectedRoom.update({
    params:{
      name: roomId,
      date: adjustedDate.toISOString().split('T')[0]
    }
  });
  selectedRoom.fetch();
});

const selectTimeSlot = (slotId) => {
  selectedSlotId.value = slotId;
};

const proceedToBooking = () => {
  if (selectedSlotId.value) {
    const selectedSlot = selectedRoom.data.timeslots.find(slot => slot.id === selectedSlotId.value);
    if (selectedSlot) {
      const adjustedDate = new Date(selectedDate.value.getTime() - selectedDate.value.getTimezoneOffset() * 60000);
      router.push({
        name: 'BookingForm',
        params: { roomId, slotId: selectedSlotId.value },
        query: {
          date: adjustedDate.toISOString().split('T')[0],
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          roomName: selectedRoom.data.name
        }
      });
    }
  }
};
</script>