'use client';

import Navigation from '@/components/Navigation';
import './style.css';
import React, { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { API_URL, getImageUrl } from '../../utils/api';
import { Globe, Info, FileText, Users, Calendar, Mail, Menu, X, Search, Heart } from 'lucide-react';

interface NavItem {
  label: string;
  icon: ReactElement;
  href: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  image_url: string;
  location: string;
}

const navItems: NavItem[] = [
  { label: 'Home', icon: <Globe size={20} />, href: '/' },
  { label: 'About Us', icon: <Info size={20} />, href: '/about' },
  { label: 'Media', icon: <FileText size={20} />, href: '/media' },
  { label: 'Space Community', icon: <Users size={20} />, href: '/community' },
  { label: 'Donate', icon: <Heart size={20} />, href: '/donate_us' },
  { label: 'Contact us', icon: <Mail size={20} />, href: '/contact' },
];

export default function MediaPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/events/?skip=0&limit=100`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Events data:', data);
      
      // Log image URLs for debugging
      data.forEach((event: Event) => {
        if (event.image_url) {
          console.log(`Event ${event.id} image URL: ${getEventImageUrl(event.image_url)}`);
        }
      });
      
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const getEventImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return '/default-event.svg';
    
    // If the URL already starts with http, it's a complete URL
    if (imageUrl.startsWith('http')) return imageUrl;
    
    // Make sure path doesn't start with a slash if we're going to add /static/
    const cleanPath = imageUrl.startsWith('/') 
      ? imageUrl.substring(1) // Remove leading slash
      : imageUrl;
      
    // If the path already includes 'static/', don't add it again
    if (cleanPath.startsWith('static/')) {
      return `${API_URL}/${cleanPath}`;
    }
    
    // Return full path
    return `${API_URL}/static/${imageUrl}`;
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Navigation />
      <div className="media-content">
        <div className="events-list">
          <div className="section-title-container">
            <h2>Our Events</h2>
            <div className="search-container">
              {isSearchExpanded ? (
                <div className="search-input-wrapper">
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    autoFocus
                  />
                  <button 
                    className="close-search-btn"
                    onClick={() => {
                      setIsSearchExpanded(false);
                      setSearchQuery('');
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <button 
                  className="search-toggle-btn"
                  onClick={() => setIsSearchExpanded(true)}
                  aria-label="Search events"
                >
                  <Search size={18} />
                </button>
              )}
            </div>
          </div>

          {isLoading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading events...</p>
            </div>
          )}

          {error && (
            <div className="error-container">
              <p>{error}</p>
              <button onClick={fetchEvents} className="retry-button">Retry</button>
            </div>
          )}

          {!isLoading && !error && filteredEvents.length === 0 && (
            <div className="no-results">
              <p>No events found matching your search criteria.</p>
            </div>
          )}

          <div className="events-grid">
            {filteredEvents.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-image-wrapper">
                  {/* Log image URL processing for debugging */}
                  {/* Original image_url: ${event.image_url}, Final URL: ${getEventImageUrl(event.image_url)} */}
                  
                  <img 
                    src={getEventImageUrl(event.image_url)}
                    alt={event.title} 
                    className="event-image" 
                    loading="lazy"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, globalThis.Event>) => {
                      console.error(`Image failed to load for event ${event.id} (${event.title}): ${event.image_url}`);
                      console.error(`Attempted URL: ${getEventImageUrl(event.image_url)}`);
                      // Fallback if image fails to load
                      (e.target as HTMLImageElement).src = '/default-event.svg';
                    }}
                  />
                </div>
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div className="event-date">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="event-location">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {event.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
