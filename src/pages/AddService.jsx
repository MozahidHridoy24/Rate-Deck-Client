import { use, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { div } from "motion/react-client";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddService = () => {
  const { user } = use(AuthContext);
  const axiosInstance = useAxiosSecure();

  const [service, setService] = useState({
    image: "",
    title: "",
    company: "",
    website: "",
    description: "",
    category: "",
    price: "",
  });

  const handleChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleAddService = async (e) => {
    e.preventDefault();

    const fullService = {
      ...service,
      userEmail: user?.email,
      date: new Date().toISOString(), // Automatically adds current date
    };

    try {
      const res = await axiosInstance.post(`/services`, fullService);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Service has been added!", "success");
      }
      setService({
        image: "",
        title: "",
        company: "",
        website: "",
        description: "",
        category: "",
        price: "",
      });
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div>
      <title>RateDeck | Add Services</title>
      <div className="bg-base-200 p-10">
        <div className="max-w-2xl mx-auto p-6 bg-base-100 shadow-md rounded ">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Add New Service
          </h2>
          <form onSubmit={handleAddService} className="grid grid-cols-1 gap-4">
            <label className="font-medium">Service Image URL</label>
            <input
              type="text"
              name="image"
              value={service.image}
              onChange={handleChange}
              placeholder="Service Image URL"
              className="input input-bordered w-full"
              required
            />

            <label className="font-medium">Service Title</label>
            <input
              type="text"
              name="title"
              value={service.title}
              onChange={handleChange}
              placeholder="Service Title"
              className="input input-bordered w-full"
              required
            />

            <label className="font-medium">Company Name</label>
            <input
              type="text"
              name="company"
              value={service.company}
              onChange={handleChange}
              placeholder="Company Name"
              className="input input-bordered w-full"
              required
            />

            <label className="font-medium">Company Website</label>
            <input
              type="text"
              name="website"
              value={service.website}
              onChange={handleChange}
              placeholder="Company Website"
              className="input input-bordered w-full"
              required
            />

            <label className="font-medium">Description</label>
            <textarea
              name="description"
              value={service.description}
              onChange={handleChange}
              placeholder="Description"
              className="textarea textarea-bordered w-full"
              required
            />

            <label className="font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={service.category}
              onChange={handleChange}
              placeholder="Category"
              className="input input-bordered w-full"
              required
            />

            <label className="font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={service.price}
              onChange={handleChange}
              placeholder="Price"
              className="input input-bordered w-full"
              required
            />

            <button type="submit" className="btn btn-primary w-full mt-4">
              Add Service
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddService;
