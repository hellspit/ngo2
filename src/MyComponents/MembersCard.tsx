'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './MembersCard.css';
import { getImageUrl } from '../utils/api';

interface MemberProps {
  id: number;
  name: string;
  position: string;
  age: number;
  photo: string;
  bio: string;
}

const MemberCard: React.FC<MemberProps> = ({ id, name, position, age, photo, bio }) => {
  // Construct and log the photo URL for debugging
  const photoUrl = photo 
    ? photo.startsWith('http') 
      ? photo 
      : getImageUrl(photo)
    : '/owner.png'; // Fallback image
  
  console.log(`MemberCard ${id} (${name}) - Original photo path: "${photo}", Final URL: "${photoUrl}"`);
  
  return (
    <Link href={`/community/${id}`} className="member-card-link">
      <div className="member-card">
        <div className="member-photo-container">
          <img 
            src={photoUrl} 
            alt={name} 
            className="member-photo" 
            onError={(e) => {
              console.error(`Image failed to load for member ${id} (${name}): ${photoUrl}`);
              // Set fallback image
              (e.target as HTMLImageElement).src = '/owner.png';
            }}
          />
          <div className="member-overlay"></div>
        </div>
        <div className="member-info">
          <h3 className="member-name">{name}</h3>
          <p className="member-position">{position}</p>
          <div className="member-details">
            <div className="detail-item">
              <span className="detail-label">Age</span>
              <span className="detail-value">{age}</span>
            </div>
          </div>
          <p className="member-bio">{bio || 'No bio available'}</p>
        </div>
      </div>
    </Link>
  );
};

export default MemberCard; 