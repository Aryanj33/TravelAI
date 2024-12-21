import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import ItineraryPage from './components/ItineraryPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="336397409824-9nntcc6i5atepe4mkgehhj7j337qu7sm.apps.googleusercontent.com">
      <Router>
        <Routes>
          {/* Define routes for each page */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
