import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative w-16 h-16">
        {/* Outer pulsating ring */}
        <div className="absolute inset-0 rounded-full border-4 border-[#d4a017] opacity-50 animate-pulse-slow"></div>

        {/* Middle rotating ring */}
        <div className="absolute inset-2 rounded-full border-4 border-t-[#d4a017] border-b-transparent animate-spin"></div>

        {/* Inner solid circle */}
        <div className="absolute inset-5 rounded-full bg-[#d4a017]"></div>
      </div>
    </div>
  );
};
export default LoadingSpinner;
