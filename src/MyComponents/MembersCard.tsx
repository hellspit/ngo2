'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './MembersCard.css';
import { getImageUrl } from '../utils/api';

interface MemberProps {
  id: number;
  name?: string;
  position?: string;
  photo: string;
  bio?: string;
}

const MemberCard: React.FC<MemberProps> = ({ id, name, position, photo, bio }) => {
  // Construct and log the photo URL for debugging
  const photoUrl = photo 
    ? photo.startsWith('http') 
      ? photo 
      : getImageUrl(photo)
    : '/owner.png'; // Fallback image
  
  console.log(`MemberCard ${id} (${name || 'Unknown'}) - Original photo path: "${photo}", Final URL: "${photoUrl}"`);
  
  return (
    <Link href={`/community/${id}`} className="member-card-link">
      <div className="member-card">
        <div className="member-photo-container">
          <img 
            src={photoUrl} 
            alt={name || 'Member'} 
            className="member-photo" 
            onError={(e) => {
              console.error(`Image failed to load for member ${id} (${name || 'Unknown'}): ${photoUrl}`);
              // Set fallback image
              (e.target as HTMLImageElement).src = '/owner.png';
            }}
          />
          <div className="member-overlay"></div>
        </div>
        <div className="member-info">
          <h3 className="member-name">{name || 'Unknown Member'}</h3>
          <p className="member-position">{position || 'Position not specified'}</p>
          <p className="member-bio">{bio || 'No bio available'}</p>
        </div>
      </div>
    </Link>
  );
};

export default MemberCard; 