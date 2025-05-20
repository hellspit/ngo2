'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Globe, Info, FileText, Users, Calendar, Mail, Menu, X, Phone, MapPin, Send, Heart } from 'lucide-react';
import './style.css';
import Navigation from '@/components/Navigation';

type NavItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

const navItems: NavItem[] = [
  { label: 'Home', icon: <Globe size={20} />, href: '/home' },
  { label: 'About Us', icon: <Info size={20} />, href: '/about' },
  { label: 'Media', icon: <FileText size={20} />, href: '/media' },
  { label: 'Space Community', icon: <Users size={20} />, href: '/community' },
  { label: 'Donate', icon: <Heart size={20} />, href: '/donate_us' },
  { label: 'Contact us', icon: <Mail size={20} />, href: '/Join_us' },
];

export default function JoinUsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    motivation: '',
    skills: '',
    availability: 'part-time'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real application, you would make an API call here
    // For demonstration purposes, we're simulating a successful submission
    setTimeout(() => {
      setSubmitStatus({
        success: true,
        message: "Thank you for your interest in joining us! We will contact you soon."
      });
      setIsSubmitting(false);
      
      // Reset form after successful submission
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        motivation: '',
        skills: '',
        availability: 'part-time'
      });
      
      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  return (
    <>
      <Navigation />
      <main className="join-us-container">
        <section className="join-us-hero">
          <div className="hero-content">
            <h1>Join Our <span className="highlight">Team</span></h1>
            <p>
              Become part of our passionate community dedicated to making a positive impact.
              We welcome individuals who share our vision and are eager to contribute their skills and time.
            </p>
          </div>
        </section>

        <section className="contact-info-section">
          <div className="section-title">
            <h2>Contact <span className="highlight">Information</span></h2>
            <p>Reach out to us for any inquiries about joining our team</p>
          </div>

          <div className="contact-cards">
            <div className="contact-card">
              <div className="contact-icon">
                <Phone size={24} />
              </div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
              <p>Mon-Fri, 9:00 AM - 5:00 PM</p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <Mail size={24} />
              </div>
              <h3>Email</h3>
              <p>contact@organization.org</p>
              <p>We'll respond within 24 hours</p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <MapPin size={24} />
              </div>
              <h3>Location</h3>
              <p>123 Space Street</p>
              <p>Cosmos City, SC 12345</p>
            </div>
          </div>
        </section>

        <section className="join-form-section">
          <div className="section-title">
            <h2>Join <span className="highlight">Our Team</span></h2>
            <p>Fill out the form below to express your interest in joining us</p>
          </div>

          <div className="form-wrapper">
            {submitStatus && (
              <div className={`submit-status ${submitStatus.success ? 'success' : 'error'}`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="join-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address (optional)"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="motivation">Why do you want to join our team? *</label>
                <textarea
                  id="motivation"
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us about your motivation to join our team"
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label htmlFor="skills">Skills & Experience *</label>
                <textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us about your skills and relevant experience"
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label htmlFor="availability">Availability *</label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  required
                >
                  <option value="part-time">Part-time</option>
                  <option value="full-time">Full-time</option>
                  <option value="weekends">Weekends only</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </section>
      </main>

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
              <li><Link href="/Join_us">Contact Us</Link></li>
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
                <span>contact@organization.org</span>
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
          <p>&copy; {new Date().getFullYear()} Day&Night. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
