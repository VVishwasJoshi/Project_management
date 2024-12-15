import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if logging in as a guide
    const guides = JSON.parse(localStorage.getItem('guides') || '[]');
    const guide = guides.find(g => g.guideId === formData.username);

    if (guide) {
      if (guide.password === formData.password) {
        localStorage.setItem('currentGuideId', guide.guideId);
        navigate('/guide-dashboard');
      } else {
        setError("Invalid password");
      }
    } else {
      // If not a guide, treat as student
      navigate('/join-create');
    }
  };

  const handleSignup = () => {
    navigate("/signup-selector");
  };

  return (
    <div className="auth-container">
      <h2 data-aos="fade-down">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username or Guide ID"
          value={formData.username}
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
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        <button type="submit" data-aos="fade-up">
          Login
        </button>
      </form>
      <p>
        New User?{" "}
        <span className="signup-link" onClick={handleSignup}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
