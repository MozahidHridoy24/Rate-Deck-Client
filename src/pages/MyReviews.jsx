import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaEdit, FaStar, FaTrash } from "react-icons/fa";

const MyReviews = () => {
  const { user } = use(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserReviews = async () => {
      if (user?.email) {
        try {
          setLoading(true);
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/reviews/${user.email}`
          );
          setReviews(res.data);
        } catch (err) {
          console.error("Failed to fetch services:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserReviews();
  }, [user?.email]);

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <section className="max-w-6xl w-11/12 mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        My Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-base-100 shadow-md p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              {/* Left Side - Review Info */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-primary">
                  {review.serviceTitle}
                </h3>
                <p className="text-gray-700 mt-1">{review.text}</p>
                <div className="flex items-center gap-1 mt-2 text-yellow-500">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>

              {/* Right Side - Buttons */}
              <div className="flex gap-2 self-end md:self-auto">
                <button
                  className="btn btn-sm btn-outline btn-primary flex items-center gap-2"
                  // onClick={() => {
                  //   setEditingReview(review);
                  //   setUpdatedText(review.text);
                  //   setUpdatedRating(review.rating);
                  // }}
                >
                  <FaEdit />
                  Update
                </button>
                <button
                  className="btn btn-sm btn-outline btn-error flex items-center gap-2"
                  // onClick={() => handleDelete(review._id)}
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyReviews;
