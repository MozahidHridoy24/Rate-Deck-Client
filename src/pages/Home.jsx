import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import ServiceCard from "../components/ServiceCard";
import Banner from "../components/Banner";
import MeetOurPartner from "../components/MeetOurPartner";
import { motion } from "motion/react";
import SuccessStories from "../components/SuccessStories";
import Stats from "../components/Stats";

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
      <title>RateDeck | Home</title>
      <meta name="description" content="Welcome to our website" />
      {/* Banner Section */}

      <Banner></Banner>
      {loading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <section className="py-10 bg-base-200 mb-1 mx-auto px-4">
          <div className="w-11/12 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">
              Featured Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service}></ServiceCard>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Meet our partner */}
      <MeetOurPartner></MeetOurPartner>
      {/* stats */}
      <Stats></Stats>
      {/* Extra section 1 Success Stories */}
      <SuccessStories></SuccessStories>
      {/* Extra section 2 FAQ*/}
      <section className=" bg-base-200 mt-1 text-base-content" id="faq">
        <div className=" w-11/12 mx-auto py-10 px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-primary">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <div className="collapse collapse-plus bg-base-100 shadow">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium text-primary">
                What is RateDeck?
              </div>
              <div className="collapse-content">
                <p>
                  RateDeck is a platform where users can discover and share
                  reviews about different services to make informed decisions.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 shadow">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium text-primary">
                How do I leave a review?
              </div>
              <div className="collapse-content">
                <p>
                  To leave a review, sign in and navigate to a service’s detail
                  page. You'll find a review form to submit your feedback.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 shadow">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium text-primary">
                Can I edit or delete my reviews?
              </div>
              <div className="collapse-content">
                <p>
                  Yes, you can manage your reviews from your dashboard under the
                  "My Reviews" section.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 shadow">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium text-primary">
                Are reviews moderated?
              </div>
              <div className="collapse-content">
                <p>
                  All reviews are subject to moderation to ensure they comply
                  with community standards and remain constructive.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 shadow">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium text-primary">
                Is RateDeck free to use?
              </div>
              <div className="collapse-content">
                <p>
                  Absolutely. You can use RateDeck to browse and post reviews
                  without any cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
