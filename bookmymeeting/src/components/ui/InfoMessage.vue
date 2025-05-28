<template>
    <div v-if="message" 
        class="border px-4 py-3 rounded relative whitespace-pre-line text-sm" 
        role="alert"
        :class="{
          'bg-red-100 text-red-700 border-red-400': type === 'error',
          'bg-yellow-100 text-yellow-700 border-yellow-400': type === 'warning',
          'bg-blue-100 text-blue-700 border-blue-400': type === 'info',
          'bg-green-100 text-green-700 border-green-400': type === 'success'
        }">
        <strong class="font-bold mr-1" v-if="title">{{ title }}</strong>
        <span class="block sm:inline">{{ message }}</span>
    </div>
  </template>
  
  <script setup lang="ts">
  
  const props = defineProps<{
    message?: string | Error
    title?: string
    type?: 'error' | 'warning' | 'info' | 'success'
  }>()
  
  </script>
  