<template>
  <footer class="py-6 border-t border-gray-200 dark:border-gray-800">
    <div class="container flex flex-col md:flex-row justify-between items-center">
      <div class="mb-4 md:mb-0">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          &copy; {{ currentYear }} BookMyMeeting by SowaanERP. All rights reserved.
        </p>
      </div>
      
      <div class="flex items-center space-x-6">
        <a href="#" class="text-sm text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">Help</a>
        <a href="#" class="text-sm text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">Privacy</a>
        <a href="#" class="text-sm text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">Terms</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
};
</script>