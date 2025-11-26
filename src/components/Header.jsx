import React from 'react';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header>
      {/* TOP BAR */}
      <div className="top-header">
        <div className="logo-box" id="psit-logo" style={{backgroundImage: 'url(/assets/Society/PSIT-LOGO.png)'}}></div>
        <div className="header-text">
          <h2>IEEE STUDENT BRANCH</h2>
          <h4>PRANVEER SINGH INSTITUTE OF TECHNOLOGY KANPUR</h4>
        </div>
        <div className="logo-box" id="ieee-logo" style={{backgroundImage: 'url(/assets/Society/IEEE-LOGO.png)'}}></div>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
