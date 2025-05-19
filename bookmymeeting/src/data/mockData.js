// Mock rooms data
export const rooms = [
  {
    id: '1',
    name: 'Boardroom Alpha',
    capacity: 12,
    amenities: ['Projector', 'Whiteboard', 'Video conferencing', 'Coffee machine'],
    imageUrl: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Floor 1'
  },
  {
    id: '2',
    name: 'Innovation Lab',
    capacity: 8,
    amenities: ['Smart TV', 'Whiteboard', 'Video conferencing'],
    imageUrl: 'https://images.pexels.com/photos/1181398/pexels-photo-1181398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Floor 2'
  },
  {
    id: '3',
    name: 'Focus Pod',
    capacity: 4,
    amenities: ['TV Screen', 'Whiteboard'],
    imageUrl: 'https://images.pexels.com/photos/7887946/pexels-photo-7887946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Floor 1'
  },
  {
    id: '4',
    name: 'Conference Room Beta',
    capacity: 20,
    amenities: ['Projector', 'Whiteboard', 'Video conferencing', 'Sound system', 'Coffee machine'],
    imageUrl: 'https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Floor 3'
  },
  {
    id: '5',
    name: 'Huddle Space',
    capacity: 6,
    amenities: ['TV Screen', 'Whiteboard'],
    imageUrl: 'https://images.pexels.com/photos/693859/pexels-photo-693859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Floor 2'
  },
  {
    id: '6',
    name: 'Strategy Room',
    capacity: 10,
    amenities: ['Projector', 'Whiteboard', 'Video conferencing'],
    imageUrl: 'https://images.pexels.com/photos/7654118/pexels-photo-7654118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Floor 3'
  }
];

// Generate time slots from 9 AM to 5 PM
export const generateTimeSlots = (date) => {
  const slots = [];
  const now = new Date();
  const isToday = date.setHours(0, 0, 0, 0) === now.setHours(0, 0, 0, 0);
  
  for (let hour = 9; hour < 17; hour++) {
    const startTime = `${hour}:00`;
    const endTime = `${hour + 1}:00`;
    
    // If it's today, only show future time slots
    const isAvailable = !(isToday && hour <= now.getHours());
    
    slots.push({
      id: `slot-${hour}`,
      startTime,
      endTime,
      isAvailable: Math.random() > 0.3 && isAvailable // Randomly make some slots unavailable
    });
  }
  
  return slots;
};

// Mock bookings for reservation history
export const bookings = [
  {
    id: 'booking-1',
    roomId: '1',
    roomName: 'Boardroom Alpha',
    date: '2025-05-15',
    timeSlot: {
      startTime: '10:00',
      endTime: '11:00'
    },
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      purpose: 'Team meeting'
    },
    createdAt: '2025-05-10T14:30:00'
  },
  {
    id: 'booking-2',
    roomId: '3',
    roomName: 'Focus Pod',
    date: '2025-05-16',
    timeSlot: {
      startTime: '14:00',
      endTime: '15:00'
    },
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      purpose: 'Client call'
    },
    createdAt: '2025-05-11T09:15:00'
  },
  {
    id: 'booking-3',
    roomId: '2',
    roomName: 'Innovation Lab',
    date: '2025-05-20',
    timeSlot: {
      startTime: '11:00',
      endTime: '12:00'
    },
    user: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '987-654-3210',
      purpose: 'Brainstorming session'
    },
    createdAt: '2025-05-12T16:45:00'
  }
];