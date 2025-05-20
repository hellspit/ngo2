'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, Info, FileText, Users, Calendar, Mail, Menu, X, Heart } from 'lucide-react';
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

  return (
    <div className={styles['header-container']}>
      <Link href="/" className={styles['logo-container']}>
        <Image
          src="/logo.png"
          alt="Logo"
          width={80}
          height={80}
          className={styles['logo-image']}
        />
      </Link>

      <nav className={styles['navbar']}>
        <button className={styles['menu-toggle']} onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div className={`${styles['nav-items']} ${isMenuOpen ? styles['show'] : ''}`}>
          {navItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.href} 
              className={styles['nav-item']}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className={styles['nav-icon']}>{item.icon}</div>
              <span className={styles['nav-label']}>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
} 