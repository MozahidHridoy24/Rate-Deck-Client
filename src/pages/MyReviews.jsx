import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaEdit, FaStar, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyReviews = () => {
  const { user } = use(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const [updatedRatings, setUpdatedRatings] = useState(0);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxiosSecure();

  useEffect(() => {
    const fetchUserReviews = async () => {
      if (user?.email) {
        try {
          setLoading(true);
          const res = await axiosInstance.get(`/reviews/${user.email}`);
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

  // Handle Update
  const handleUpdateReviews = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.patch(`/reviews/${selectedReview._id}`, {
        text: updatedText,
        rating: updatedRatings,
      });

      setReviews((prev) =>
        prev.map((r) =>
          r._id === selectedReview._id
            ? { ...r, text: updatedText, rating: updatedRatings }
            : r
        )
      );

      setSelectedReview(null);
      Swal.fire("Updated!", "Your review was updated.", "success");
    } catch {
      Swal.fire("Error", "Failed to update review", "error");
    }
  };

  // Delete a review
  const handleDeleteReview = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Review?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosInstance.delete(`/reviews/${id}`);
        setReviews((prev) => prev.filter((r) => r._id !== id));
        Swal.fire("Deleted!", "Review has been deleted.", "success");
      } catch {
        Swal.fire("Error", "Could not delete the review.", "error");
      }
    }
  };

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
                  onClick={() => {
                    setSelectedReview(review);
                    setUpdatedText(review.text);
                    setUpdatedRatings(review.rating);
                  }}
                >
                  <FaEdit />
                  Update
                </button>
                <button
                  className="btn btn-sm btn-outline btn-secondary flex items-center gap-2"
                  onClick={() => handleDeleteReview(review._id)}
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/*  Update Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl max-w-md w-full relative">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              Update Review
            </h3>
            <form onSubmit={handleUpdateReviews} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Service Title
                </label>
                <input
                  type="text"
                  value={selectedReview.serviceTitle}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Review Text
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  value={updatedText}
                  onChange={(e) => setUpdatedText(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  className="input input-bordered w-full"
                  value={updatedRatings}
                  onChange={(e) => setUpdatedRatings(Number(e.target.value))}
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setSelectedReview(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyReviews;
