import React from "react";
import { Link } from "react-router";

const ServiceCard = ({ service }) => {
  const { image, title, description, category, price, _id } = service;

  return (
    <div className="bg-base-100 text-base-content border border-primary flex flex-col justify-between rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
      <div>
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-xl p-2 "
        />
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-lg font-bold text-primary">{title}</h3>

        <p className=" text-sm">
          {description?.length > 100
            ? description.slice(0, 100) + "..."
            : description}
        </p>

        <p className=" text-sm">
          <span className="font-semibold">Category:</span> {category}
        </p>

        <p className=" text-sm">
          <span className="font-semibold ">Price:</span>{" "}
          <span className="text-secondary font-bold">${price}</span>
        </p>
      </div>

      <div className="pt-3 p-5 space-y-3">
        <Link to={`/services/${_id}`} className="btn btn-sm btn-primary w-full">
          See Details
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
