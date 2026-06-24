'use client';

import { Profile } from '@/lib/types';

interface ProfileSelectorProps {
  profiles: Profile[];
  activeProfileId: string;
  onSelect: (profileId: string) => void;
}

export default function ProfileSelector({ profiles, activeProfileId, onSelect }: ProfileSelectorProps) {
  return (
    <div className="profile-selector">
      {profiles.map((profile) => (
        <button
          key={profile.id}
          className={`profile-chip ${profile.id === activeProfileId ? 'active' : ''}`}
          onClick={() => onSelect(profile.id)}
          style={{
            ...(profile.id === activeProfileId
              ? { borderColor: profile.accentColor, boxShadow: `0 0 20px ${profile.accentColor}30` }
              : {}),
          }}
        >
          <span className="profile-avatar">{profile.avatar}</span>
          <div className="profile-chip-info">
            <span className="profile-chip-name">{profile.name}</span>
            <span className="profile-chip-desc">{profile.shortDescription}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
