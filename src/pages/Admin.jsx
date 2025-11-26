import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, push, set, onValue, remove } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    imageUrl: '',
    link: '',
    name: '',
    details: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin-login');
  };

  useEffect(() => {
    const itemsRef = ref(db, getDbPath(activeTab));
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemsList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setItems(itemsList);
      } else {
        setItems([]);
      }
    });
  }, [activeTab]);

  const getDbPath = (tab) => {
    switch (tab) {
      case 'events': return 'events';
      case 'members': return 'membersAchievements';
      case 'gallery': return 'gallery';
      case 'blogs': return 'blogs';
      default: return 'events';
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const dbPath = getDbPath(activeTab);
      const newItemRef = push(ref(db, dbPath));
      
      const itemData = { ...formData, createdAt: new Date().toISOString() };
      // Clean up empty fields
      Object.keys(itemData).forEach(key => {
        if (itemData[key] === '') delete itemData[key];
      });

      await set(newItemRef, itemData);

      setMessage({ type: 'success', text: 'Item added successfully!' });
      setFormData({
        title: '',
        date: '',
        description: '',
        imageUrl: '',
        link: '',
        name: '',
        details: ''
      });
    } catch (error) {
      setMessage({ type: 'error', text: `Error: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const dbPath = getDbPath(activeTab);
        await remove(ref(db, `${dbPath}/${id}`));
        setMessage({ type: 'success', text: 'Item deleted successfully!' });
      } catch (error) {
        setMessage({ type: 'error', text: `Error deleting item: ${error.message}` });
      }
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Portal</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="admin-tabs">
        <button className={activeTab === 'events' ? 'active' : ''} onClick={() => setActiveTab('events')}>Events</button>
        <button className={activeTab === 'members' ? 'active' : ''} onClick={() => setActiveTab('members')}>Members</button>
        <button className={activeTab === 'gallery' ? 'active' : ''} onClick={() => setActiveTab('gallery')}>Gallery</button>
        <button className={activeTab === 'blogs' ? 'active' : ''} onClick={() => setActiveTab('blogs')}>Blogs</button>
      </div>

      <div className="admin-content">
        <h3>Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
        <form className="admin-form" onSubmit={handleSubmit}>
          {/* Common Fields */}
          {(activeTab === 'events' || activeTab === 'blogs' || activeTab === 'members') && (
             <div className="form-group">
               <label>{activeTab === 'members' ? 'Name / Title' : 'Title'}</label>
               <input 
                 type="text" 
                 name={activeTab === 'members' ? 'name' : 'title'}
                 value={activeTab === 'members' ? formData.name : formData.title} 
                 onChange={handleInputChange} 
                 required 
               />
             </div>
          )}

          {(activeTab === 'events' || activeTab === 'members') && (
            <div className="form-group">
              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
            </div>
          )}

          <div className="form-group">
            <label>Image URL</label>
            <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} />
          </div>

          {(activeTab === 'events' || activeTab === 'blogs') && (
            <div className="form-group">
              <label>Description / Content</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} required></textarea>
            </div>
          )}

          {activeTab === 'members' && (
            <div className="form-group">
              <label>Details / Achievement</label>
              <textarea name="details" value={formData.details} onChange={handleInputChange} required></textarea>
            </div>
          )}

          {activeTab === 'blogs' && (
            <div className="form-group">
              <label>External Link (Optional)</label>
              <input type="url" name="link" value={formData.link} onChange={handleInputChange} />
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Adding...' : 'Add Item'}
          </button>
        </form>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="items-list">
          <h3>Existing Items</h3>
          {items.length === 0 ? <p>No items found.</p> : (
            <div className="list-grid">
              {items.map(item => (
                <div key={item.id} className="list-item">
                  {item.imageUrl && <img src={item.imageUrl} alt="Item" className="item-thumb" />}
                  <div className="item-info">
                    <h4>{item.title || item.name || 'Untitled'}</h4>
                    <p>{item.date}</p>
                  </div>
                  <button onClick={() => handleDelete(item.id)} className="delete-btn">Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
