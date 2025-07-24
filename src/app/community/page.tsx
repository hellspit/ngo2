'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './style.css';
import MemberCard from '../../MyComponents/MembersCard';
import { API_URL } from '../../utils/api';
import {
  Globe,
  Info,
  FileText,
  Users,
  Calendar,
  Mail,
  Menu,
  X,
  Search,
  Heart,
  Crown,
  Lightbulb,
  Wrench,
  Settings,
  HandHeart,
  Rocket,
  GraduationCap,
  BookOpen,
  Handshake,
  Star
} from 'lucide-react';
import Navigation from '@/components/Navigation';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

interface Member {
  id: string;
  name?: string;
  position?: string;
  photo: string;
  bio?: string;
  category?: string;
}

interface MemberCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  members: Member[];
}

const navItems: NavItem[] = [
  { label: 'Home', icon: <Globe size={20} />, href: '/' },
  { label: 'About Us', icon: <Info size={20} />, href: '/about' },
  { label: 'Media', icon: <FileText size={20} />, href: '/media' },
  { label: 'Space Community', icon: <Users size={20} />, href: '/community' },
  { label: 'Donate', icon: <Heart size={20} />, href: '/donate_us' },
  { label: 'Contact us', icon: <Mail size={20} />, href: '/contact' },
];

// Define subdivisions with icons and colors
const SUBDIVISIONS = {
  executive: {
    id: 'executive',
    name: 'Executive Leadership',
    description: 'Our visionary leaders who drive the foundation\'s strategic direction and oversee all major initiatives.',
    icon: <Crown size={24} />,
    color: '#3b82f6'
  },
  advisory: {
    id: 'advisory',
    name: 'Advisory Board',
    description: 'Experienced professionals and industry experts who provide strategic guidance and mentorship.',
    icon: <Lightbulb size={24} />,
    color: '#10b981'
  },
  technical: {
    id: 'technical',
    name: 'Technical Team',
    description: 'Specialists and experts in space technology, research, and scientific development.',
    icon: <Wrench size={24} />,
    color: '#f59e0b'
  },
  operations: {
    id: 'operations',
    name: 'Operations Team',
    description: 'Dedicated professionals managing day-to-day operations, logistics, and program coordination.',
    icon: <Settings size={24} />,
    color: '#8b5cf6'
  },
  projects: {
    id: 'projects',
    name: 'Special Projects',
    description: 'Teams working on specific initiatives, research projects, and innovative programs.',
    icon: <Rocket size={24} />,
    color: '#ef4444'
  },
  collaborators: {
    id: 'collaborators',
    name: 'Collaborators & Partners',
    description: 'External partners, organizations, and individuals who collaborate with us on various initiatives and programs.',
    icon: <Handshake size={24} />,
    color: '#f97316'
  },
  patrons: {
    id: 'patrons',
    name: 'Patrons & Supporters',
    description: 'Generous supporters and benefactors who provide financial backing and resources to advance our mission.',
    icon: <Star size={24} />,
    color: '#eab308'
  },
  teachers: {
    id: 'teachers',
    name: 'Teachers & Educators',
    description: 'Educators and instructors who lead our educational programs and inspire the next generation of space enthusiasts.',
    icon: <BookOpen size={24} />,
    color: '#84cc16'
  },
  students: {
    id: 'students',
    name: 'Students',
    description: 'Young learners and aspiring space enthusiasts who participate in our educational programs and initiatives.',
    icon: <GraduationCap size={24} />,
    color: '#ec4899'
  },
  volunteer: {
    id: 'volunteer',
    name: 'Volunteers',
    description: 'Passionate individuals who generously contribute their time and skills to support our mission.',
    icon: <HandHeart size={24} />,
    color: '#06b6d4'
  }
};

