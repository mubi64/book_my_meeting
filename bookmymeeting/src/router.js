import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'RoomSelection',
    component: () => import('@/views/RoomSelection.vue'),
    meta: { title: 'Select a Room' }
  },
  {
    path: '/room/:id',
    name: 'TimeSlotSelection',
    component: () => import('@/views/TimeSlotSelection.vue'),
    meta: { title: 'Select Time Slot' }
  },
  {
    path: '/book/:roomId/:slotId',
    name: 'BookingForm',
    component: () => import('@/views/BookingForm.vue'),
    meta: { title: 'Booking Details' }
  },
  {
    path: '/confirmation/:bookingId',
    name: 'BookingConfirmation',
    component: () => import('@/views/BookingConfirmation.vue'),
    meta: { title: 'Booking Confirmed' }
  },
  {
    path: '/history',
    name: 'ReservationHistory',
    component: () => import('@/views/ReservationHistory.vue'),
    meta: { title: 'Reservation History' }
  }
];

let router = createRouter({
  history: createWebHistory('/bookmymeeting'),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  }
})

router.beforeEach(async (to, from, next) => {
  document.title = `${to.meta.title} | Book My Meeting`;
  next();
})

export default router
