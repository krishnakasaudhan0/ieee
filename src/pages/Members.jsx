import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import './Members.css';

const Members = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const achievementsRef = ref(db, 'membersAchievements');
    onValue(achievementsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const achievementsList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setAchievements(achievementsList);
      } else {
        setAchievements([]);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="members-page container">
      <h2 className="section-title">Members Achievements</h2>
      
      {loading ? (
        <p className="loading-text">Loading achievements...</p>
      ) : achievements.length === 0 ? (
        <p className="no-data-text">No achievements found.</p>
      ) : (
        <div className="members-grid">
          {achievements.map((item) => (
            <div key={item.id} className="member-card">
              {item.imageUrl && (
                <div className="card-image">
                  <img src={item.imageUrl} alt={item.title || 'Achievement'} />
                </div>
              )}
              <div className="card-content">
                <h3>{item.title || item.name || 'Achievement'}</h3>
                <p>{item.description || item.details}</p>
                {item.date && <span className="card-date">{item.date}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Members;
