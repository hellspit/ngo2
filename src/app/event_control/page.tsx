'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import './style.css';
import { Event, EventCreate, EventUpdate, eventsService } from '../services/eventsService';
import {
  Globe,
  Info,
  FileText,
  Users,
  Mail,
  Menu,
  X,
  Trash2,
  Edit,
  Plus,
  Save,
  Search,
  Image as ImageIcon,
  Camera,
  ArrowLeft,
  ArrowRight,
  Check
} from 'lucide-react';
import { API_URL } from '../../utils/api';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', icon: <Globe size={20} />, href: '/' },
  { label: 'About Us', icon: <Info size={20} />, href: '/about' },
  { label: 'Media', icon: <FileText size={20} />, href: '/media' },
  { label: 'Members', icon: <Users size={20} />, href: '/member' },
  { label: 'Contact us', icon: <Mail size={20} />, href: '/contact' },
];

export default function EventControlPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // New event form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<EventCreate>>({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    image_url: ''
  });
  
  // Edit event state
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  // Flashcard states
  const [showFlashcard, setShowFlashcard] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Add a state to track the selected image file
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  
  // Add a state to track the edited image file
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  
  // Check authentication on page load
  useEffect(() => {
    fetchEvents();
  }, []);
  
  // Fetch events from backend API
  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/upcoming-events/?skip=0&limit=100`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      
      const data = await response.json();
      setEvents(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Error loading events. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Filter events based on search term
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle new event form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value
    });
  };
  
  // Handle edit event form input changes
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editingEvent) return;
    
    const { name, value } = e.target;
    
    // Special handling for is_active which should be a boolean
    if (name === 'is_active') {
      setEditingEvent({
        ...editingEvent,
        [name]: value === 'true' // Convert string 'true'/'false' to boolean
      });
    } else {
      setEditingEvent({
        ...editingEvent,
        [name]: value
      });
    }
  };
  
  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    console.log('Selected image file:', file.name, file.type, file.size);
    
    // Save the file for later upload
    setSelectedImageFile(file);
    
    // Create a preview URL for display
    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);
    
    // Update the form data (note we don't set the actual file here)
    setNewEvent({
      ...newEvent,
      image_url: objectUrl // This is just for preview
    });
  };
  
  // Handle image file selection for editing
  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingEvent) return;
    
    // Save the file for later upload
    setEditImageFile(file);
    
    // Create a preview URL for display
    const objectUrl = URL.createObjectURL(file);
    
    // Update the editingEvent with the new image preview
    setEditingEvent({
      ...editingEvent,
      image_url: objectUrl // This is just for preview
    });
  };
  
  // Add a new event
  const handleAddEvent = async () => {
    try {
      if (!newEvent.title || !newEvent.description || !newEvent.date) {
        setError('Title, description and date are required');
        return;
      }
      
      // Get the token from localStorage for authentication
      let token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required. Please try logging in again at /login');
        return;
      }
      
      // Ensure date is in YYYY-MM-DD format
      let dateValue = newEvent.date;
      
      // If the date includes time (T separator), take only the date part
      if (dateValue.includes('T')) {
        dateValue = dateValue.split('T')[0];
      }
      
      // Validate the date format (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(dateValue)) {
        setError('Date must be in format YYYY-MM-DD');
        return;
      }
      
      // Prepare FormData for image upload
      const formData = new FormData();
      if (selectedImageFile) {
        console.log('Adding image to FormData:', selectedImageFile.name, selectedImageFile.type, selectedImageFile.size);
        formData.append('image', selectedImageFile);
        
        // Log form data entries for debugging
        console.log('Form data entries:');
        for (let [key, value] of formData.entries()) {
          if (value instanceof File) {
            console.log(key, ':', value.name, value.type, value.size);
          } else {
            console.log(key, ':', value);
          }
        }
      }
      
      // Create URL with query parameters
      let url = `${API_URL}/api/upcoming-events/?title=${encodeURIComponent(newEvent.title)}&description=${encodeURIComponent(newEvent.description)}&date=${encodeURIComponent(dateValue)}`;
      
      if (newEvent.location) {
        url += `&location=${encodeURIComponent(newEvent.location)}`;
      }
      
      console.log('Making API Request to:', url);
      
      // Try a temporary login to get a fresh token
      try {
        // You might want to replace this with your actual login method
        const loginResponse = await fetch(`${API_URL}/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            'username': 'master',  // Replace with a valid username
            'password': 'admin'   // Replace with a valid password
          })
        });
        
        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          console.log('Refreshed token');
          localStorage.setItem('token', loginData.access_token);
          token = loginData.access_token;
        }
      } catch (loginError) {
        console.warn('Could not refresh token, using existing token');
      }
      
      // Make direct API call
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        
        if (response.status === 401) {
          // If authentication error, redirect to login
          setError('Your session has expired. Please log in again.');
          router.push('/login');
          return;
        }
        
        let errorMessage = 'Failed to create event';
        try {
          if (errorText) {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.detail || `API Error: ${response.status}`;
          }
        } catch (e) {
          // If not JSON, use the text
          errorMessage = errorText || `API Error: ${response.status}`;
        }
        
        setError(errorMessage);
        return;
      }
      
      // Log success response
      try {
        const responseData = await response.json();
        console.log('Successfully created event:', responseData);
        
        // Log the image URL if present
        if (responseData.image_url) {
          console.log('Saved image URL:', responseData.image_url);
        }
      } catch (e) {
        console.log('Response was not JSON but operation was successful');
      }
      
      // Reset form
      setNewEvent({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        location: '',
        image_url: ''
      });
      setSelectedImageFile(null);
      setPreviewImage(null);
      setShowFlashcard(false);
      setCurrentStep(0);
      setError(null);
      
      // Show success message
      alert('Event created successfully!');
      
      // Refresh the events list
      fetchEvents();
    } catch (err) {
      console.error('handleAddEvent error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };
  
  // Delete an event
  const handleDeleteEvent = async (id: number) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }
    
    try {
      // Get the token from localStorage for authentication
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please log in first.');
      }
      
      const response = await fetch(`${API_URL}/api/upcoming-events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Delete response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Delete error response:', errorText);
        
        let errorMessage = 'Failed to delete event';
        try {
          if (errorText) {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.detail || `API Error: ${response.status}`;
          }
        } catch (e) {
          // If not JSON, use the text
          errorMessage = errorText || `API Error: ${response.status}`;
        }
        
        setError(errorMessage);
        return;
      }
      
      // Successfully deleted, refresh the events list
      setError(null);
      console.log('Event deleted successfully');
      
      // Show success message
      alert('Event deleted successfully!');
      
      // Refresh the events list
      fetchEvents();
    } catch (err) {
      console.error('Error deleting event:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };
  
  // Edit an event
  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
  };
  
  // Save edited event
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingEvent) return;
    
    try {
      setError(null);
      
      // Get the token from localStorage for authentication
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please log in first.');
      }
      
      // Format date to match expected format (YYYY-MM-DD)
      const dateOnly = editingEvent.date.split('T')[0];
      
      // Build the URL with query parameters for basic fields
      let url = `${API_URL}/api/upcoming-events/${editingEvent.id}?title=${encodeURIComponent(editingEvent.title)}&description=${encodeURIComponent(editingEvent.description || '')}&date=${encodeURIComponent(dateOnly)}`;
      
      if (editingEvent.location) {
        url += `&location=${encodeURIComponent(editingEvent.location)}`;
      }
      url += `&is_active=${editingEvent.is_active ? 'true' : 'false'}`;
      
      console.log('Making PUT request to:', url);
      
      // The critical change: If no image file, don't use FormData at all
      let requestOptions: RequestInit;
      
      if (editImageFile) {
        // If we have an image, use FormData
        const formData = new FormData();
        formData.append('image', editImageFile);
        console.log('Including image in request');
        
        requestOptions = {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        };
      } else {
        // If no image, send an empty body with the proper Content-Type
        console.log('No image included, sending empty body');
        requestOptions = {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          // Send an empty object as body
          body: JSON.stringify({})
        };
      }
      
      // Make the request
      const response = await fetch(url, requestOptions);
      
      console.log('Response status:', response.status);
      
      // Handle response
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        
        if (response.status === 401) {
          setError('Your session has expired. Please log in again.');
          return;
        }
        
        // Try to parse as JSON for error details
        try {
          const errorJson = JSON.parse(errorText);
          setError(errorJson.detail || 'Failed to update event');
        } catch {
          setError(errorText || 'Failed to update event');
        }
        return;
      }
      
      // Success - parse response if possible
      try {
        const updatedEvent = await response.json();
        console.log('Updated event data:', updatedEvent);
      } catch (err) {
        console.log('Response was not JSON, but update successful');
      }
      
      // Reset state
      setEditingEvent(null);
      setEditImageFile(null);
      setError(null);
      
      // Show success and refresh the events list
      alert('Event updated successfully!');
      fetchEvents();
    } catch (err) {
      console.error('Error in handleSaveEdit:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };
  
  // Handle next and previous in flashcard steps
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit the form on the last step
      handleAddEvent();
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setShowFlashcard(false);
    }
  };
  
  // Open file dialog
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Render the current flashcard step
  const renderFlashcardStep = () => {
    const content = () => {
      switch (currentStep) {
        case 0:
          return (
            <div className="flashcard-step">
              <h3>Upload Event Image</h3>
              <div 
                className="image-upload-area"
                onClick={triggerFileInput}
              >
                {previewImage ? (
                  <div className="preview-container">
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="image-preview" 
                    />
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <Camera size={48} />
                    <p>Click to upload event image</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden-file-input"
                />
              </div>
            </div>
          );
        case 1:
          return (
            <div className="flashcard-step">
              <h3>Event Details</h3>
              <div className="flashcard-form-group">
                <label htmlFor="title">Event Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  placeholder="Enter event title"
                  required
                />
              </div>
              
              <div className="flashcard-form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={newEvent.location}
                  onChange={handleInputChange}
                  placeholder="Enter event location"
                  required
                />
              </div>
              
              <div className="flashcard-form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newEvent.date?.split('T')[0]}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          );
        case 2:
          return (
            <div className="flashcard-step">
              <h3>Event Description</h3>
              <div className="flashcard-form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  placeholder="Write a brief description of the event..."
                  required
                  rows={6}
                />
              </div>
            </div>
          );
        case 3:
          return (
            <div className="flashcard-step">
              <h3>Preview</h3>
              <div className="event-preview">
                <div className="preview-photo">
                  <img 
                    src={previewImage || newEvent.image_url || '/event-placeholder.jpg'} 
                    alt={newEvent.title || "New event"} 
                  />
                </div>
                <div className="preview-info">
                  <h4>{newEvent.title || "Event Title"}</h4>
                  <p className="preview-location">{newEvent.location || "Location"}</p>
                  <div className="preview-details">
                    <span className="preview-date">
                      <strong>Date:</strong> {newEvent.date ? new Date(newEvent.date).toLocaleDateString() : "Date"}
                    </span>
                  </div>
                  <p className="preview-description">{newEvent.description || "Description will appear here"}</p>
                </div>
              </div>
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <>
        {content()}
        
        <div className="flashcard-actions">
          <button 
            type="button"
            className="flashcard-prev-btn"
            onClick={handlePrevStep}
          >
            <ArrowLeft size={16} />
            Back
          </button>
          
          <button 
            type="button"
            className="flashcard-next-btn"
            onClick={handleNextStep}
            disabled={currentStep === 1 && (!newEvent.title || !newEvent.location || !newEvent.date)}
          >
            {currentStep === 3 ? 'Save' : 'Next'}
            {currentStep === 3 ? <Save size={16} /> : <ArrowRight size={16} />}
          </button>
        </div>
      </>
    );
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <main className="main-content">
      <div className="header-container">
        <Link href="/" className="logo-container">
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="logo-image"
          />
        </Link>

        <nav className="navbar">
          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className={`nav-items ${isMenuOpen ? 'show' : ''}`}>
            {navItems.map((item, index) => (
              <Link 
                key={index} 
                href={item.href} 
                className="nav-item"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="nav-icon">{item.icon}</div>
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <div className="event-control-content">
        <div className="section-title-container">
          <h2>Event <span className="highlight">Management</span></h2>
          <button 
            className="add-event-btn"
            onClick={() => setShowFlashcard(true)}
          >
            Add New Event
            <Plus size={20} />
          </button>
        </div>
        
        {error && (
          <div className="error-alert">
            <p>{error}</p>
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}
        
        {/* Flashcard Form */}
        {showFlashcard && (
          <div className="flashcard-overlay">
            <div className="flashcard-container">
              <button className="flashcard-close-btn" onClick={() => setShowFlashcard(false)}>
                <X size={24} />
              </button>
              
              <div className="flashcard-progress">
                {[0, 1, 2, 3].map(step => (
                  <div 
                    key={step} 
                    className={`progress-step ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
                  >
                    {currentStep > step ? <Check size={16} /> : step + 1}
                  </div>
                ))}
              </div>
              
              {renderFlashcardStep()}
            </div>
          </div>
        )}
        
        {/* Search box */}
        <div className="search-container">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search events..."
              className="search-input"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Events list */}
        {isLoading ? (
          <div className="loading">Loading events...</div>
        ) : (
          <div className="events-table-container">
            {filteredEvents.length > 0 ? (
              <table className="events-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map(event => (
                    <tr key={event.id}>
                      <td className="event-photo-cell">
                        <img 
                          src={event.image_url || '/event-placeholder.jpg'} 
                          alt={event.title} 
                          className="table-event-photo" 
                        />
                      </td>
                      <td>{event.title}</td>
                      <td>{formatDate(event.date)}</td>
                      <td>{event.location}</td>
                      <td className="action-buttons">
                        <button 
                          className="edit-btn" 
                          onClick={() => handleEditEvent(event)}
                        >
                          <Edit size={16} />
                          Edit
                        </button>
                        <button 
                          className="delete-btn" 
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-results">
                <p>No events found matching your search.</p>
              </div>
            )}
          </div>
        )}
        
        {/* Edit Event Modal */}
        {editingEvent && (
          <div className="edit-modal-overlay">
            <div className="edit-modal">
              <button className="close-modal-btn" onClick={() => setEditingEvent(null)}>
                <X size={24} />
              </button>
              
              <h3>Edit Event</h3>
              
              <form onSubmit={handleSaveEdit} className="edit-form">
                <div className="form-group">
                  <label htmlFor="edit-title">Title</label>
                  <input
                    type="text"
                    id="edit-title"
                    name="title"
                    value={editingEvent.title}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="edit-location">Location</label>
                  <input
                    type="text"
                    id="edit-location"
                    name="location"
                    value={editingEvent.location}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="edit-date">Date</label>
                  <input
                    type="date"
                    id="edit-date"
                    name="date"
                    value={editingEvent.date.split('T')[0]}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="edit-description">Description</label>
                  <textarea
                    id="edit-description"
                    name="description"
                    value={editingEvent.description || ''}
                    onChange={handleEditChange}
                    rows={4}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="edit-image">Event Image</label>
                  <div className="image-edit-container">
                    {editingEvent.image_url && (
                      <div className="edit-image-preview">
                        <img src={editingEvent.image_url} alt="Event preview" />
                      </div>
                    )}
                    <input
                      type="file"
                      id="edit-image"
                      name="image"
                      onChange={handleEditImageChange}
                      accept="image/*"
                      className="image-file-input"
                    />
                    <label htmlFor="edit-image" className="image-upload-btn">
                      <Camera size={16} />
                      Change Image
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="edit-is-active">Status</label>
                  <select
                    id="edit-is-active"
                    name="is_active"
                    value={editingEvent.is_active ? "true" : "false"}
                    onChange={handleEditChange}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
                
                <div className="form-actions">
                  <button type="button" onClick={() => setEditingEvent(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    <Save size={16} />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 