import React from "react";
import { useLocation } from "react-router-dom";
import "./ItineraryPage.css";
import { Link } from "react-router-dom";
import logo from '../assets/logo2.png';

const ItineraryPage = () => {
  const location = useLocation();
  const itineraryData = location.state?.itinerary;

  return (
  
    <div className="itinerary-page">
       <header className="navbar">
        <div className="logo">
          <img src={logo} alt="Travel AI Logo" />
          <h1>Travel AI</h1>
        </div>
        <nav>
          <ul>
            {/* <li><a href="#features">Features</a></li> */}
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Login</Link></li>
            

          </ul>
        </nav>
      </header>
      {/* Sidebar */}
      <aside className="sidebar">
        <nav>
          <ul>
            <li><a href="#itinerary">Itinerary</a></li>
            <li><a href="#weather">Weather</a></li>
            <li><a href="#flights">Flights</a></li>
            <li><a href="#hotels">Hotels</a></li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <section id="itinerary">
          <h2>Your Itinerary</h2>
          <pre className="itinerary-display" style={{
    backgroundColor: "#f8f9fa",
    color: "#2c3e50",
    padding: "1.5rem",
    borderRadius: "10px",
  }}> {itineraryData || "Fetching itinerary..."}</pre>
        </section>
      </main>
    </div>
  );
};

export default ItineraryPage;