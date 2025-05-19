<template>
  <div class="container py-6" v-if="!rooms.loading">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Select a Meeting Room</h2>
      <p class="text-gray-600 dark:text-gray-400">Choose from our available meeting spaces</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <RoomCard 
        v-for="room in rooms.data" 
        :key="room.id" 
        :room="room" 
        @select="selectRoom(room.id)"
      />
    </div>
  </div>
  <div v-else class="text-center py-12">
    <p class="text-gray-600 dark:text-gray-400">Loading...</p>
  </div>
</template>

<script setup>
import router from '@/router'
import { createResource } from 'frappe-ui'
import RoomCard from '@/components/ui/RoomCard.vue';


const rooms = createResource({
  url: 'book_my_meeting.book_my_meeting.api.meeting_room.get_meeting_rooms',
  auto: true
})

const selectRoom = (roomId) => {
  router.push({ name: 'TimeSlotSelection', params: { id: roomId } });
};

// export default {
//   name: 'RoomSelection',
//   components: {
//     RoomCard
//   },
//   setup() {
//     const router = useRouter();
//     const bookingStore = useBookingStore();

//     rooms = createResource({
//       url: 'book_my_meeting.book_my_meeting.api.meeting_room.get_meeting_rooms',
//       auto: true
//     })
    
//     const selectRoom = (roomId) => {
//       bookingStore.selectRoom(roomId);
//       router.push({ name: 'TimeSlotSelection', params: { id: roomId } });
//     };
    
//     onMounted(() => {
//       // Reset the booking state when arriving at the room selection page
//       bookingStore.resetBooking();
//     });
    
//     return {
//       rooms: bookingStore.rooms,
//       selectRoom
//     };
//   }
// };
</script>