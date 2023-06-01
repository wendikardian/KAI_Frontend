/* eslint-disable react/no-unknown-property */
// import React from 'react'
import "../styles/style.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <body>

    <section id="hero" style={{width: '100%'}}>
      <div class="hero-container" style={{width: '100%'}}>
        <div data-aos="fade-in">
          <div class="hero-logo">
            {/* <img class="" src="assets/img/logo.png" alt="Imperial" /> */}
          </div>

          <h1 style={{width: '100%'}}>Welcome to PT KAI Indonesia</h1>
          <h2>Book The Ticket and Then Travel</h2>
          <div class="actions">
            <a  class="btn-get-started"><Link to="/login" style={{color: 'white'}} >Login </Link></a>
            <a  class="btn-services"><Link to="/register" style={{color: 'white'}}>Register</Link></a>
          </div>
        </div>
      </div>
    </section>
    </body>
  );
}
