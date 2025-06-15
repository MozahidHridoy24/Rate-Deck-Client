import React, { use, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const ServiceDetails = () => {
  const { user, loading } = use(AuthContext);
  const { data } = useLoaderData();
  const { image, title, description, company, website, category, price, _id } =
    data || {};
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ text: "", rating: 0 });
  const navigate = useNavigate();
  const axiosInstance = useAxiosSecure();

  // get reviews
  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/reviews?serviceId=${_id}`
      );
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    }
  };
  useEffect(() => {
    if (_id) {
      fetchReviews(); // ✅ Use the function now available in outer scope
    }
  }, [_id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return Swal.fire(
        "Login Required",
        "Please login to submit a review.",
        "warning"
      ).then(() => {
        navigate("/login");
      });
    }

    if (newReview.rating === 0) {
      return Swal.fire(
        "Rating Required",
        "Please provide a rating.",
        "warning"
      );
    }

    const review = {
      serviceId: data._id,
      serviceTitle: data.title,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      text: newReview.text,
      rating: newReview.rating,
      date: new Date().toISOString(),
    };
    // POST reviews data
    try {
      await axiosInstance.post(`/reviews`, review);
      Swal.fire("Review Added!", "Thank you for your feedback.", "success");
      setNewReview({ text: "", rating: 0 });
      fetchReviews();
    } catch (err) {
      Swal.fire("Error", "Failed to post review", "error");
    }
  };
  // dynamic title manually
  useEffect(() => {
    if (title) {
      document.title = `RateDeck | ${title}`;
    } else {
      document.title = "RateDeck | Service Details";
    }
  }, [title]);

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <img
            src={image}
            alt={title}
            className="w-full h-80 object-cover rounded shadow"
          />
          <div>
            <h2 className="text-4xl font-bold text-primary mb-2">{title}</h2>
            <p className="text-gray-600 mb-3">Description:{description}</p>
            <p className="mb-1">
              <strong>Category:</strong> {category}
            </p>
            <p className="mb-1">
              <strong>Company:</strong> {company}
            </p>
            <p className="mb-1">
              <strong>Website:</strong>{" "}
              <a
                className="text-blue-600 underline"
                href={website}
                target="_blank"
                rel="noreferrer"
              >
                {website}
              </a>
            </p>
            <p className="text-xl font-semibold text-secondary mt-2">
              ${price}
            </p>
          </div>
        </div>

        {/* Add Review Form */}
        <form
          onSubmit={handleReviewSubmit}
          className="mt-12 bg-white shadow p-6 rounded"
        >
          <h3 className="text-xl font-bold text-primary mb-4">
            Add Your Review
          </h3>

          {!user && (
            <p className="text-red-500 mb-4">
              You must be logged in to submit a review.
            </p>
          )}

          <textarea
            value={newReview.text}
            onChange={(e) =>
              setNewReview({ ...newReview, text: e.target.value })
            }
            className="textarea textarea-bordered w-full mb-4"
            placeholder="Write your review..."
            required
          ></textarea>

          <div className="mb-4">
            <label className="font-medium mb-2 block">Rating:</label>
            <Rating
              initialRating={newReview.rating}
              onChange={(value) =>
                setNewReview({ ...newReview, rating: value })
              }
              emptySymbol={<FaStar className="text-gray-400 text-2xl" />}
              fullSymbol={<FaStar className="text-yellow-500 text-2xl" />}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Review
          </button>
        </form>

        {/* Reviews Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-primary mb-4">
            Reviews ({reviews.length})
          </h3>

          {reviews.length === 0 ? (
            <p className="text-gray-500">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            <div className="space-y-5">
              {reviews.map((r) => (
                <div key={r._id} className="border p-4 rounded bg-base-100">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={r.userPhoto}
                      alt={r.userName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{r.userName}</p>
                      <p className="text-sm text-gray-400">
                        {new Date(r.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Rating
                    initialRating={r.rating}
                    readonly
                    emptySymbol={<FaStar className="text-gray-400" />}
                    fullSymbol={<FaStar className="text-yellow-500" />}
                  />
                  <p className="mt-2 text-gray-700">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
