import { useEffect, useState } from "react";
import axios from "axios";
import { getuserJwtToken } from "../utils";
import { Trash2 } from "lucide-react";
import TourCard from "../components/TourCard";
import Navbar from "../components/Navbar";

function Wishlist() {
  const [tours, setTours] = useState([]);
  const token = getuserJwtToken();

  // ✅ Fetch wishlist
  const fetchWishlist = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTours(res.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // ✅ Remove from wishlist
  const removeFromWishlist = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/wishlist/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // UI update
      setTours(tours.filter(tour => tour._id !== id));

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-5">
        <h2 className="text-2xl mb-6 playpen-sans text-center">Favorite Tours</h2>

        {tours.length === 0 ? (
          <p className="text-gray-500">No tours in wishlist</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {tours.map((tour) => (
              <TourCard
                key={tour._id}
                {...tour}
                onDelete={removeFromWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;