// BusinessCardCreate.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const BusinessCardCreate = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    title: "",
    phone: "",
    email: "",
    address: "",
    website: "",
  });
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get the token from cookies
      const token = cookies.get("token");

      // Send a POST request to create the business card with the token in the headers
      await axios.post("http://localhost/api/business-cards/store", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Redirect to the business card list page after successful creation
      navigate("/business-cards");
    } catch (error) {
      console.error("Error creating business card:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container mt-5">
      <h2>Create Business Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="company" className="form-label">
            Company
          </label>
          <input
            type="text"
            className="form-control"
            id="company"
            name="company"
            placeholder="Enter company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            placeholder="Enter phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="website" className="form-label">
            Website
          </label>
          <input
            type="text"
            className="form-control"
            id="website"
            name="website"
            placeholder="Enter website"
            value={formData.website}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Create
        </button>
      </form>
    </div>
  );
};

export default BusinessCardCreate;
