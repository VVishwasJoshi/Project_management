import React from 'react';

const StudentDetails = () => {
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

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Student Name:</h3>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="File Name"
              readOnly
            />
          </div>

          <div>
            <h3 className="font-semibold">Description:</h3>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows="3"
              placeholder="Description"
            />
          </div>

          <div>
            <h3 className="font-semibold">File Name:</h3>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="File Name"
            />
          </div>

          <div>
            <h3 className="font-semibold">Description:</h3>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows="3"
              placeholder="Description"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
