import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";
import errorIcon from "../assets/Lottie/error.json";
import Lottie from "lottie-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-center p-4">
      <div className="w-full max-w-md mb-6">
        <Lottie animationData={errorIcon} loop className="w-full h-full" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-6 max-w-md">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="btn btn-secondary flex items-center gap-2 shadow-md"
      >
        <FaArrowLeft /> Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