export default function MembersPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set([
    'executive', 'advisory', 'technical', 'operations', 'projects', 
    'collaborators', 'patrons', 'teachers', 'students', 'volunteer'
  ]));

  // Fetch members from the API
  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/members/members/`);
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        const data = await response.json();
        setMembers(data);
        setError(null);
      } catch (err) {
        setError('Error loading members. Please try again later.');
        console.error('Error fetching members:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Filter members based on search term
  const filteredMembers = members.filter(member =>
    (member.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (member.position?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (member.bio?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  // Enhanced categorization logic
  const categorizeMember = (member: Member): string => {
    const position = (member.position || '').toLowerCase();

    // Executive Leadership
    if (position.includes('director') || position.includes('president') || 
        position.includes('ceo') || position.includes('founder') || 
        position.includes('chief') || position.includes('executive')) {
      return 'executive';
    }
    
    // Advisory Board
    if (position.includes('advisor') || position.includes('consultant') || 
        position.includes('board') || position.includes('mentor')) {
      return 'advisory';
    }
    
    // Technical Team
    if (position.includes('engineer') || position.includes('scientist') || 
        position.includes('researcher') || position.includes('technical') ||
        position.includes('developer') || position.includes('analyst')) {
      return 'technical';
    }
    
    // Operations Team
    if (position.includes('manager') || position.includes('coordinator') || 
        position.includes('assistant') || position.includes('operations') ||
        position.includes('administrator') || position.includes('supervisor')) {
      return 'operations';
    }
    
    // Special Projects
    if (position.includes('project') || position.includes('program') ||
        position.includes('initiative') || position.includes('specialist')) {
      return 'projects';
    }
    
    // Collaborators & Partners
    if (position.includes('collaborator') || position.includes('partner') ||
        position.includes('affiliate') || position.includes('associate') ||
        position.includes('external') || position.includes('liaison')) {
      return 'collaborators';
    }
    
    // Patrons & Supporters
    if (position.includes('patron') || position.includes('supporter') ||
        position.includes('donor') || position.includes('benefactor') ||
        position.includes('sponsor') || position.includes('philanthropist')) {
      return 'patrons';
    }
    
    // Teachers & Educators
    if (position.includes('teacher') || position.includes('educator') ||
        position.includes('instructor') || position.includes('professor') ||
        position.includes('lecturer') || position.includes('faculty')) {
      return 'teachers';
    }
    
    // Students
    if (position.includes('student') || position.includes('learner') ||
        position.includes('trainee') || position.includes('intern')) {
      return 'students';
    }
    
    // Default to volunteer
    return 'volunteer';
  };

  // Group members by category
  const groupMembersByCategory = (members: Member[]): MemberCategory[] => {
    const categories: { [key: string]: Member[] } = {};
    
    // Initialize all categories
    Object.keys(SUBDIVISIONS).forEach(key => {
      categories[key] = [];
    });

    // Group members by their category
    members.forEach(member => {
      const category = categorizeMember(member);
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(member);
    });

    // Convert to array format with subdivision details
    return Object.entries(categories)
      .map(([key, members]) => ({
        id: key,
        name: SUBDIVISIONS[key as keyof typeof SUBDIVISIONS].name,
        description: SUBDIVISIONS[key as keyof typeof SUBDIVISIONS].description,
        icon: SUBDIVISIONS[key as keyof typeof SUBDIVISIONS].icon,
        color: SUBDIVISIONS[key as keyof typeof SUBDIVISIONS].color,
        members
      }))
      .sort((a, b) => {
        // Sort by priority: executive first, then advisory, then others
        const priority = { executive: 1, advisory: 2, technical: 3, operations: 4, projects: 5, collaborators: 6, patrons: 7, teachers: 8, students: 9, volunteer: 10 };
        return (priority[a.id as keyof typeof priority] || 11) - (priority[b.id as keyof typeof priority] || 11);
      });
  };

  const memberCategories = groupMembersByCategory(filteredMembers);

  // Get unique categories for filter
  const categories = [
    { id: 'all', name: 'All Members', count: filteredMembers.length },
    ...memberCategories.map(cat => ({ 
      id: cat.id, 
      name: cat.name, 
      count: cat.members.length 
    }))
  ];

  // Filter categories based on selected category
  const displayCategories = selectedCategory === 'all' 
    ? memberCategories 
    : memberCategories.filter(cat => cat.id === selectedCategory);

  const toggleCategoryExpansion = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <>
      <main className="main-content">
        <Navigation />
        <div className="member-content">
          <div className="section-title-container">
            <h2>Our <span className="highlight">Team</span></h2>
          </div>
          
          {error && (
            <div className="error-alert">
              <p>{error}</p>
              <button onClick={() => setError(null)}>Dismiss</button>
            </div>
          )}
          
          <p className="member-description">
            Meet the dedicated individuals who work tirelessly to make our foundation's mission a reality.
            Our diverse team brings together expertise from various fields to create impactful programs and drive innovation in space education and community development.
          </p>
          
          <div className="search-container">
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search members by name, position, or bio..."
                className="search-input"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Enhanced Category Filter */}
          <div className="category-filter">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
                <span className="category-count">({category.count})</span>
              </button>
            ))}
          </div>
          
          {isLoading ? (
            <div className="loading">Loading members...</div>
          ) : (
            <div className="members-sections">
              {displayCategories.length > 0 ? (
                displayCategories.map(category => (
                  <div key={category.id} className="member-section">
                    <div 
                      className="section-header"
                      onClick={() => toggleCategoryExpansion(category.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="section-title-wrapper">
                        <div 
                          className="section-icon"
                          style={{ color: category.color }}
                        >
                          {category.icon}
                        </div>
                        <div>
                          <h3 className="section-title">{category.name}</h3>
                          <p className="section-description">{category.description}</p>
                        </div>
                      </div>
                      <div className="section-toggle">
                        {expandedCategories.has(category.id) ? (
                          <X size={20} />
                        ) : (
                          <Menu size={20} />
                        )}
                      </div>
                    </div>
                    
                    {expandedCategories.has(category.id) && (
                      <div className="members-grid">
                        {category.members.length > 0 ? (
                          category.members.map(member => (
                            <Link key={member.id} href={`/community/${member.id}`} style={{ textDecoration: 'none' }}>
                              <MemberCard
                                id={parseInt(member.id, 10)}
                                name={member.name || 'Unknown Member'}
                                position={member.position}
                                photo={member.photo}
                                bio={member.bio}
                              />
                            </Link>
                          ))
                        ) : (
                          <div className="no-members-message">No members in this category yet.</div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <p>No members found matching your search criteria.</p>
                  <p>Try adjusting your search terms or browse all categories.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
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
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/media">Media</Link></li>
              <li><Link href="/community">Space Community</Link></li>
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
