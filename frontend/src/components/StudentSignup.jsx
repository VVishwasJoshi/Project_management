import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentSignup = () => {
  const navigate = useNavigate();



  const [formData, setFormData] = useState({
    usn: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); 
  };

  return (
    <div className="auth-container">
      <h1 data-aos="fade-down">Student Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="usn"
          placeholder="USN"
          value={formData.usn}
          onChange={handleChange}
          required
          data-aos="zoom-out"
        />
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
        <button type="submit" data-aos="fade-up" onClick={() => navigate("/")}>Sign Up</button>
      </form>
    </div>
  );
};

export default StudentSignup;
