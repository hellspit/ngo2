import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import styles from './SocialIcons.module.css';

const SocialIcons = () => {
  return (
    <div className={styles.socialIcons}>
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.iconWrapper}
      >
        <FontAwesomeIcon icon={faFacebookF} className={styles.icon} />
        <span className={styles.tooltip}>Facebook</span>
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.iconWrapper}
      >
        <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
        <span className={styles.tooltip}>Twitter</span>
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.iconWrapper}
      >
        <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
        <span className={styles.tooltip}>Instagram</span>
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.iconWrapper}
      >
        <FontAwesomeIcon icon={faLinkedinIn} className={styles.icon} />
        <span className={styles.tooltip}>LinkedIn</span>
      </a>
    </div>
  );
};

export default SocialIcons; 