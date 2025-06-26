'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Globe, Info, FileText, Users, Calendar, Mail, Heart, Menu, X } from 'lucide-react';
import styles from '@/components/Navigation.module.css';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', icon: <Globe size={20} />, href: '/' },
  { label: 'About Us', icon: <Info size={20} />, href: '/about' },
  { label: 'Media', icon: <FileText size={20} />, href: '/media' },
  { label: 'Space Community', icon: <Users size={20} />, href: '/community' },
  { label: 'Donate', icon: <Heart size={20} />, href: '/donate_us' },
  { label: 'Contact us', icon: <Mail size={20} />, href: '/contact' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={styles['header-container']}>
      <div className={styles['header-top']}>
        <Link href="/" className={styles['logo-container']}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className={styles['logo-image']}
          />
          <span className={styles['logo-text']}>Day&Night Space Foundation</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className={styles['menu-toggle']} 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav className={styles['navbar']}>
        <div className={styles['nav-items']}>
          {navItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.href} 
              className={styles['nav-item']}
            >
              <div className={styles['nav-icon']}>{item.icon}</div>
              <span className={styles['nav-label']}>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div className={`${styles['mobile-overlay']} ${isMenuOpen ? styles['mobile-overlay-open'] : ''}`}>
        <nav className={styles['mobile-nav']}>
          <div className={styles['mobile-nav-items']}>
            {navItems.map((item, index) => (
              <Link 
                key={index} 
                href={item.href} 
                className={styles['mobile-nav-item']}
                onClick={closeMenu}
              >
                <div className={styles['mobile-nav-icon']}>{item.icon}</div>
                <span className={styles['mobile-nav-label']}>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
} 