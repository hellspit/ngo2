"use client";
import React from 'react';
import Navigation from '@/components/Navigation';
import './style.css';
import MemberDetailCard from '../../MyComponents/MemberDetailCard';

interface Member {
  id: string;
  name?: string;
  position?: string;
  photo: string;
  bio?: string;
}

async function getMember(id: string): Promise<Member | null> {
  try {
    const res = await fetch(`/api/members/members/${id}`, { cache: 'no-store' });
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
        <MemberDetailCard member={member} />
      </div>
    </main>
  );
}

// Optionally, add some CSS for .member-detail-container, .member-detail-card, .member-detail-photo, etc. 