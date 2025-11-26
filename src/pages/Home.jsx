import React from 'react';
import Announcement from '../components/Announcement';

const Home = () => {
  return (
    <>
      {/* 🔥 MAIN BANNER (Behind navbar) */}
      <div class="main-banner" id="main-banner">
        <h3>IEEE PSIT Student Branch welcomes you to the official website of IEEE Student Branch PSIT, Kanpur. Explore our legacy, achievements, and the key milestones that define our journey.</h3>

        {/* ⭐ NEW INFINITE LOGO SLIDER INSIDE MAIN BANNER */}
        <div class="banner-logo-window">
          <div class="banner-logo-track">

            {/* First Set */}
            <div class="mini-logo" id="blc-1"></div>
            <div class="mini-logo" id="blc-2"></div>
            <div class="mini-logo" id="blc-3"></div>
            <div class="mini-logo" id="blc-4"></div>
            <div class="mini-logo" id="blc-5"></div>
            <div class="mini-logo" id="blc-6"></div>
            <div class="mini-logo" id="blc-7"></div>
            <div class="mini-logo" id="blc-8"></div>
            <div class="mini-logo" id="blc-9"></div>
            <div class="mini-logo" id="blc-10"></div>
            <div class="mini-logo" id="blc-11"></div>
            <div class="mini-logo" id="blc-12"></div>
            <div class="mini-logo" id="blc-13"></div>
            <div class="mini-logo" id="blc-14"></div>
            <div class="mini-logo" id="blc-15"></div>
            <div class="mini-logo" id="blc-16"></div>

            {/* Duplicate Set */}
            <div class="mini-logo" id="blc-1"></div>
            <div class="mini-logo" id="blc-2"></div>
            <div class="mini-logo" id="blc-3"></div>
            <div class="mini-logo" id="blc-4"></div>
            <div class="mini-logo" id="blc-5"></div>
            <div class="mini-logo" id="blc-6"></div>
            <div class="mini-logo" id="blc-7"></div>
            <div class="mini-logo" id="blc-8"></div>
            <div class="mini-logo" id="blc-9"></div>
            <div class="mini-logo" id="blc-10"></div>
            <div class="mini-logo" id="blc-11"></div>
            <div class="mini-logo" id="blc-12"></div>
            <div class="mini-logo" id="blc-13"></div>
            <div class="mini-logo" id="blc-14"></div>
            <div class="mini-logo" id="blc-15"></div>
            <div class="mini-logo" id="blc-16"></div>

          </div>
        </div>

      </div>


      {/* ANNOUNCEMENT */}
      <Announcement />

      {/* ABOUT */}
      <section class="about container">
        <h3>ABOUT US</h3>
        <p>Every day around the world, you will find IEEE members and volunteers dedicating their time, using their talents, experiences, and expertise to drive the IEEE mission forward. We are pleased to introduce the 2024 IEEE Social Impact Report, which captures a selection of our recent projects and initiatives designed to advance technology for the benefit of humanity. 

</p>
      </section>

      {/* TEAM */}
      <section class="team container">
        <h3>OUR TEAM</h3>
        <div class="team-photo"></div>
      </section>
    </>
  );
};

export default Home;
