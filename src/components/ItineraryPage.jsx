import React from "react";
import { useLocation } from "react-router-dom";
import "./ItineraryPage.css";
import { Link } from "react-router-dom";
import logo from '../assets/logo2.png';

const ItineraryPage = () => {
  const location = useLocation();
  const tempData = location.state?.itinerary;

  if (!tempData) {
    return <p>No itinerary data available</p>;
  }
  const itineraryData = JSON.parse(tempData);
  console.log(itineraryData);
  const { title, days, hotels, flights } = itineraryData;
  console.log(title);
  console.log(days);
  console.log(hotels);
  console.log(flights);
  
  return (
    <div className="itinerary-page">
      <header className="navbar">
        <div className="logo">
          <img src={logo} alt="Travel AI Logo" />
          <h1>Travel AI</h1>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </header>

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
          <h2>{title}</h2>

          <h3>Daily Activities</h3>
          {days.map((day, index) => (
            <div key={index} className="day-section">
              <h3>Day {day.day}</h3>
              <ul>
                {day.activities.map((activity, idx) => (
                  <li key={idx} className="activity-item">
                    <strong>{activity.time}</strong> - {activity.activity}
                    <p>{activity.details}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <h3>Hotel Details</h3>
          {hotels.map((hotel, index) => (
            <div key={index} className="hotel-section">
              <h4><strong>{hotel.name}</strong></h4>
              <p>Check-in: {hotel.checkin}</p>
              <p>Check-out: {hotel.checkout}</p>
              <p>{hotel.details}</p>
            </div>
          ))}

          <h3>Flight Details</h3>
          {flights.map((flight, index) => (
            <div key={index} className="flight-section">
              <h4><strong>{flight.airline}</strong> - Flight {flight.flightNumber}</h4>
              <p>Departure: {flight.departure}</p>
              <p>Arrival: {flight.arrival}</p>
              <p>{flight.details}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ItineraryPage;
