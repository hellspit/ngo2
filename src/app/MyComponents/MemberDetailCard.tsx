"use client";
import React from 'react';

interface Member {
  id: string;
  name?: string;
  position?: string;
  photo: string;
  bio?: string;
}

export default function MemberDetailCard({ member }: { member: Member }) {
  const photoUrl = member.photo
    ? member.photo.startsWith('http')
      ? member.photo
      : '/owner.png'
    : '/owner.png';

  return (
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
  );
} 