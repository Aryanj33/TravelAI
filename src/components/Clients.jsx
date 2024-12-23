import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import ClientSlider from './ClientSlider';
import peep1 from '../assets/peep1.jpg';
import peep2 from '../assets/peep2.jpeg';
import peep3 from '../assets/peep3.jpeg';
import peep4 from '../assets/peep4.jpeg';
import peep5 from '../assets/peep5.jpeg';
import peep7 from '../assets/peep7.jpeg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

let clients = [
  {
    "name": "Medium-Detective6247",
    "position": "Travel Enthusiast",
    "image_url": peep1,
    "stars": 4,
    "disc": "Booking a vacation isn't that complex, but I appreciate the detailed itineraries provided by travel agents. They simplify complex trips and ensure everything runs smoothly."
  },
  {
    "name": "Davekinney0u812",
    "position": "Retired Frequent Traveler",
    "image_url": peep2,
    "stars": 2,
    "disc": "I used to rely on travel agencies for complex trips, but now I find booking AI vacations straightforward. However, I miss the personalized service."
  },
  {
    "name": "Reddit User (Wanderlog Review)",
    "position": "Travel App User",
    "image_url": peep3,
    "stars": 5,
    "disc": "Wanderlog is hands down the best trip planning app. It offers a consistent, easy-to-use UX with all the features needed for seamless travel planning."
  },
  {
    "name": "Reddit User (Costco Travel)",
    "position": "Honeymoon Traveler",
    "image_url": peep4,
    "stars": 5,
    "disc": "Booked my honeymoon through Costco Travel and loved it. Everything was seamless, and they even included a $400 Costco gift card!"
  },
  {
    "name": "Reddit User (TripAdvisor Critic)",
    "position": "Hotel Reviewer",
    "image_url": peep5,
    "stars": 4,
    "disc": " I really liked the enviroment for this and its really helpful. Its given plan fits the timing and schedule."
  },
  {
    "name": "Reddit User (AI Trip Planner)",
    "position": "Tech-Savvy Traveler",
    "image_url": peep7,
    "stars": 4,
    "disc": "'Wanderboat' AI trip planner saved me hours of research by generating a detailed itinerary for Japan in just an hour. Can't wait for more features!"
  },
  {
    "name": "Reddit User (All-Inclusive Resorts)",
    "position": "First-Time All-Inclusive Traveler",
    "image_url": peep3,
    "stars": 4,
    "disc": "'Secrets Resorts' was an amazing recommendation for our first all-inclusive trip. Great beaches, dining, and service made it unforgettable."
  }
];

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 3,
        dots: true,
        infinite: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const Clients = () => {
  let clientDisc = clients.map((item, i) => (
    <ClientSlider item={item} key={i} />
  ));

  return (
    <Container>
      <span className="green"></span>
      <h1>what our clients say</h1>
      <Testimonials>
        <Slider {...settings}>
          {clientDisc}
        </Slider>
      </Testimonials>
    </Container>
  );
};

export default Clients;

const Container = styled.div`
  width: 85%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 0;

  span {
    font-weight: 700;
    text-transform: uppercase;
    text-align:center;
    font-size: 2.8rem; 
    color: black; // Green color for testimonials heading
  }

  h1 {
    padding-top: 1rem;
    text-transform: capitalize;
    font-size: 2rem; 
    color: #333;
  }
`;

const Testimonials = styled.div`
  margin-top: 2rem;
  position: relative;

  .slick-dots {
    bottom: -40px;
  }

  .slick-dots li button:before {
    color: #ddd; // Dot color
    font-size: 10px;
  }

  .slick-dots li.slick-active button:before {
    color: #28a745; // Active dot color
  }
`;
