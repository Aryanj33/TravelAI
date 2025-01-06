import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PlanB from './components/PlanB';
import Login from "./components/Login";
import SignUp from "./components/Signup";
import ItineraryPage from './components/ItineraryPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route path="/PlanB" element={<PlanB />} />
      </Routes>
    </Router>
  );
};
export default App;