<template>
  <div 
    class="card hover:shadow-md transition-all duration-300 cursor-pointer group"
    @click="$emit('select', room.id)"
  >
    <div class="relative h-48 overflow-hidden">
      <img 
        :src="room.imageUrl" 
        :alt="room.name" 
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ room.name }}</h3>
      
      <div class="flex items-center text-gray-600 dark:text-gray-300 mb-2">
        <Users size="16" class="mr-2" />
        <span class="text-sm">Capacity: {{ room.capacity }}</span>
      </div>
      
      <div class="flex items-center text-gray-600 dark:text-gray-300 mb-2">
        <MapPin size="16" class="mr-2" />
        <span class="text-sm">{{ room.location }}</span>
      </div>
      
      <div class="mt-3">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amenities:</h4>
        <div class="flex flex-wrap gap-1">
          <span 
            v-for="(amenity, index) in room.amenities" 
            :key="index" 
            class="badge bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <component :is="getAmenityIcon(amenity)" size="12" class="mr-1" />
            {{ amenity }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Users, MapPin, Monitor, PenSquare, Video, Coffee, Projector } from 'lucide-vue-next';

export default {
  name: 'RoomCard',
  components: {
    Users,
    MapPin,
    Monitor,
    PenSquare,
    Video,
    Coffee
  },
  props: {
    room: {
      type: Object,
      required: true
    }
  },
  methods: {
    getAmenityIcon(amenity) {
      const amenityLower = amenity.toLowerCase();
      if (amenityLower.includes('tv')) return Monitor;
      if (amenityLower.includes('projector')) return Projector;
      if (amenityLower.includes('whiteboard')) return PenSquare;
      if (amenityLower.includes('video')) return Video;
      if (amenityLower.includes('refreshments')) return Coffee;
      return MapPin; // Default icon
    }
  },
  emits: ['select']
};
</script>