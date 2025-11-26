import React, { useState } from 'react';
import { db } from '../firebase';
import { ref, push, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'; // Reuse login styles

const SetupAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSetup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const adminsRef = ref(db, 'admins');
      const newAdminRef = push(adminsRef);
      
      await set(newAdminRef, {
        username,
        password,
        createdAt: new Date().toISOString()
      });

      setMessage('Admin user created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/admin-login');
      }, 2000);
    } catch (error) {
      console.error("Error creating admin:", error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Setup Admin Account</h2>
        <p style={{textAlign: 'center', marginBottom: '20px', color: '#666'}}>
          Use this page to create your first admin user.
        </p>
        <form onSubmit={handleSetup}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {message && <p className={`message ${message.includes('Error') ? 'error' : 'success'}`} style={{textAlign: 'center'}}>{message}</p>}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Creating...' : 'Create Admin'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetupAdmin;
