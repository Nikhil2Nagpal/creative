import React from 'react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
        <a href="/" className="text-blue-600 hover:text-blue-800 transition">
          Go back to Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;