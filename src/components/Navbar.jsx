import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const menuRef = useRef(null);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setClick(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <nav className="navbar-container" ref={menuRef}>
      {/* Logo removed from Navbar, it's in Top Header now */}

      <div className="menu-icon" onClick={handleClick}>
        {/* Simple CSS Hamburger/X icon */}
        <div className={click ? 'fa-bars active' : 'fa-bars'}></div>
      </div>

      <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <li className="nav-item">
          <Link to="/" className="nav-links" onClick={closeMobileMenu}>
            HOME
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/student-branch" className="nav-links" onClick={closeMobileMenu}>
            STUDENT BRANCH
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/events" className="nav-links" onClick={closeMobileMenu}>
            EVENTS
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/members" className="nav-links" onClick={closeMobileMenu}>
            MEMBERS ACHIEVEMENT
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/gallery" className="nav-links" onClick={closeMobileMenu}>
            GALLERY
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-links" onClick={closeMobileMenu}>
            CONTACT US
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
