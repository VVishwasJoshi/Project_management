import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinOrCreate = () => {
  const navigate = useNavigate();
  const [teamId, setTeamId] = useState("");
  const [error, setError] = useState("");

  const handleJoin = (e) => {
    e.preventDefault();
    // Get stored projects from localStorage
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    // Check if team exists
    const team = projects.find(project => project.teamId === teamId);
    if (team) {
      navigate(`/project-details/${teamId}`);
    } else {
      setError("Team ID not found. Please check and try again.");
    }
  };

  const handleCreate = () => {
    navigate("/create-project");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Join or Create Team</h2>
        
        <form onSubmit={handleJoin} className="mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter Team ID
            </label>
            <input
              type="text"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter Team ID"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Join Team
          </button>
        </form>

        <div className="text-center">
          <span className="text-gray-500">OR</span>
        </div>

        <button
          onClick={handleCreate}
          className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Create New Team
        </button>
      </div>
    </div>
  );
};

export default JoinOrCreate;
