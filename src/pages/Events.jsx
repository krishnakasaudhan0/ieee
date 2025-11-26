import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, get, child } from 'firebase/database';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, "events"));
        
        if (snapshot.exists()) {
          const data = snapshot.val();

          const eventsArray = Object.keys(data).map(id => ({
            id,
            ...data[id]
          })).sort((a, b) => new Date(b.date) - new Date(a.date));

          setEvents(eventsArray);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="loading">Loading events...</div>;

  return (
    <div className="events-container">
      <h2 className="events-header">Upcoming Events</h2>

      {error && <div className="message error">{error}</div>}

      <div className="events-grid">
        {events.length > 0 ? (
          events.map(event => (
            <div key={event.id} className="event-card">
              {event.imageUrl && (
                <img src={event.imageUrl} alt={event.title} className="event-image" />
              )}
              <div className="event-content">
                <div className="event-date">{event.date}</div>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-events">No events found.</div>
        )}
      </div>
    </div>
  );
};

export default Events;
