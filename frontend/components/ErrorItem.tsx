import React from "react";

const ErrorItem = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-lg w-full">
        <h2 className="text-2xl font-bold text-red-600">
          Something Went Wrong
        </h2>
        <p className="mt-4 text-lg text-gray-700">
          We encountered an unexpected issue. Please try again later.
        </p>
        <div className="mt-6">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorItem;
