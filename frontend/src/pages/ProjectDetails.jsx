import React, { useState } from 'react';

const ProjectDetails = () => {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFiles([...files, { name: file.name, link: URL.createObjectURL(file) }]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Project Name</h2>
          <div className="flex gap-4">
            <span>Team ID</span>
            <span>Members</span>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Project Description</h3>
          <p className="text-gray-600">Project description goes here...</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Deadline</h3>
          <input
            type="date"
            className="border rounded px-3 py-1"
          />
        </div>

        <div className="space-y-3">
          {files.map((file, index) => (
            <div key={index} className="flex justify-between items-center border-b pb-2">
              <span>{file.name}</span>
              <a href={file.link} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                File Link
              </a>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
          >
            Upload File
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
