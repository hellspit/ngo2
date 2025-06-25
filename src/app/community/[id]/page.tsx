'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { API_URL, getImageUrl } from '../../../utils/api';
import './style.css';
import '../MyComponents/MembersCard.css'; // Import MemberCard styles for image

interface Member {
  id: string;
  name: string;
  position: string;
  age: number;
  photo: string;
  bio: string;
}

export default function MemberDetailPage() {
  const params = useParams();
  const [member, setMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch(`${API_URL}/api/members/members/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch member details');
        }
        const data = await response.json();
        setMember(data);
        setError(null);
      } catch (err) {
        setError('Error loading member details. Please try again later.');
        console.error('Error fetching member:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchMember();
    }
  }, [params.id]);

  // Process photo URL for display
  const getPhotoUrl = (photoPath: string): string => {
    if (!photoPath) return '/owner.png';
    
    if (photoPath.startsWith('http')) {
      return photoPath;
    }
    
    return getImageUrl(photoPath);
  };

  if (isLoading) {
    return (
      <main className="main-content">
        <div className="member-detail-content">
          <div className="loading">Loading member details...</div>
        </div>
      </main>
    );
  }

  if (error || !member) {
    // Dummy member data for testing
    const dummyMember: Member = {
      id: 'dummy-1',
      name: 'John Doe',
      position: 'Community Manager',
      age: 35,
      photo: '/owner.png',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    };

    return (
      <main className="main-content">
        <div className="member-detail-content">
          <div className="error-alert">
            <p>{error || 'Member not found'}</p>
            <Link href="/community" className="back-button">
              <ArrowLeft size={20} />
              Back to Members
            </Link>
          </div>
          
          {/* Dummy member card for testing */}
          <div className="member-detail-card">
            <div className="member-image-container member-photo-container">
              <img
                src={getPhotoUrl(dummyMember.photo)}
                alt={dummyMember.name}
                className="member-detail-image member-photo"
                onError={e => {
                  (e.target as HTMLImageElement).src = '/owner.png';
                }}
              />
              <div className="member-overlay"></div>
            </div>

            <div className="member-info">
              <h1>{dummyMember.name}</h1>
              <h2>{dummyMember.position}</h2>

              <div className="member-stats">
                <div className="stat">
                  <span className="stat-label">Position</span>
                  <span className="stat-value">{dummyMember.position}</span>
                </div>
              </div>

              <div className="member-bio" style={{overflow: 'visible', display: 'block', WebkitLineClamp: 'unset', WebkitBoxOrient: 'unset'}}>
                <h3>About</h3>
                <p style={{overflow: 'visible', display: 'block', WebkitLineClamp: 'unset', WebkitBoxOrient: 'unset'}}>{dummyMember.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="member-detail-content">
        <Link href="/community" className="back-button">
          <ArrowLeft size={20} />
          Back to Members
        </Link>

        <div className="member-detail-card">
          <div className="member-image-container member-photo-container">
            <img
              src={getPhotoUrl(member.photo)}
              alt={member.name}
              className="member-detail-image member-photo"
              onError={e => {
                (e.target as HTMLImageElement).src = '/owner.png';
              }}
            />
            <div className="member-overlay"></div>
          </div>

          <div className="member-info">
            <h1>{member.name}</h1>
            <h2>{member.position}</h2>

            <div className="member-stats">
              <div className="stat">
                <span className="stat-label">Position</span>
                <span className="stat-value">{member.position}</span>
              </div>
            </div>

            <div className="member-bio" style={{overflow: 'visible', display: 'block', WebkitLineClamp: 'unset', WebkitBoxOrient: 'unset'}}>
              <h3>About</h3>
              <p style={{overflow: 'visible', display: 'block', WebkitLineClamp: 'unset', WebkitBoxOrient: 'unset'}}>{member.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 