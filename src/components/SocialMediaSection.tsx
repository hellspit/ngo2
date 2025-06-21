import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faXTwitter, faInstagram, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from './SocialMediaSection.module.css';

const SocialMediaSection = () => {
  return (
    <div className={styles.socialMediaSection}>
      <div className={styles.socialIcons}>
        <a
          href="https://www.facebook.com/profile.php?id=61576684265513"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.iconWrapper}
        >
          <FontAwesomeIcon icon={faFacebookF} className={styles.icon} />
          <span className={styles.tooltip}>Facebook</span>
        </a>
        <a
          href="https://x.com/DayNightSp83811"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.iconWrapper}
        >
          <FontAwesomeIcon icon={faXTwitter} className={styles.icon} />
          <span className={styles.tooltip}>X</span>
        </a>
        <a
          href="https://www.instagram.com/dayandnightspacefoundation/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.iconWrapper}
        >
          <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
          <span className={styles.tooltip}>Instagram</span>
        </a>
        <a
          href="https://www.linkedin.com/in/day-and-night-space-foundation-8816a6368"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.iconWrapper}
        >
          <FontAwesomeIcon icon={faLinkedinIn} className={styles.icon} />
          <span className={styles.tooltip}>LinkedIn</span>
        </a>
        <a
          href="https://www.youtube.com/@DayNightSpaceFoundation-t1h"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.iconWrapper}
        >
          <FontAwesomeIcon icon={faYoutube} className={styles.icon} />
          <span className={styles.tooltip}>YouTube</span>
        </a>
        <a
          href="mailto:spacefoundation@dansf.org"
          className={styles.iconWrapper}
        >
          <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
          <span className={styles.tooltip}>Email</span>
        </a>
      </div>
    </div>
  );
};

export default SocialMediaSection; 