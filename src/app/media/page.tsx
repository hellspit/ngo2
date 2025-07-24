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
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Day&Night space foundation</h3>
            <p>Making space exploration accessible to everyone. Join us in our mission to inspire and educate through the wonders of space.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://x.com/DayNightSp83811" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/dayandnightspacefoundation/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/media">Media</a></li>
              <li><a href="/community">Space Community</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul className="contact-info">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>spacefoundation@dansf.org</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>+918114181543</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>C/O RAMA NAND, SIRPAT, Nawapar, Campierganj, Gorakhpur, Uttar Pradesh, India, Pin code -273165</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Day & Night Space Foundation. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
