import { api } from './api';

// Define Event interface based on the Swagger documentation
export interface Event {
  id: number;
  title: string;
  description: string;
  date: string; // ISO date format
  location: string;
  image_url: string;
  organizer_id: number;
  is_active: boolean;
}

export interface EventCreate {
  title: string;
  description: string;
  date: string; // ISO date format
  location?: string;
  image_url?: string;
}

export interface EventUpdate {
  title?: string;
  description?: string;
  date?: string;
  location?: string;
  image_url?: string;
  is_active?: boolean;
}

// Helper function to create a proper URL with query params for event creation
const createEventUrl = (eventData: EventCreate) => {
  // Ensure date is in YYYY-MM-DD format without time component
  const dateOnly = eventData.date.split('T')[0];
  
  let url = `/api/upcoming-events/?title=${encodeURIComponent(eventData.title)}&description=${encodeURIComponent(eventData.description)}&date=${encodeURIComponent(dateOnly)}`;
  
  if (eventData.location) {
    url += `&location=${encodeURIComponent(eventData.location)}`;
  }
  
  return url;
};

export const eventsService = {
  // Get all upcoming events with pagination
  getUpcomingEvents: async (skip: number = 0, limit: number = 100) => {
    try {
      const response = await api.get(`/api/upcoming-events/?skip=${skip}&limit=${limit}`);
      return response;
    } catch (error) {
      console.error('Error in getUpcomingEvents:', error);
      throw error;
    }
  },
  
  // Get a single event by ID
  getEvent: (id: number) => {
    return api.get(`/api/upcoming-events/${id}`);
  },
  
  // Create a new event (requires authentication)
  // According to Swagger, this should be a multipart/form-data POST with query parameters
  createEvent: (eventData: EventCreate, imageFile?: File) => {
    if (imageFile) {
      // If we have an image, use FormData for multipart/form-data
      const formData = new FormData();
      formData.append('image', imageFile);
      
      // Create URL with query parameters as specified in the Swagger doc
      const url = createEventUrl(eventData);
      
      return api.post(url, formData);
    } else {
      // No image, still use the query parameter approach
      const url = createEventUrl(eventData);
      return api.post(url, null);
    }
  },
  
  // Update an event (requires authentication)
  updateEvent: (id: number, eventData: EventUpdate) => {
    return api.put(`/api/upcoming-events/${id}`, eventData);
  },
  
  // Delete an event (requires authentication)
  deleteEvent: (id: number) => {
    return api.delete(`/api/upcoming-events/${id}`);
  }
}; 