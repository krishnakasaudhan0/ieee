import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import './Blogs.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const blogsRef = ref(db, 'blogs');
    onValue(blogsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const blogsList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setBlogs(blogsList);
      } else {
        setBlogs([]);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="blogs-page container">
      <h2 className="section-title">Latest Blogs</h2>
      
      {loading ? (
        <p className="loading-text">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="no-data-text">No blogs found.</p>
      ) : (
        <div className="blogs-grid">
          {blogs.map((blog) => (
            <a key={blog.id} href={blog.link || '#'} target="_blank" rel="noopener noreferrer" className="blog-card">
              {blog.imageUrl && (
                <div className="blog-image">
                  <img src={blog.imageUrl} alt={blog.title || 'Blog Post'} />
                </div>
              )}
              <div className="blog-content">
                <h3>{blog.title || 'Untitled Blog'}</h3>
                <p>{blog.summary || blog.content?.substring(0, 100) + '...'}</p>
                <span className="read-more">Read More &rarr;</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
