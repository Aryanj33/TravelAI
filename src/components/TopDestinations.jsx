import React, { useState, useEffect } from "react";
import "./TopDestinations.css";
import eiffel from "../assets/eiffel.jpeg";
import tokyo from "../assets/tokyo.jpg";
import bali from "../assets/bali.webp";
import Dubai from "../assets/Dubai.jpg";
import Machau from "../assets/Machau.jpeg";
import Sydney from "../assets/Sydney.jpg";
import newyork from "../assets/newYork.jpeg";
import Rome from "../assets/Rome.jpg";
import India from "../assets/India.jpeg";
import Capetown from "../assets/CapeTown.jpeg";

const TopDestinations = () => {
  const destinations = [
    {
      img: eiffel,
      title: "Paris",
      description: "Discover the charm of the Eiffel Tower, the Louvre, and exquisite French cuisine.",
    },
    {
      img: tokyo,
      title: "Tokyo",
      description: "Experience the perfect blend of tradition and technology in Japan's bustling capital.",
    },
    {
      img: bali,
      title: "Bali",
      description: "Relax on beautiful beaches and explore serene temples in this tropical paradise.",
    },
    {
      img: newyork,
      title: "New York",
      description: "Visit the iconic Statue of Liberty and experience the vibrant city life.",
    },
    {
      img: Sydney,
      title: "Sydney",
      description: "Explore the Sydney Opera House and enjoy the beautiful beaches.",
    },
    {
      img: Rome,
      title: "Rome",
      description: "Dive into history with the Colosseum and ancient Roman landmarks.",
    },
    {
      img: Capetown,
      title: "Cape Town",
      description: "Marvel at Table Mountain and enjoy the scenic beauty of South Africa.",
    },
    {
      img: Dubai,
      title: "Dubai",
      description: "Experience luxury and visit the Burj Khalifa in this vibrant city.",
    },
    {
      img: Machau,
      title: "Machu Picchu",
      description: "Explore the ancient Inca city in the Andes Mountains.",
    },
    {
      img: India,
      title: "India",
      description: "The astounding diversity of religions, cultures, and languages of India is unique and unparalleled.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % destinations.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [destinations.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % destinations.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? destinations.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="top-destinations" className="top-destinations">
      <h2>Top Destinations</h2>
      <div className="carousel">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {destinations.map((destination, index) => (
            <div
              className={`carousel-item ${currentIndex === index ? "active" : ""}`}
              key={index}
            >
              <img src={destination.img} alt={destination.title} />
              <h3>{destination.title}</h3>
              <p>{destination.description}</p>
            </div>
          ))}
        </div>
       
      </div>
    </section>
  );
};

export default TopDestinations;
