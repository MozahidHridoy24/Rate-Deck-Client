import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-center p-4">
      <h1 className="text-8xl font-extrabold text-primary mb-4">404</h1>
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
