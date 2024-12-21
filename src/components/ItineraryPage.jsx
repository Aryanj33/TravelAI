import React from "react";
import { useLocation } from "react-router-dom";
import "./ItineraryPage.css";

const ItineraryPage = () => {
  const location = useLocation();
  const itineraryData = location.state?.itinerary;

  return (
    <div className="itinerary-page">
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
          <pre>{itineraryData || "Fetching itinerary..."}</pre>
        </section>
      </main>
    </div>
  );
};

export default ItineraryPage;
