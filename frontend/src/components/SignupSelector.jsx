import React from "react";
import { useNavigate } from "react-router-dom";

const SignupSelector = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <h1 data-aos="zoom-out" >Sign Up</h1>
      <p data-aos="zoom-out">Are you a Student or a Coordinator?</p>
      <div>
        <button onClick={() => navigate("/student-signup")}  data-aos="zoom-in">Student</button>
        <button onClick={() => navigate("/coordinator-signup")}   data-aos="zoom-in">Coordinator</button>
      </div>
    </div>
  );
};

export default SignupSelector;
