import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      {/* h-screen ensures full viewport height */}
      <span className="loading loading-spinner text-primary loading-lg"></span>
    </div>
  );
};

export default LoadingSpinner;
