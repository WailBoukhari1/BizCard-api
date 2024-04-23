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
        // Set the state with fetched data
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
    <div>
      <h2>Edit Business Card</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="website">Website:</label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default BusinessCardUpdate;
