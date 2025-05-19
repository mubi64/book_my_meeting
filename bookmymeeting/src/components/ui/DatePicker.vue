<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
    <div class="flex items-center justify-between mb-4">
      <button 
        class="p-1.5 rounded text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
        @click="previousMonth"
      >
        <ChevronLeft size="20" />
      </button>
      
      <div class="text-center">
        <h3 class="font-medium text-gray-900 dark:text-white">
          {{ formatMonth(currentMonth) }}
        </h3>
      </div>
      
      <button 
        class="p-1.5 rounded text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
        @click="nextMonth"
      >
        <ChevronRight size="20" />
      </button>
    </div>
    
    <div class="grid grid-cols-7 gap-1 text-center mb-2">
      <span v-for="day in weekdays" :key="day" class="text-xs font-medium text-gray-500 dark:text-gray-400">
        {{ day }}
      </span>
    </div>
    
    <div class="grid grid-cols-7 gap-1">
      <button
        v-for="(date, index) in calendarDays"
        :key="index"
        :class="[
          'h-9 w-9 rounded-full flex items-center justify-center text-sm transition-colors duration-200',
          isCurrentDay(date) ? 'bg-blue-500 text-white' : '',
          !isCurrentDay(date) && isSelectedDay(date) ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : '',
          !date ? 'invisible' : '',
          date && !isSelectedDay(date) && !isCurrentDay(date) ? 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300' : '',
          isPastDate(date) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        ]"
        :disabled="!date || isPastDate(date)"
        @click="date && !isPastDate(date) && selectDate(date)"
      >
        {{ date ? date.getDate() : '' }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isBefore } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

export default {
  name: 'DatePicker',
  components: {
    ChevronLeft,
    ChevronRight
  },
  props: {
    modelValue: {
      type: Date,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const currentMonth = ref(new Date());
    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    
    onMounted(() => {
      // Initialize currentMonth to be the month of the selected date
      currentMonth.value = new Date(props.modelValue);
    });
    
    const calendarDays = computed(() => {
      const monthStart = startOfMonth(currentMonth.value);
      const monthEnd = endOfMonth(currentMonth.value);
      const startDate = startOfWeek(monthStart);
      const endDate = endOfWeek(monthEnd);
      
      const days = eachDayOfInterval({ start: startDate, end: endDate });
      
      return days;
    });
    
    const formatMonth = (date) => {
      return format(date, 'MMMM yyyy');
    };
    
    const previousMonth = () => {
      currentMonth.value = subMonths(currentMonth.value, 1);
    };
    
    const nextMonth = () => {
      currentMonth.value = addMonths(currentMonth.value, 1);
    };
    
    const isCurrentDay = (date) => {
      if (!date) return false;
      return isSameDay(date, new Date());
    };
    
    const isSelectedDay = (date) => {
      if (!date) return false;
      return isSameDay(date, props.modelValue);
    };
    
    const isPastDate = (date) => {
      if (!date) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return isBefore(date, today);
    };
    
    const selectDate = (date) => {
      emit('update:modelValue', date);
    };
    
    return {
      currentMonth,
      weekdays,
      calendarDays,
      formatMonth,
      previousMonth,
      nextMonth,
      isCurrentDay,
      isSelectedDay,
      isPastDate,
      selectDate
    };
  }
};
</script>