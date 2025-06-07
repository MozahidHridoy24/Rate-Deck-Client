import { use, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const AddService = () => {
  const { user } = use(AuthContext);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullService = {
      ...service,
      userEmail: user?.email,
      date: new Date().toISOString(), // Automatically adds current date
    };
    console.log(fullService);

    try {
      const res = await axios.post(
        "http://localhost:3000/services",
        fullService
      );
      if (res.data.insertedId) {
        Swal.fire("Success!", "Service has been added!", "success");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        Add New Service
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="image"
          value={service.image}
          onChange={handleChange}
          placeholder="Service Image URL"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="title"
          value={service.title}
          onChange={handleChange}
          placeholder="Service Title"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="company"
          value={service.company}
          onChange={handleChange}
          placeholder="Company Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="website"
          value={service.website}
          onChange={handleChange}
          placeholder="Company Website"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="description"
          value={service.description}
          onChange={handleChange}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          required
        />
        <input
          type="text"
          name="category"
          value={service.category}
          onChange={handleChange}
          placeholder="Category"
          className="input input-bordered w-full"
          required
        />
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
  );
};

export default AddService;
