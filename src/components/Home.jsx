import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Oval } from 'react-loader-spinner';
import './Home.css';
import TopDestinations from './TopDestinations';
import Clients from './Clients';
import logo from '../assets/logo2.png';
import backkkgg from '../assets/backkkgg.webp';
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ExpenditureSlider = () => {
  const [expenditure, setExpenditure] = useState(500);

  const handleSliderChange = (e) => {
    setExpenditure(e.target.value);
  };

  return (
    <div className="expenditure-slider-container">
    <h2>Set Your Expenditure</h2>
    <div>Selected Amount: <b>₹{expenditure}</b></div>
    <input
      type="range"
      min="1000"
      max="100000"
      step="1000"
      value={expenditure}
      onChange={handleSliderChange}
    />
  </div>
  
  );
};

const Home = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    travelPartner: '',
    purposeOfVisit: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  



  const handleSwap = () => {
    setFormData(prevState => ({
      from: prevState.to, 
      to: prevState.from,
      departure: prevState.departure,
      return: prevState.return,
      travelPartner: prevState.travelPartner,
      purposeOfVisit: prevState.purposeOfVisit
    }));
  };

  const handlePlanItineraryClick = async () => {
    const { from, to, departure, return: returnDate, travelPartner, purposeOfVisit } = formData;
    const endDate = returnDate || "N/A";  // Default to "N/A" if empty or undefined
    
    if (!(from && to && departure && endDate)) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsLoading(true); // Start loading animation
    
    try {
      const response = await fetch("http://localhost:5000/get_gemini_response", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          prompt: `Plan a detailed travel itinerary for the following, be sure to include daily activities, weather and flight details:

                    - Destination: ${to}
                    - Departure city: ${from}
                    - Travel dates: ${departure} to ${endDate}
                    - number of people: ${travelPartner}
                    - purpose of visit: ${purposeOfVisit}

                    ### Requirements:
                    1. *Itinerary Overview*:
                    - Title for the trip (e.g., "Trip to Paris").
                    - type of trip, alone with purpose of visit

                    2. *Daily Plan*:
                    - For each day, provide:
                        - Day number.
                        - Activities in the format: 
                        {
                            time: "Time in HH:MM AM/PM format",
                            activity: "Short activity name",
                            details: "Detailed description of the activity"
                        }

                    3. *Flight Details*:
                    - Include flight options with:
                        - Airline name.
                        - Flight number.
                        - Departure time.
                        - Arrival time.
                        - Additional details.
                        - price est

                    4. *Weather Details*:
                    - Include weather information with:
                        - Average Temperature.
                        - Condition (e.g., sunny, cloudy, etc.).
                        - Sun Exposure (e.g., high, moderate, low).
                        - Rain Probability (percentage chance of rain).
                        - Wind Speed (in km/h).
                        - Humidity (percentage).
                        - UV Index.
                        - Packing Tips (suggestions based on the weather).

                    ### Response Format:
                    Respond as a *valid JSON object* with this exact schema:

                    {
                    "title": "Trip Title, purpose of visit and type of group",
                    "days": [
                        {
                        "day": 1,
                        "activities": [
                            {
                            "time": "9:00 AM",
                            "activity": "Visit Eiffel Tower",
                            "details": "Tickets included; duration 2 hours."
                            },
                            ...
                        ]
                        },
                        ...
                    ],
                    "flights": [
                        {
                        "airline": "Airline Name",
                        "flightNumber": "Flight Number",
                        "departure": "YYYY-MM-DDTHH:mm",
                        "arrival": "YYYY-MM-DDTHH:mm",
                        "details": "Non-stop; 2 checked bags included."
                        },
                        ...
                    ], 
                    "weather": {
                        "avgTemp": Average Temperature.
                        "condition": Condition (e.g., sunny, cloudy, etc.).
                        "sunExposure": Sun Exposure (e.g., high, moderate, low).
                        "rainChance": Rain Probability (percentage chance of rain).
                        "wind": Wind Speed (in km/h).
                        "humidity": Humidity (percentage).
                        "uvIndex": UV Index.
                        "packingTips": Packing Tips (suggestions based on the weather).
                        }
                    }

                    ### Notes:
                    - If data for any field is unavailable, return an empty array for that field.
                    - Ensure the response adheres strictly to the JSON format without additional text or invalid keys.
                    - Validate the response before sending.
                  ` 
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch itinerary");
      }

      const itineraryData = responseData.response; // Assuming 'response' contains the itinerary
      navigate("/itinerary", { state: { itinerary: itineraryData, destination: to, checkIn: departure, checkOut: endDate } });

    } catch (error) {
      console.error("Error planning itinerary:", error);
      alert("Failed to generate itinerary. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };    
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <header className="navbar">
        <div className="logo">
          <img src={logo} alt="Travel AI Logo" />
          <h1>Travel AI</h1>
        </div>
        <nav>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><Link to="/login">Login</Link></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section 
          style={{
            backgroundImage: `url(${backkkgg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <section className="hero">
            <h2>Plan Your Journey</h2>
            <p><b>Create a personalized travel itinerary for any location around the world!</b></p>
          </section>
          
          {isLoading && (
            <div className="planning-overlay active">
              <div className="planning-content">
                <Oval
                  height={80}
                  width={80}
                  color="blue"
                  visible={true}
                  ariaLabel='oval-loading'
                />
                <p>Planning your itinerary...</p>
              </div>
            </div>
          )}

          <div className="flight-search-container">
            <div className="trip-type">
              <label><input type="radio" name="trip" defaultChecked /> <span>One-way</span></label>
              <label><input type="radio" name="trip" /> <span>Round-trip</span></label>
              <label><input type="radio" name="trip" /> <span>Multi-city</span></label>
            </div>

            <div className="search-fields">
              <div className="field">
                <label>From</label>
                <input
                  type="text"
                  name="from"
                  placeholder="Enter city or airport"
                  value={formData.from}
                  onChange={handleInputChange}
                />
              </div>
              <span className="swap-btn" onClick={handleSwap}>
                ⇄
              </span>
              <div className="field">
                <label>To</label>
                <input
                  type="text"
                  name="to"
                  placeholder="Enter city or airport"
                  value={formData.to}
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label>Departure</label>
                <input type="date" name="departure" value={formData.departure}
                  min={today} onChange={handleInputChange} />
              </div>
              <div className="field">
                <label>Return</label>
                <input type="date" name="return" placeholder="Optional" value={formData.return}
                min={formData.departure || today} onChange={handleInputChange} />
              </div>
              <div className="field">
                <label>Trip Buddy</label>
                <select name="travelPartner" value={formData.travelPartner} onChange={handleInputChange}>
                  <option value="">Select</option>
                  <option value="Solo">Solo</option>
                  <option value="Couple">Couple</option>
                  <option value="Family">Family</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="field">
                <label>Travel Preferences</label>
                <select name="purposeOfVisit" value={formData.purposeOfVisit} onChange={handleInputChange}>
                  <option value="">Select</option>
                  <option value="Economy">FamilyTrip</option>
                  <option value="Premium Economy">AdventureTrip</option>
                  <option value="HoneyMoon">HoneyMoon</option>
                  <option value="First Class">GroupTravel</option>
                  <option value="Pilgrimage">Pilgrimage</option>
                  <option value="Buisness">Buisness</option>
                </select>
              </div>
            </div>

            <div className="special-fares">
              <div className="fare-option">
                <input type="checkbox" id="student" />
                <label htmlFor="student">👩‍🎓 Student<br /><span>Extra Baggage</span></label>
              </div>
              <div className="fare-option">
                <input type="checkbox" id="senior" />
                <label htmlFor="senior">👴 Senior Citizen<br /><span>Exclusive Discounts</span></label>
              </div>
              <div className="fare-option">
                <input type="checkbox" id="armed-forces" />
                <label htmlFor="armed-forces">🪖 Armed Forces<br /><span>Exclusive Discounts</span></label>
              </div>
              <div className="fare-option">
                <input type="checkbox" id="doctors" />
                <label htmlFor="doctors">👨‍⚕️ Doctors & Nurses<br /><span>Exclusive Discounts</span></label>
              </div>
            </div>
            <ExpenditureSlider />
            <div className="search-btn">
              <button onClick={handlePlanItineraryClick}>Plan Itinerary</button>
            </div>
          </div>

          <section id="features" className="features">
            <div className="container">
              <h2 className="section-title">Explore Our Features</h2>
              <div className="features-grid">
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-route"></i>
                  </div>
                  <h3>Smart Itinerary Generator</h3>
                  <p>Our AI-powered tool crafts personalized travel plans tailored to your preferences and schedule.</p>
                  <a href="#" className="feature-link">Learn More</a>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-globe-americas"></i>
                  </div>
                  <h3>Worldwide Coverage</h3>
                  <p>Discover hidden gems and popular destinations across every continent with local insights.</p>
                  <a href="#" className="feature-link">Explore Destinations</a>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-laptop"></i>
                  </div>
                  <h3>User-Friendly Interface</h3>
                  <p>Experience seamless trip planning with our intuitive and responsive design.</p>
                  <a href="#" className="feature-link">Try Now</a>
                </div>
              </div>
            </div>
          </section>
          </section>

        <TopDestinations />
        
        <Clients/>
       
        <div className="sections-container">
          
          <section id="how-it-works" className="how-it-works">
            <div className="container">
              <h2>How It Works</h2>
              <ol>
                <li>
                  <span className="step-number">1</span>
                  <p>Enter your desired travel destination.</p>
                </li>
                <li>
                  <span className="step-number">2</span>
                  <p>Click on <strong>"Generate Itinerary."</strong></p>
                </li>
                <li>
                  <span className="step-number">3</span>
                  <p>Receive a complete day-by-day travel plan tailored to your preferences.</p>
                </li>
              </ol>
            </div>
          </section>
        </div>
      </main>

      <footer className="footer" id="contact">
        <div className="footer-container">
          <div className="footer-left">
            <h2>Contact Us</h2>
            <form className="contact-form">
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
              <textarea placeholder="Your Message"></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>

          <div className="footer-middle">
            <img src={logo} alt="Travel AI Logo" className="footer-logo" />
            <div className="social-links">
              <a href="https://facebook.com/travelai" className="social-icon" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com/travelai" className="social-icon" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com/travelai" className="social-icon" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com/company/travelai" className="social-icon" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>

            <div className="contact-info">
              <p><i className="fas fa-envelope"></i> support@travelai.com</p>
              <p><i className="fas fa-envelope"></i> careers@travelai.com</p>
              <p><i className="fas fa-map-marker-alt"></i> Head Office: Jaypee Institute of Information Technology,<br />Sector 62, Noida, 201309</p>
              <p><i className="fas fa-phone"></i> +91 120-2400973</p>
              <p><i className="fas fa-clock"></i> Mon - Sat: 9:00 AM - 6:00 PM</p>
            </div>
          </div>

          <div className="footer-right">
            <h2>Subscribe to Newsletter</h2>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 TravelPlanner. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;