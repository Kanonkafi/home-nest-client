import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";


const UpdateProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch property details securely
  useEffect(() => {
    if (!user) return; // wait for user
    fetch(`http://localhost:3000/properties/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load property");
        return res.json();
      })
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load property!");
      });
  }, [id, user]);

  // ✅ Handle update submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      propertyName: e.target.propertyName?.value,
      category: e.target.category?.value,
      description: e.target.description?.value,
      price: e.target.price?.value,
      location: e.target.location?.value,
      image: e.target.image?.value,
    };

    fetch(`http://localhost:3000/properties/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update property");
        return res.json();
      })
      .then(() => {
        toast.success("✅ Property updated successfully!");
        navigate(`/property/${id}`);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Update failed! Try again.");
      });
  };

  if (loading) {
    return (
      <div className="text-white text-center mt-20">Loading property...</div>
    );
  }

  if (!property) {
    return (
      <div className="text-red-400 text-center mt-20">
        Property not found or unauthorized!
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0a0731] via-[#0d0b45] to-[#1a1458] py-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-[0_0_25px_rgba(255,255,255,0.15)] p-8 md:p-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
          Update Property
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="propertyName"
            defaultValue={property.propertyName}
            required
            placeholder="Property Name"
            className="w-full rounded-full px-5 py-3 bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-pink-400"
          />

          <textarea
            name="description"
            defaultValue={property.description}
            rows="4"
            className="w-full rounded-2xl px-5 py-3 bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-pink-400"
          ></textarea>

          <select
            name="category"
            defaultValue={property.category}
            className="w-full rounded-full px-5 py-3 bg-white/20 text-white focus:ring-2 focus:ring-pink-400"
          >
            <option value="Rent">Rent</option>
            <option value="Sale">Sale</option>
            <option value="Commercial">Commercial</option>
            <option value="Land">Land</option>
          </select>

          <input
            type="number"
            name="price"
            defaultValue={property.price}
            placeholder="Price"
            className="w-full rounded-full px-5 py-3 bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="text"
            name="location"
            defaultValue={property.location}
            placeholder="Location"
            className="w-full rounded-full px-5 py-3 bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="url"
            name="image"
            defaultValue={property.image}
            placeholder="Image URL"
            className="w-full rounded-full px-5 py-3 bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-pink-400"
          />

          <button
            type="submit"
            className="w-full py-3 mt-6 font-semibold text-lg rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 transition text-white shadow-[0_0_20px_#7b38ff]"
          >
            Update Property
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateProperty;
