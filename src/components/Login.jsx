import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Image from "../assets/logo2.png";
import Logo from "../assets/img4.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import './Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form-based login
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = document.querySelector("input[type='email']").value;
    const password = document.querySelector("input[type='password']").value;

    // Simulate login logic (replace this with actual API call if needed)
    if (email === "test@example.com" && password === "password") {
      alert("Login successful!");
      navigate("/"); // Redirect to home page
    } else {
      setError("Invalid email or password.");
    }
  };

  // Handle Google Login success
  const handleGoogleSuccess = (credentialResponse) => {
    try {
      // Decode the JWT token to extract user information
      const userInfo = JSON.parse(atob(credentialResponse.credential.split(".")[1]));
      console.log("User Info:", userInfo);

      // Optionally store user info in localStorage or sessionStorage
      localStorage.setItem("user", JSON.stringify(userInfo));

      // Redirect to home page
      navigate("/");
    } catch (err) {
      console.error("Error decoding token:", err);
      setError("Failed to process login. Please try again.");
    }
  };

  // Handle Google Login error
  const handleGoogleError = () => {
    console.error("Google Login Failed");
    setError("Google Login Failed. Please try again.");
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="Logo" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="App Logo" />
          </div>
          <div className="login-center">
            <h2>Welcome Back!</h2>
            <p>Please enter your details</p>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin}>
              {/* Email Input */}
              <input type="email" placeholder="Email" required />

              {/* Password Input with Toggle Visibility */}
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(false)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(true)} />
                )}
              </div>

              {/* Form Submit Button */}
              <button type="submit">Sign In</button>

              {/* Google OAuth Login Button */}
              <div className="google-login-button">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                />
              </div>
            </form>

            {/* Remember Me and Forgot Password */}
            <div className="login-center-options">
              <div className="remember-div">
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              <Link to="/forgot-password" className="forgot-pass-link">
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Sign Up and Back to Home Links */}
          <p className="login-bottom-p">
            Don't have an account?{" "}
            <Link to="/signup">Sign Up</Link>
          </p>
          <p className="Backref">
            Back to{" "}
            <Link to="/">Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
