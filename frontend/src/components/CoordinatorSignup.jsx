import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CoordinatorSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a unique guide ID using timestamp and random number
    const guideId = 'G' + Date.now().toString().slice(-4) + Math.floor(Math.random() * 1000);
    const guideData = { ...formData, guideId };

    // Get existing guides from localStorage
    const existingGuides = JSON.parse(localStorage.getItem('guides') || '[]');
    const updatedGuides = [...existingGuides, guideData];
    localStorage.setItem('guides', JSON.stringify(updatedGuides));

    // Store current guide ID for immediate login
    localStorage.setItem('currentGuideId', guideId);

    // Navigate to guide dashboard
    navigate("/guide-dashboard");
  };

  return (
    <div className="auth-container">
      <h2 data-aos="fade-down">Coordinator Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          data-aos="zoom-out"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          data-aos="zoom-out"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          data-aos="zoom-out"
        />
        <button type="submit" data-aos="fade-up">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default CoordinatorSignup;
