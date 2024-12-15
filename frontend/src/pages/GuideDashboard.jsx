import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GuideDashboard = () => {
  const navigate = useNavigate();
  const [guideProjects, setGuideProjects] = useState([]);
  const [guideId, setGuideId] = useState('');

  useEffect(() => {
    // Get the guide ID from localStorage (assuming it's stored during login)
    const currentGuideId = localStorage.getItem('currentGuideId');
    if (currentGuideId) {
      setGuideId(currentGuideId);
      loadGuideProjects(currentGuideId);
    }
  }, []);

  const loadGuideProjects = (currentGuideId) => {
    // Get all projects from localStorage
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    // Filter projects for this guide
    const filteredProjects = allProjects.filter(project => project.guideId === currentGuideId);
    setGuideProjects(filteredProjects);
  };

  const handleView = (teamId) => {
    navigate(`/project-details/${teamId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Guide Dashboard</h2>
          <span className="text-gray-600">Guide ID: {guideId}</span>
        </div>

        <div className="space-y-4">
          {guideProjects.length === 0 ? (
            <p className="text-gray-500 text-center">No projects found for this guide.</p>
          ) : (
            guideProjects.map((project) => (
              <div 
                key={project.teamId} 
                className="flex justify-between items-center border p-4 rounded-lg hover:bg-gray-50"
              >
                <div className="flex gap-6">
                  <span className="font-medium">Team ID: {project.teamId}</span>
                  <span>{project.projectName}</span>
                </div>
                <button
                  onClick={() => handleView(project.teamId)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  View
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GuideDashboard;
