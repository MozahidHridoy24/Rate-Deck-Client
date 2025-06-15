import React from "react";
import { useLoaderData } from "react-router";
import ServiceCard from "../components/ServiceCard";

const AllServices = () => {
  const servicesData = useLoaderData();
  const services = servicesData.data;
  return (
    <div>
      <title>RateDeck | All Services</title>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">
          All Services
        </h2>
        {/*  Search Input Field */}
        <div className="mb-8 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search by title, category, or company..."
            className="input input-bordered w-full"
          />
        </div>

        {services.length === 0 ? (
          <p className="text-center text-gray-500">No services found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services?.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllServices;
