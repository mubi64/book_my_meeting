<template>
  <header class="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-800">
    <div class="container py-4 flex items-center justify-between">
      <div class="flex items-center">
        <button 
          v-if="showBackButton" 
          @click="goBack" 
          class="mr-4 p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size="20" />
        </button>
        
        <router-link to="/" class="flex items-center">
          <div class="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-lg shadow-sm mr-3">
            <CalendarDays size="24" />
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900 dark:text-white leading-none">BookMyMeeting</h1>
            <p class="text-xs text-gray-500 dark:text-gray-400">Meeting Room Booking System</p>
          </div>
        </router-link>
      </div>
      
      <div class="flex items-center space-x-4">
        <router-link 
          to="/history" 
          class="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
        >
          Reservation History
        </router-link>
        
        <!-- <button 
          @click="toggleTheme" 
          class="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          <Sun v-if="isDarkMode" size="20" />
          <Moon v-else size="20" />
        </button> -->
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { CalendarDays, ArrowLeft, Sun, Moon } from 'lucide-vue-next';

export default {
  name: 'AppHeader',
  components: {
    CalendarDays,
    ArrowLeft,
    Sun,
    Moon
  },
  setup() {
    const router = useRouter();
    const isDarkMode = ref(false);
    
    const showBackButton = computed(() => {
      return router.currentRoute.value.path !== '/';
    });
    
    const goBack = () => {
      router.back();
    };
    
    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value;
      document.documentElement.classList.toggle('dark', isDarkMode.value);
      localStorage.setItem('dark-mode', isDarkMode.value ? 'true' : 'false');
    };
    
    onMounted(() => {
      // Check for saved theme preference or system preference
      const savedTheme = localStorage.getItem('dark-mode');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme === 'true' || (savedTheme === null && systemPrefersDark)) {
        isDarkMode.value = true;
        document.documentElement.classList.add('dark');
      }
    });
    
    return {
      showBackButton,
      goBack,
      isDarkMode,
      toggleTheme
    };
  }
};
</script>