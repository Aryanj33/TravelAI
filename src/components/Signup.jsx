import React, { useState } from "react";
import Image from "../assets/logo2.png";
import Logo from "../assets/img4.jpg";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import './Login.css';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(""); // State for error message

  const handleSignUp = async (e) => {
    e.preventDefault();

    const name = document.querySelector("input[name='name']").value;
    const email = document.querySelector("input[name='email']").value;
    const password = document.querySelector("input[name='password']").value;
    const confirmPassword = document.querySelector("input[name='confirmPassword']").value;

    if(name == ""){
        alert("Please enter name");
        return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const response = await fetch("http://127.0.0.1:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const result = await response.json();

    if (result.status === "success") {
      alert(result.message);
      // Redirect to login page after successful signup
      window.location.href = "http://localhost:5173/Login"; 
    } else {
      setError(result.message); // Set error message for failed signup
    }
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="login-center">
            <h2>Create an account!</h2>
            <p>Please fill in your details</p>
            <form>
              <input type="text" name="name" placeholder="Name" />
              <input type="email" name="email" placeholder="Email" />
              <div className="pass-input-div">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  placeholder="Password" 
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              <div className="pass-input-div">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  name="confirmPassword" 
                  placeholder="Confirm Password" 
                />
                {showConfirmPassword ? (
                  <FaEyeSlash onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                ) : (
                  <FaEye onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                )}
              </div>

              <div className="login-center-buttons">
                <button type="button" onClick={handleSignUp}>Sign Up</button>
                <button type="button">
                  <img src={GoogleSvg} alt="" />
                  Sign Up with Google
                </button>
              </div>
            </form>
            {error && <div className="error-message">{error}</div>} {/* Show error message */}
          </div>

          <p className="login-bottom-p">
            Already have an account? <a href="http://localhost:5173/Login">Log In</a>
          </p>
          <p className="Backref">
            <a href="/">Back to Home</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
