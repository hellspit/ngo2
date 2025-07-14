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
    </>
  );
}
