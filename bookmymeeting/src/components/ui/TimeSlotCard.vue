<template>
  <div 
    :class="[
      'p-4 rounded-lg border transition-all duration-200',
      slot.isAvailable 
        ? isSelected 
          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 shadow-sm' 
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer' 
        : 'bg-gray-100 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-60 cursor-not-allowed'
    ]"
    @click="slot.isAvailable && $emit('select', slot.id)"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <Clock :size="18" :class="isSelected ? 'text-blue-500' : 'text-gray-500'" />
        <span class="font-medium text-gray-900 dark:text-white">
          {{ slot.startTime }} - {{ slot.endTime }}
        </span>
      </div>
      
      <span 
        :class="[
          'text-xs font-medium px-2 py-1 rounded-full',
          slot.isAvailable 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
        ]"
      >
        {{ slot.isAvailable ? 'Available' : 'Unavailable' }}
      </span>
    </div>
  </div>
</template>

<script>
import { Clock } from 'lucide-vue-next';

export default {
  name: 'TimeSlotCard',
  components: {
    Clock
  },
  props: {
    slot: {
      type: Object,
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  emits: ['select']
};
</script>