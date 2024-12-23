import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ItineraryPage.css";
import { Link } from "react-router-dom";
import logo from '../assets/logo2.png';
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

const ItineraryPage = () => {
  const location = useLocation();
  const tempData = location.state?.itinerary;
  const destination = location.state?.destination;
  const checkIn = location.state?.checkIn;
  const checkOut = location.state?.checkOut;

  if (!tempData) {
    return <p>No itinerary data available</p>;
  }

  const itineraryData = JSON.parse(tempData);
  const { title, days, flights } = itineraryData;

  const [hotels, setHotels] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(false);

  const fetchGeoId = async (place) => {
    const urlGeoId = `https://tripadvisor-com1.p.rapidapi.com/auto-complete?query=${place}`;
    const optionsGeoId = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'c09f6d065bmsh2afacd1b5392546p18c4c4jsn1068f7c21e19',
        'x-rapidapi-host': 'tripadvisor-com1.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(urlGeoId, optionsGeoId);
      const result = await response.json();
      return result.data[0]?.geoId || null;
    } catch (error) {
      console.error('Error fetching geoId:', error);
      return null;
    }
  };

  const fetchHotels = async (place) => {
    setLoadingHotels(true);
    const geoId = await fetchGeoId(place);

    if (!geoId) {
      console.log('Could not fetch geoId.');
      setHotels([]);
      setLoadingHotels(false);
      return;
    }

    const url = `https://tripadvisor-com1.p.rapidapi.com/hotels/search?geoId=${geoId}&checkIn=${checkIn}&checkOut=${checkOut}&rooms=1&adults=2`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'c09f6d065bmsh2afacd1b5392546p18c4c4jsn1068f7c21e19',
        'x-rapidapi-host': 'tripadvisor-com1.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const extractedHotels = (result?.data?.hotels || []).slice(0, 5).map((hotel) => ({
        name: hotel.cardTitle?.string || 'N/A',
        price: hotel.commerceInfo?.priceForDisplay?.string || 'N/A',
        details: hotel.descriptiveText || 'No description available.',
        image: hotel.photo?.images?.medium?.url || 'https://via.placeholder.com/150',
      }));
      setHotels(extractedHotels);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setHotels([]);
    } finally {
      setLoadingHotels(false);
    }
  };

  useEffect(() => {
    fetchHotels(destination);
  }, []);

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

          <h3>Flight Details</h3>
          {flights.map((flight, index) => (
            <div key={index} className="flight-section">
              <h4><strong>{flight.airline}</strong> - Flight {flight.flightNumber}</h4>
              <p>Departure: {flight.departure}</p>
              <p>Arrival: {flight.arrival}</p>
              <p>{flight.details}</p>
            </div>
          ))}

<h3>Hotel Details</h3>
{loadingHotels ? (
  <p>Loading hotels...</p>
) : hotels.length > 0 ? (
  <Grid container spacing={2}>
    {hotels.map((hotel, index) => (
      <Grid
        item
        xs={12}
        md={6}
        lg={4}
        key={index}
        style={{
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          borderRadius: "10px",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <img
            src={hotel.image || "https://via.placeholder.com/150"}
            alt={hotel.name}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderBottom: "3px solid #007bff",
            }}
          />
          <div
            style={{
              padding: "20px",
              textAlign: "left",
            }}
          >
            <h4
              style={{
                fontSize: "1.8rem",
                fontWeight: "bold",
                color: "#1a4781",
                marginBottom: "10px",
              }}
            >
              {hotel.name}
            </h4>
            <p
              style={{
                fontSize: "1.4rem",
                color: "#555",
                marginBottom: "15px",
              }}
            >
              {hotel.details}
            </p>
            <p
              style={{
                fontSize: "1.6rem",
                fontWeight: "bold",
                color: "#2c3e50",
              }}
            >
              Price:{" "}
              <span
                style={{
                  color: "#007bff",
                }}
              >
                {hotel.price}
              </span>{" "}
              / night
            </p>
          </div>
        </div>
      </Grid>
    ))}
  </Grid>
) : (
  <p>No hotel details available.</p>
)}
        </section>
      </main>
    </div>
  );
};

export default ItineraryPage;
