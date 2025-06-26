import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { API_URL } from '../../../utils/api';
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
  return (
    <main className="main-content">
      <Navigation />
      <div className="member-detail-container">
        <div className="member-detail-card">
          <Image
            src={member.photo}
            alt={member.name || 'Member Photo'}
            width={180}
            height={180}
            className="member-detail-photo"
            style={{ objectFit: 'cover', borderRadius: '50%' }}
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