'use client';

import { useState } from 'react';
import styles from './styles.module.css';
import Navigation from '@/components/Navigation';
import Image from 'next/image';

export default function DonatePage() {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  // Replace with your actual QR code image path
  const qrImageSrc = '/QR.jpeg';
  const qrImageAlt = 'Donate QR Code';

  const handleQRClick = () => setIsQRModalOpen(true);
  const handleModalClose = () => setIsQRModalOpen(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrImageSrc;
    link.download = 'donate-qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Navigation />
      <div className={styles['donate-page']}>
        <div className={styles['donate-content']}>
          <div className={styles['donate-header']}>
            <h1>Support Our Cause</h1>
            <p>Your contribution makes a real difference in our community</p>
          </div>

          <div className={styles['donate-grid']}>
            <div className={styles['donate-info']}>
              <div className={styles['impact-section']}>
                <h2>Your Impact</h2>
                <div className={styles['impact-stats']}>
                  <div className={styles['stat-card']}>
                    <div className={styles['stat-icon']}>🎓</div>
                    <h3>Education</h3>
                    <p>Supporting educational programs for underprivileged children</p>
                  </div>
                  <div className={styles['stat-card']}>
                    <div className={styles['stat-icon']}>🏥</div>
                    <h3>Healthcare</h3>
                    <p>Providing medical assistance to those in need</p>
                  </div>
                  <div className={styles['stat-card']}>
                    <div className={styles['stat-icon']}>🤝</div>
                    <h3>Community</h3>
                    <p>Building stronger, more resilient communities</p>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className={styles['qr-section']} style={{ textAlign: 'center' }}>
              <h3>Scan to Donate</h3>
              <Image
                src={qrImageSrc}
                alt={qrImageAlt}
                width={200}
                height={200}
                className={styles['qr-image']}
                style={{ cursor: 'pointer', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                onClick={handleQRClick}
                priority
              />
              <p style={{ marginTop: '1rem', color: '#666' }}>Click the QR code to enlarge and download.</p>
            </div>
          </div>
        </div>
        {/* Move modal here, outside of all containers */}
        {isQRModalOpen && (
          <div className={styles['qr-modal-overlay']} onClick={handleModalClose}>
            <div
              className={styles['qr-modal-content']}
              onClick={e => e.stopPropagation()}
            >
              <button
                className={styles['qr-modal-close']}
                onClick={handleModalClose}
                aria-label="Close"
              >
                &times;
              </button>
              <Image
                src={qrImageSrc}
                alt={qrImageAlt}
                width={400}
                height={400}
                className={styles['qr-image-full']}
                style={{ display: 'block', margin: '0 auto', borderRadius: '16px' }}
              />
              <button
                className={styles['qr-download-btn']}
                onClick={handleDownload}
              >
                Download QR Code
              </button>
            </div>
          </div>
        )}
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
