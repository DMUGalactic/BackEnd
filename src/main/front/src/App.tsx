import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import VideoBackground from "./components/VideoBackground";
import Download from "./Download";
import Info from "./Info";
import Company from "./Company";
import Login from "./Login";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<VideoBackground />} /> {/* 홈 화면 */}
            <Route path="/company" element={<Company />} />
            <Route path="/info" element={<Info />} />
            <Route path="/download" element={<Download />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
