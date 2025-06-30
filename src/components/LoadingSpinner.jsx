import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20">
      <div className="relative w-16 h-16">
        {/* Outer pulsating ring */}
        <div className="absolute inset-0 rounded-full border-4 border-primary opacity-50 animate-pulse-slow"></div>

        {/* Middle rotating ring */}
        <div className="absolute inset-2 rounded-full border-4 border-t-primary border-b-transparent animate-spin"></div>

        {/* Inner solid circle */}
        <div className="absolute inset-5 rounded-full bg-primary"></div>
      </div>
    </div>
  );
};
export default LoadingSpinner;
