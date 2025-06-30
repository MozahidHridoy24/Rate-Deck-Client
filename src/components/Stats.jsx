import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import { useInView } from "react-intersection-observer";

const Stats = () => {
  const [stats, setStats] = useState({
    users: 0,
    services: 0,
    reviews: 0,
  });

  const [loading, setLoading] = useState(true);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [servicesRes, reviewsRes, usersRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/services-stats/count`),
          axios.get(`${import.meta.env.VITE_API_URL}/reviews-stats/count`),
          axios.get(`${import.meta.env.VITE_API_URL}/users/count`),
        ]);

        setStats({
          services: servicesRes.data.count || 0,
          reviews: reviewsRes.data.count || 0,
          users: usersRes.data.count || 0,
        });
      } catch (err) {
        console.error("Error fetching stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-base-200 py-10 mt-1">
      <div className="w-11/12 mx-auto">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">
          Platform Statistics
        </h2>
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div className="shadow p-6 rounded-lg bg-white dark:bg-base-100">
            <h3 className="text-xl font-semibold mb-2 text-base-content ">
              Total Active Users
            </h3>
            <div className="text-3xl font-bold text-primary">
              {inView ? (
                <CountUp end={stats.users} duration={2} separator="," />
              ) : (
                0
              )}
              +
            </div>
          </div>

          <div className="shadow p-6 rounded-lg bg-white dark:bg-base-100">
            <h3 className="text-xl font-semibold mb-2 text-base-content ">
              Total Services
            </h3>
            <div className="text-3xl font-bold text-secondary">
              {inView ? (
                <CountUp end={stats.services} duration={2} separator="," />
              ) : (
                0
              )}
              +
            </div>
          </div>

          <div className="shadow p-6 rounded-lg bg-white dark:bg-base-100">
            <h3 className="text-xl font-semibold mb-2 text-base-content ">
              Total Reviews
            </h3>
            <div className="text-3xl font-bold text-accent">
              {inView ? (
                <CountUp end={stats.reviews} duration={2} separator="," />
              ) : (
                0
              )}
              +
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
