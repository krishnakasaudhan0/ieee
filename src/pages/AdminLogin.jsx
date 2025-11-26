import React, { useState } from 'react';
import { db } from '../firebase';
import { ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const adminsRef = ref(db, 'admins');
      const snapshot = await get(adminsRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("Fetched admins data:", data); // Debugging

        let isValidAdmin = false;

        // Case 1: admins is an object of objects (standard Firebase list)
        // Case 2: admins is a single object with username/password directly
        if (data.username && data.password) {
             if (String(data.username) === username && String(data.password) === password) {
                 isValidAdmin = true;
             }
        } else {
            const adminList = Object.values(data);
            isValidAdmin = adminList.find(
                admin => admin && String(admin.username) === username && String(admin.password) === password
            );
        }

        if (isValidAdmin) {
          console.log("Login successful");
          localStorage.setItem('adminAuth', 'true');
          navigate('/admin');
        } else {
          console.log("Invalid credentials");
          setError('Invalid username or password');
        }
      } else {
        console.log("No admins path found");
        setError('No admin accounts found');
      }
    } catch (err) {
      console.error("Login error:", err);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
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
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
