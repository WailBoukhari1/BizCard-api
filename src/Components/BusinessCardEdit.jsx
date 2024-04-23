// BusinessCardUpdate.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const BusinessCardUpdate = () => {
  const { id } = useParams(); // Extract the ID parameter from the URL
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    title: "",
    phone: "",
    email: "",
    address: "",
    website: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const fetchBusinessCard = async () => {
      try {
        const response = await axios.get(
          `http://localhost/api/business-cards/${id}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.get("token")}`,
            },
          }
        );
        const { name, company, title, phone, email, address, website } =
          response.data;
        setFormData({
          name,
          company,
          title,
          phone,
          email,
          address,
          website,
        });
      } catch (error) {
        console.error("Error fetching business card:", error);
        setError("Error fetching business card. Please try again.");
      }
    };

    fetchBusinessCard(); // Call the fetchBusinessCard function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a PUT request to update the business card
      await axios.put(
        `http://localhost/api/business-cards/${id}/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      );
      // Redirect to the business card list page after successful update
      navigate("/business-cards");
    } catch (error) {
      console.error("Error updating business card:", error);
      setError("Error updating business card. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Business Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="company" className="form-label">
            Company:
          </label>
          <input
            type="text"
            className="form-control"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone:
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="website" className="form-label">
            Website:
          </label>
          <input
            type="text"
            className="form-control"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Update
        </button>
      </form>
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
};

export default BusinessCardUpdate;
