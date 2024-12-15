import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [projectDetails, setProjectDetails] = useState({
    projectName: '',
    projectDescription: '',
    projectDeadline: '',
    guideId: '',
    teamId: '',  // User will set their own team ID
    members: [],
    files: []  // Array to store uploaded files
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails(prev => ({
      ...prev,
      [name]: value
    }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verify if guide exists
    const guides = JSON.parse(localStorage.getItem('guides') || '[]');
    const guideExists = guides.some(guide => guide.guideId === projectDetails.guideId);
    
    if (!guideExists) {
      setError("Invalid Guide ID. Please enter a valid Guide ID.");
      return;
    }

    // Get existing projects or initialize empty array
    const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    // Check if team ID already exists
    if (existingProjects.some(project => project.teamId === projectDetails.teamId)) {
      setError('Team ID already exists. Please choose a different ID.');
      return;
    }

    // Add new project to projects array
    const updatedProjects = [...existingProjects, projectDetails];
    
    // Store in localStorage
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
    // Navigate to project details
    navigate(`/project-details/${projectDetails.teamId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Enter Project Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Team ID:</label>
            <input
              type="text"
              name="teamId"
              value={projectDetails.teamId}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter a unique team ID"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Project Name:</label>
            <input
              type="text"
              name="projectName"
              value={projectDetails.projectName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Project Description:</label>
            <textarea
              name="projectDescription"
              value={projectDetails.projectDescription}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Project Deadline:</label>
            <input
              type="date"
              name="projectDeadline"
              value={projectDetails.projectDeadline}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Guide ID:</label>
            <input
              type="text"
              name="guideId"
              value={projectDetails.guideId}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter registered Guide ID"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Create Team
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
