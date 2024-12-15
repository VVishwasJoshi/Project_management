import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Login from "./components/login";
import SignupSelector from "./components/SignupSelector";
import StudentSignup from "./components/StudentSignup";
import CoordinatorSignup from "./components/CoordinatorSignup";
import JoinOrCreate from "./components/JoinOrCreate";
import GuideDashboard from "./pages/GuideDashboard";
import ProjectDetails from "./pages/ProjectDetails";
import CreateProject from "./pages/CreateProject";
import StudentDetails from "./pages/StudentDetails";

import './App.css'


const App = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      offset: 100, 
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup-selector" element={<SignupSelector />} />
        <Route path="/student-signup" element={<StudentSignup />} />
        <Route path="/coordinator-signup" element={<CoordinatorSignup />} />
        <Route path="/join-create" element={<JoinOrCreate />} />
        <Route path="/guide-dashboard" element={<GuideDashboard />} />
        <Route path="/project-details/:teamId" element={<ProjectDetails />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/student-details/:teamId/:memberId" element={<StudentDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
