import React from "react";
import { Link } from "react-router";

const ServiceCard = ({ service }) => {
  const { image, title, description, category, price, _id } = service;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-t-xl"
      />

      <div className="p-5 space-y-3">
        <h3 className="text-lg font-bold text-primary">{title}</h3>

        <p className="text-gray-700 text-sm">
          <span className="font-semibold text-base text-black block mb-1">
            Description:
          </span>
          {description?.length > 100
            ? description.slice(0, 100) + "..."
            : description}
        </p>

        <p className="text-gray-600 text-sm">
          <span className="font-semibold text-black">Category:</span> {category}
        </p>

        <p className="text-gray-600 text-sm">
          <span className="font-semibold text-black">Price:</span>{" "}
          <span className="text-secondary font-bold">${price}</span>
        </p>

        <div className="pt-3">
          <Link
            to={`/services/${_id}`}
            className="btn btn-sm btn-primary w-full"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
