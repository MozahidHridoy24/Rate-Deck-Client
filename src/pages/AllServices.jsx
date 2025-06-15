import React, { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

const AllServices = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all categories
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/categories`)
      .then((res) => setCategories(res.data));
  }, []);
  // Fetch services (filtered by category and/or search query)
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/services`,
          {
            params: {
              category: selectedCategory || undefined,
              search: searchQuery || undefined,
            },
          }
        );
        setServices(res.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [selectedCategory, searchQuery]);

  return (
    <div>
      <title>RateDeck | All Services</title>
      <div className="w-11/12 mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">
          All Services
        </h2>

        {/* Search and Filter Controls */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by title, category, or company..."
            className="input input-bordered w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Filter Dropdown */}
          <select
            className="select select-bordered w-full md:w-1/2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div>
            <LoadingSpinner></LoadingSpinner>
          </div>
        ) : services.length === 0 ? (
          <p className="text-center text-gray-500">No services found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllServices;
