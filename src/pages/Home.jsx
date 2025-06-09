import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import ServiceCard from "../components/ServiceCard";
import Banner from "../components/Banner";
import MeetOurPartner from "../components/MeetOurPartner";

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/featured-services`
        );
        setServices(res.data);
      } catch (err) {
        console.error("Failed to load services", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      {/* Banner Section */}

      <Banner></Banner>
      {loading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <section className="py-10 max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">
            Featured Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service}></ServiceCard>
            ))}
          </div>
        </section>
      )}
      {/* Meet our partner */}
      <MeetOurPartner></MeetOurPartner>
    </div>
  );
};

export default Home;
