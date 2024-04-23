import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const BusinessCardList = () => {
  const [businessCards, setBusinessCards] = useState([]);
  const navigate = useNavigate();

  const cookies = useMemo(() => new Cookies(), []);

  useEffect(() => {
    // Fetch business cards from the API
    const fetchBusinessCards = async () => {
      try {
        const response = await axios.get(
          "http://localhost/api/business-cards",
          {
            headers: {
              Authorization: `Bearer ${cookies.get("token")}`,
            },
          }
        );
        setBusinessCards(response.data);
      } catch (error) {
        console.error("Error fetching business cards:", error);
      }
    };

    fetchBusinessCards();
  }, [cookies]); // Include cookies in the dependency array to fetch data whenever the token cookie changes

  // Function to navigate to the business card create page
  const handleCreate = () => {
    navigate("/business-cards/create");
  };

  // Function to navigate to the business card edit page
  const handleEdit = (id) => {
    navigate(`/business-cards/${id}/edit`);
  };

  // Function to delete a business card
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost/api/business-cards/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      });
      // Remove the deleted card from the state
      setBusinessCards(businessCards.filter((card) => card.id !== id));
      console.log("Business card deleted successfully");
    } catch (error) {
      console.error("Error deleting business card:", error);
    }
  };

  return (
    <div>
      <h2>Business Cards</h2>
      <div className="mb-3">
        <button className="btn btn-dark me-2" onClick={handleCreate}>
          Create
        </button>
      </div>
      <ul className="list-group">
        {businessCards.map((card) => (
          <li key={card.id} className="list-group-item">
            <h3>{card.name}</h3>
            <p>{card.email}</p>
            <p>{card.phone}</p>
            {/* Add Edit and Delete buttons */}
            <button
              className="btn btn-dark me-2"
              onClick={() => handleEdit(card.id)}
            >
              Edit
            </button>
            <button
              className="btn btn-dark"
              onClick={() => handleDelete(card.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusinessCardList;
