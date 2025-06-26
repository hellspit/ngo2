"use client";
import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import './style.css';
import MemberDetailCard from '../../MyComponents/MemberDetailCard';
import { API_URL } from '../../../utils/api';

interface Member {
  id: string;
  name?: string;
  position?: string;
  photo: string;
  bio?: string;
}

export default function MemberDetailPage({ params }: { params: { id: string } }) {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/members/members/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch member');
        const data = await response.json();
        setMember(data);
      } catch (err) {
        setMember(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [params.id]);

  if (loading) {
    return (
      <main className="main-content">
        <Navigation />
        <div className="member-detail-container">
          <div>Loading member...</div>
        </div>
      </main>
    );
  }

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