import React from "react";

const NoItemFound = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-sm">
        <h2 className="text-xl font-semibold text-gray-700">No Items Found</h2>
        <p className="mt-2 text-gray-500">{`We couldn't find any items matching your search.`}</p>
      </div>
    </div>
  );
};

export default NoItemFound;
