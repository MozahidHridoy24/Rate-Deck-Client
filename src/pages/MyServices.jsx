import React, { use, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyServices = () => {
  const { user } = use(AuthContext);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchUserServices = async () => {
      if (user?.email) {
        try {
          setLoading(true);
          const res = await axiosSecure.get(`/my-services/${user.email}`);
          setServices(res.data);
        } catch (err) {
          console.error("Failed to fetch services:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserServices();
  }, [user?.email, axiosSecure]);

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: "linear-gradient(to right, #ffe6e6, #ffffff)",
    });

    if (confirmed.isConfirmed) {
      try {
        await axiosSecure.delete(`/services/${id}`);
        setServices((prev) => prev.filter((s) => s._id !== id));
        Swal.fire("Deleted!", "Service has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete service", "error");
      }
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.put(`/services/${selectedService._id}`, updatedData);
      Swal.fire("Updated!", "Service has been updated.", "success");

      // Update local state
      setServices((prev) =>
        prev.map((s) =>
          s._id === selectedService._id ? { ...s, ...updatedData } : s
        )
      );
      setSelectedService(null); // Close modal
    } catch (error) {
      Swal.fire("Error", "Failed to update service", "error");
    }
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div>
      <title>RateDeck | My Services</title>
      <div className="max-w-6xl mx-auto md:w-11/12 p-4 mb-10">
        <h2 className="text-3xl font-bold mb-6 text-primary text-center">
          My Services
        </h2>

        {services.length === 0 ? (
          <p className="text-gray-500">You haven't added any services yet.</p>
        ) : (
          <div className=" overflow-x-auto">
            <table className="table w-full table-auto bg-base-100 shadow rounded-lg">
              <thead className="bg-secondary">
                <tr className="text-lg text-primary">
                  <th>#</th>
                  <th className="break-words">Title</th>
                  <th className="break-words">Category</th>
                  <th className="break-words">Price</th>
                  <th className="break-words">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s, i) => (
                  <tr key={s._id} className="text-sm align-top">
                    <td className="text-base-content font-bold">{i + 1}</td>
                    <td className="break-words max-w-[140px] font-semibold text-base-content">
                      {s.title}
                    </td>
                    <td className="break-words max-w-[120px] text-base-content">
                      {s.category}
                    </td>
                    <td className="text-base-content">${s.price}</td>
                    <td className="break-words">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => {
                            setSelectedService(s);
                            setUpdatedData({
                              image: s.image,
                              title: s.title,
                              company: s.company,
                              website: s.website,
                              description: s.description,
                              category: s.category,
                              price: s.price,
                            });
                          }}
                          className="btn btn-xs btn-outline btn-primary"
                        >
                          <FaEdit />
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(s._id)}
                          className="btn btn-xs btn-outline btn-secondary"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Update Modal */}
        {selectedService && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-base-100 rounded-lg p-6 w-full max-w-lg relative overflow-y-auto max-h-[90vh]">
              <h3 className="text-xl font-semibold mb-4 text-primary">
                Update Service
              </h3>
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                {/* Image */}
                <div>
                  <label className="block font-medium mb-1">
                    Service Image URL
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={updatedData.image}
                    onChange={(e) =>
                      setUpdatedData((prev) => ({
                        ...prev,
                        image: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block font-medium mb-1">
                    Service Title
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={updatedData.title}
                    onChange={(e) =>
                      setUpdatedData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block font-medium mb-1">Company Name</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={updatedData.company}
                    onChange={(e) =>
                      setUpdatedData((prev) => ({
                        ...prev,
                        company: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="block font-medium mb-1">Website</label>
                  <input
                    type="url"
                    className="input input-bordered w-full"
                    value={updatedData.website}
                    onChange={(e) =>
                      setUpdatedData((prev) => ({
                        ...prev,
                        website: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block font-medium mb-1">Description</label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    value={updatedData.description}
                    onChange={(e) =>
                      setUpdatedData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block font-medium mb-1">Category</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={updatedData.category}
                    onChange={(e) =>
                      setUpdatedData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block font-medium mb-1">Price</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={updatedData.price}
                    onChange={(e) =>
                      setUpdatedData((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="btn"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyServices;
