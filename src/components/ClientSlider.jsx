import React from "react";
import styled from "styled-components";
import { IoIosQuote } from "react-icons/io";
import { AiOutlineStar } from "react-icons/ai";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ClientSlider.css'


const ClientSlider = (props) => {
    const { name, position, image_url, stars, disc } = props.item;

    return (
        <Container>
            <Header>
                <span className="quote">
                    <IoIosQuote />
                </span>
                {Array(stars || 0)
                    .fill()
                    .map((_, i) => (
                        <span className="star" key={`star-${i}`}>
                            <AiOutlineStar />
                        </span>
                    ))}
            </Header>
            <Body>{disc}</Body>
            <Footer>
                <img src={image_url} alt={name} />
                <div className="details">
                    <h1>{name}</h1>
                    <p>{position}</p>
                </div>
            </Footer>
        </Container>
    );
};

export default ClientSlider;

const Container = styled.div`
  background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(43, 43, 53) 100%);
  padding: 2rem 1.5rem;
  margin: 0 1rem;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(10px);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
  }
`;


const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem; /* Adjust this value to reduce the spacing between stars */

  .quote {
    font-size: 3rem;
    color: #01be96;
    opacity: 0.7;
    margin-right: 23rem;
  }

  .star {
    color: #ffcd3c;
    font-size: 1.3rem;
    margin: 0; /* Ensure no extra margin is added */
    padding: 0; /* Ensure no extra padding is added */
  }
`;


const Body = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);
  text-align: justify;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: auto;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    object-fit: cover;
  }

  .details {
    h1 {
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.9);
    }

    p {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.6);
    }
  }
`
