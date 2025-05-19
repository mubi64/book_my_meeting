import { defineStore } from 'pinia';
import { format } from 'date-fns';
import { generateTimeSlots, bookings } from '@/data/mockData';
import { createResource } from 'frappe-ui'


export const useBookingStore = defineStore('booking', {
  state: () => ({
    rooms: [],
    selectedRoom: null,
    selectedDate: new Date(),
    selectedSlot: null,
    timeSlots: [],
    bookings: bookings,
    userDetails: {
      name: '',
      email: '',
      phone: '',
      purpose: ''
    },
    currentBooking: null
  }),
  
  getters: {
    formattedDate() {
      return format(this.selectedDate, 'yyyy-MM-dd');
    }
  },
  
  actions: {
    fetchRooms() {
      createResource({
        url: 'book_my_meeting.book_my_meeting.api.meeting_room.get_meeting_rooms',
        auto: true,
        onSuccess(data) {
          this.rooms = data;
        },
      })
    },

    selectRoom(roomId) {
      this.selectedRoom = this.rooms.find(room => room.id === roomId);
      this.refreshTimeSlots();
    },
    
    selectDate(date) {
      this.selectedDate = date;
      this.refreshTimeSlots();
    },
    
    refreshTimeSlots() {
      this.timeSlots = generateTimeSlots(this.selectedDate);
      this.selectedSlot = null;
    },
    
    selectTimeSlot(slotId) {
      this.selectedSlot = this.timeSlots.find(slot => slot.id === slotId);
    },
    
    setUserDetails(details) {
      this.userDetails = { ...details };
    },
    
    createBooking() {
      // Generate a new booking
      const newBooking = {
        id: `booking-${Date.now()}`,
        roomId: this.selectedRoom.id,
        roomName: this.selectedRoom.name,
        date: this.formattedDate,
        timeSlot: {
          startTime: this.selectedSlot.startTime,
          endTime: this.selectedSlot.endTime
        },
        user: { ...this.userDetails },
        createdAt: new Date().toISOString()
      };
      
      // Add to bookings
      this.bookings.push(newBooking);
      this.currentBooking = newBooking;
      
      return newBooking.id;
    },
    
    getBookingsByEmail(email) {
      return this.bookings.filter(booking => 
        booking.user.email.toLowerCase() === email.toLowerCase()
      );
    },
    
    getBookingById(id) {
      return this.bookings.find(booking => booking.id === id);
    },
    
    resetBooking() {
      this.selectedRoom = null;
      this.selectedSlot = null;
      this.userDetails = {
        name: '',
        email: '',
        phone: '',
        purpose: ''
      };
      this.currentBooking = null;
    }
  }
});