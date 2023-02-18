import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Navbar from "./Navbar";
import Preferences from "./Preferences";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import MainPage from "./MainPage";

import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import PersonalPage from "./PersonalPage";

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 4000,
  offset: "20px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

const APP = () => {
  return (
    <Router>
      <AlertProvider template={AlertTemplate} {...options}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/preferences"
            element={
              <ProtectedRoute>
                <Preferences />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mainpage"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/personalPage"
            element={
              <ProtectedRoute>
                <PersonalPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AlertProvider>
    </Router>
  );
};

export default APP;
