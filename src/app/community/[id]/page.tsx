import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { API_URL, getImageUrl } from '../../../utils/api';
import Navigation from '@/components/Navigation';
import './style.css';

interface Member {
  id: string;
  name?: string;
  position?: string;
  photo: string;
  bio?: string;
}

async function getMember(id: string): Promise<Member | null> {
  try {
    const res = await fetch(`${API_URL}/api/members/members/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function MemberDetailPage({ params }: { params: { id: string } }) {
  const member = await getMember(params.id);
  if (!member) {
    return (
      <main className="main-content">
        <Navigation />
        <div className="member-detail-container">
          <h2>Member not found</h2>
          <p>The member you are looking for does not exist.</p>
        </div>
      </main>
    );
  }
  // Use the same logic as MemberCard for photo URL and fallback
  const photoUrl = member.photo
    ? member.photo.startsWith('http')
      ? member.photo
      : getImageUrl(member.photo)
    : '/owner.png';
  return (
    <main className="main-content">
      <Navigation />
      <div className="member-detail-container">
        <div className="member-detail-card">
          <img
            src={photoUrl}
            alt={member.name || 'Member Photo'}
            className="member-detail-photo"
            style={{ objectFit: 'cover', borderRadius: '50%', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
            width={260}
            height={260}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/owner.png';
            }}
          />
          <h2 className="member-detail-name">{member.name}</h2>
          {member.position && <h3 className="member-detail-position">{member.position}</h3>}
          {member.bio && <p className="member-detail-bio">{member.bio}</p>}
        </div>
      </div>
    </main>
  );
}

// Optionally, add some CSS for .member-detail-container, .member-detail-card, .member-detail-photo, etc. 