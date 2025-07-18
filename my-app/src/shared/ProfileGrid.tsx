import React from 'react';
import charis from '../assets/charis.png';
import chaelsey from '../assets/chaelsey.png';
import jerem from '../assets/jeremy.png';
import hemo from '../assets/hemosoo.png';

const profiles = [
    { name: 'Charis Ching', imageUrl: charis },
    { name: 'Chaelsey Park', imageUrl: chaelsey },
    { name: 'Jeremy Sedillo', imageUrl: jerem },
    { name: 'Hemosoo Woo', imageUrl: hemo },
  ];
  
export const ProfileGrid: React.FC = () => {
    return (
      <div className="profile-grid">
        {profiles.map((profile, index) => (
          <div className="profile-item" key={index}>
            <img src={profile.imageUrl} alt={profile.name} className="profile-picture" />
            <h1 className="profile-name">{profile.name}</h1>
          </div>
        ))}
      </div>
    );
  };
  
  export default ProfileGrid;