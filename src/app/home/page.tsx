'use client';
import './style.css';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import {
  Globe,
  Info,
  Wrench,
  Megaphone,
  FileText,
  Users,
  Calendar,
  Mail,
  Menu,
  X
} from 'lucide-react';
import { Event, eventsService } from '../services/eventsService';
import { API_URL } from '../../utils/api';

type NavItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

const navItems: NavItem[] = [
  { label: 'Home', icon: <Globe size={20} />, href: '/' },
  { label: 'About Us', icon: <Info size={20} />, href: '/about' },
  { label: 'Media', icon: <FileText size={20} />, href: '/media' },
  { label: 'Space Community', icon: <Users size={20} />, href: '/community' },
  { label: 'Space Calendar', icon: <Calendar size={20} />, href: '/calendar' },
  { label: 'Contact us', icon: <Mail size={20} />, href: '/contact' },
];

// Helper function to get full event image URL with better path handling
function getEventImageUrl(imageUrl: string | null): string {
  if (!imageUrl) return '/event-placeholder.jpg';
  
  // If it's already a full URL, return it as is
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
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await eventsService.getUpcomingEvents(0, 10);
      console.log('Events API response:', response);
      
      // Log each image URL for debugging
      if (response && Array.isArray(response)) {
        console.log('Events count:', response.length);
        response.forEach(event => {
          console.log(`Event ${event.id} raw image_url:`, event.image_url);
        });
        setEvents(response);
      } else if (response && Array.isArray(response.data)) {
        console.log('Events count:', response.data.length);
        response.data.forEach(event => {
          console.log(`Event ${event.id} raw image_url:`, event.image_url);
        });
        setEvents(response.data);
      } else {
        console.warn('Unexpected API response format:', response);
        setEvents([]);
      }
      setError(null);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load upcoming events');
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollGallery = (direction: 'prev' | 'next') => {
    if (!galleryTrackRef.current) return;

    const scrollAmount = 400;
    const currentScroll = galleryTrackRef.current.scrollLeft;
    
    galleryTrackRef.current.scrollTo({
      left: direction === 'next' 
        ? currentScroll + scrollAmount 
        : currentScroll - scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <>
    <div className="header-container">
      <Link href="/" className="logo-container">
        {/* Replace '/logo.png' with your actual logo path once you add the image */}
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
    <section className="join-team-section">
  <div className="join-left">
    <h1><span className="highlight">Join</span> Our Team</h1>
    <h2>to make<br />someone's life<br />better</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum enim nobis dolorum maiores repellendus sunt alias officiis blanditiis quisquam. In.</p>
    <button className="join-btn">Join us</button>
  </div>
  <div className="join-right">
    <img src="/earth.gif" alt="Earth Background" className="earth-img" />
  </div>
</section>

<section className="about-section">
  <div className="about-content">
    <div className="about-left">
      <h2 className="about-title">About <span className="highlight">Us</span></h2>
      <p className="about-description">
        We are a passionate team dedicated to making a difference in the world through space exploration and community engagement. Our mission is to inspire, educate, and connect people with the wonders of space.
      </p>
      <div className="about-stats">
        <div className="stat-item">
          <h3>100+</h3>
          <p>Projects</p>
        </div>
        <div className="stat-item">
          <h3>50+</h3>
          <p>Team Members</p>
        </div>
        <div className="stat-item">
          <h3>1000+</h3>
          <p>Community Members</p>
        </div>
      </div>
    </div>
    <div className="about-right">
      <h3 className="director-title">Director</h3>
      <div className="about-image-container">
        <img src="/owner.png" alt="Our Team" className="about-image" />
        <div className="image-overlay"></div>
      </div>
      <h3 className="director-name">Priya Yadav</h3>
    </div>
  </div>
</section>
<section className="event-section">
  <div className="event-content">
    <h2 className="event-title">Upcoming <span className="highlight">Events</span></h2>
    <div className="event-gallery-container">
      <div className="gallery-track" ref={galleryTrackRef}>
        {isLoading ? (
          <div className="loading-events">Loading events...</div>
        ) : error ? (
          <div className="error-events">{error}</div>
        ) : events.length === 0 ? (
          <div className="no-events">No upcoming events found</div>
        ) : (
          events.map(event => (
            <div key={event.id} className="gallery-card">
              {/* Log image URL processing for debugging */}
              {console.log(`Home page event ${event.id} (${event.title}) - Original image_url: "${event.image_url}", Final URL: "${getEventImageUrl(event.image_url)}"`)}
              
              <div className="event-image-container">
                <img 
                  src={getEventImageUrl(event.image_url)} 
                  alt={event.title} 
                  className="event-image"
                  onError={(e) => {
                    console.error(`Image failed to load for event ${event.id} (${event.title}) in home page: ${event.image_url}`);
                    console.error(`Attempted URL: ${getEventImageUrl(event.image_url)}`);
                    // Fallback if image fails to load
                    (e.target as HTMLImageElement).src = '/event-placeholder.jpg';
                  }}
                />
                <div className="event-date-badge">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short'
                  })}
                </div>
              </div>
              <div className="event-details">
                <h3>{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <div className="event-meta">
                  <div className="event-location">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{event.location}</span>
                  </div>
                  <div className="event-time">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>{new Date(event.date).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit'
                    })}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <button className="gallery-nav prev" onClick={() => scrollGallery('prev')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button className="gallery-nav next" onClick={() => scrollGallery('next')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  </div>
</section>
<footer className="footer">
  <div className="footer-content">
    <div className="footer-section">
      <h3>Day&Night</h3>
      <p>Making space exploration accessible to everyone. Join us in our mission to inspire and educate through the wonders of space.</p>
      <div className="social-links">
        <a href="#" aria-label="Facebook">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        </a>
        <a href="#" aria-label="Twitter">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
          </svg>
        </a>
        <a href="#" aria-label="Instagram">
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
        <li><Link href="/about">About Us</Link></li>
        <li><Link href="/media">Media</Link></li>
        <li><Link href="/community">Space Community</Link></li>
        <li><Link href="/calendar">Space Calendar</Link></li>
        <li><Link href="/contact">Contact Us</Link></li>
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
          <span>contact@.org</span>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>+1 (555) 123-4567</span>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>123 Space Street, Cosmos City, SC 12345</span>
        </li>
      </ul>
    </div>
  </div>
  
  <div className="footer-bottom">
    <p>&copy; {new Date().getFullYear()} DayMight. All rights reserved.</p>
  </div>
</footer>
    </>
  );
}
