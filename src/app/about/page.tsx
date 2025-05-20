'use client';
import './style.css';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
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
  X,
  Heart
} from 'lucide-react';
import Navigation from '@/components/Navigation';

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
  { label: 'Donate', icon: <Heart size={20} />, href: '/donate_us' },
  { label: 'Contact us', icon: <Mail size={20} />, href: '/contact' },
];

export default function AboutUsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Navigation />
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
    </>
  );
}
