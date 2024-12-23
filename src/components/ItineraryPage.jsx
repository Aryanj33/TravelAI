import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocation } from "react-router-dom";
import "./ItineraryPage.css";
import { Link } from "react-router-dom";
import logo from '../assets/logo2.png';

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
  console.log(itineraryData);
  const { title, days, flights, weather } = itineraryData;

  const [hotels, setHotels] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(false);

  // Fetch GeoId
  const fetchGeoId = async (place) => {
    const urlGeoId = `https://tripadvisor-com1.p.rapidapi.com/auto-complete?query=${place}`;
    const optionsGeoId = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'fb8385391emsh9568d473468e6e4p142358jsn0bde324cb465',
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

  // Fetch Hotels
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
        'x-rapidapi-key': 'fb8385391emsh9568d473468e6e4p142358jsn0bde324cb465',
        'x-rapidapi-host': 'tripadvisor-com1.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const extractedHotels = (result?.data?.hotels || []).slice(0, 6).map((hotel) => {
        const photoTemplate = hotel.cardPhotos?.[0]?.sizes?.urlTemplate;
        const photoUrl = photoTemplate ? photoTemplate.replace('{width}', 200).replace('{height}', 200) : 'https://via.placeholder.com/400x300';
        const usdPrice = hotel.commerceInfo?.priceForDisplay?.string || "N/A";
        const price = parseFloat(usdPrice.replace(/[^0-9.]/g, ""));  // Extract numeric value
        const inrPrice = price * 85;  // Convert to INR
        return {
          name: hotel.cardTitle?.string || 'N/A',
          price: inrPrice,
          details: hotel.descriptiveText || 'No description available.',
          image: photoUrl
        };
      });

      setHotels(extractedHotels);
      console.log(extractedHotels);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setHotels([]);
    } finally {
      setLoadingHotels(false);
    }
  };

  // Fetch hotels on component mount
  useEffect(() => {
    fetchHotels(destination);
  }, []);

  // Slider settings for react-slick
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "40px",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "20px",
        },
      },
    ],
  };

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
          <Slider {...sliderSettings}>
            {days.map((day, index) => (
              <div key={index} className="day-card">
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
          </Slider>

          <h3>Weather Forecast & Packing Tips during your trip</h3>
          <div className="day-section">
            <p className="activity-item"><strong>Average Temperature:</strong> {weather?.avgTemp || 'N/A'}</p>
            <p className="activity-item"><strong>Condition:</strong> {weather?.condition || 'N/A'}</p>
            <p className="activity-item"><strong>Sun Exposure:</strong> {weather?.sunExposure || 'Moderate'}</p>
            <p className="activity-item"><strong>Rain Probability:</strong> {weather?.rainChance || 'N/A'}</p>
            <p className="activity-item"><strong>Wind:</strong> {weather?.wind || 'N/A'}</p>
            <p className="activity-item"><strong>Humidity:</strong> {weather?.humidity || 'N/A'}</p>
            <p className="activity-item"><strong>UV INDEX:</strong> {weather?.uvIndex || 'N/A'}%</p>
            <p className="activity-item"><strong>Packing Tips:</strong> {weather?.packingTips || 'Pack light, bring sunscreen and a hat.'}</p>
          </div>

          <h3>Flight Details</h3>
          {flights.length > 0 ? (
            flights.map((flight, index) => (
              <div key={index} className="flight-section">
                <h4><strong>{flight.airline}</strong> - Flight {flight.flightNumber}</h4>
                <p>Departure: {flight.departure}</p>
                <p>Arrival: {flight.arrival}</p>
                <p>{flight.details}</p>
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            ))
          ) : (
            <p>No flights available</p>
          )}

          <h3>Hotel Details</h3>
          {loadingHotels ? (
            <p>Loading hotels...</p>
          ) : hotels.length > 0 ? (
            <div className="hotel-cards-container">
              {hotels.map((hotel, index) => (
                <div key={index} className="hotel-card">
                  <img
                    src={hotel.image}
                    alt={`Image of ${hotel.name}`}
                    className="hotel-image"
                  />
                  <div className="hotel-content">
                    <h4 className="hotel-title">{hotel.name}</h4>
                    <p className="hotel-description">{hotel.details}</p>
                    <p className="hotel-price">
                      Price: ₹ <span>{hotel.price}</span> / night
                    </p>
                    <button className="add-to-cart-btn">Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No hotel details available.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default ItineraryPage;
