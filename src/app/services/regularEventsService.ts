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
}

export interface EventUpdate {
  title?: string;
  description?: string;
  date?: string;
  location?: string;
}

// Helper function to create a proper URL with query params for event creation
const createEventUrl = (eventData: EventCreate) => {
  // Ensure date is in YYYY-MM-DD format without time component
  const dateOnly = eventData.date.split('T')[0];
  
  let url = `/api/events/?title=${encodeURIComponent(eventData.title)}&description=${encodeURIComponent(eventData.description)}&date=${encodeURIComponent(dateOnly)}`;
  
  if (eventData.location) {
    url += `&location=${encodeURIComponent(eventData.location)}`;
  }
  
  return url;
};

// Helper function to create a proper URL with query params for event update
const updateEventUrl = (id: number, eventData: EventUpdate) => {
  let url = `/api/events/${id}?`;
  const params = [];
  
  if (eventData.title) {
    params.push(`title=${encodeURIComponent(eventData.title)}`);
  }
  
  if (eventData.description) {
    params.push(`description=${encodeURIComponent(eventData.description)}`);
  }
  
  if (eventData.date) {
    // Ensure date is in YYYY-MM-DD format without time component
    const dateOnly = eventData.date.split('T')[0];
    params.push(`date=${encodeURIComponent(dateOnly)}`);
  }
  
  if (eventData.location) {
    params.push(`location=${encodeURIComponent(eventData.location)}`);
  }
  
  return url + params.join('&');
};

export const regularEventsService = {
  // Get all events
  getEvents: async () => {
    try {
      const response = await api.get('/api/events/');
      return response;
    } catch (error) {
      console.error('Error in getEvents:', error);
      throw error;
    }
  },
  
  // Get a single event by ID
  getEvent: async (id: number) => {
    try {
      const response = await api.get(`/api/events/${id}`);
      return response;
    } catch (error) {
      console.error(`Error in getEvent(${id}):`, error);
      throw error;
    }
  },
  
  // Create a new event (requires authentication)
  createEvent: async (eventData: EventCreate, imageFile?: File) => {
    try {
      // Create URL with query parameters as specified in the Swagger doc
      const url = createEventUrl(eventData);
      
      // Create FormData for image upload
      const formData = new FormData();
      if (imageFile) {
        formData.append('image', imageFile);
      }
      
      // Make the API call with authentication
      const response = await api.post(url, formData);
      return response;
    } catch (error) {
      console.error('Error in createEvent:', error);
      throw error;
    }
  },
  
  // Update an event (requires authentication)
  updateEvent: async (id: number, eventData: EventUpdate, imageFile?: File) => {
    try {
      const url = updateEventUrl(id, eventData);
      
      // Create FormData for image upload
      const formData = new FormData();
      if (imageFile) {
        formData.append('image', imageFile);
      }
      
      // Make the API call with authentication
      const response = await api.put(url, formData);
      return response;
    } catch (error) {
      console.error(`Error in updateEvent(${id}):`, error);
      throw error;
    }
  },
  
  // Delete an event (requires authentication)
  deleteEvent: async (id: number) => {
    try {
      const response = await api.delete(`/api/events/${id}`);
      return response;
    } catch (error) {
      console.error(`Error in deleteEvent(${id}):`, error);
      throw error;
    }
  }
}; 