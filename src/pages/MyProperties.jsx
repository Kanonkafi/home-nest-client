import { useContext, useEffect, useState } from "react";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const MyProperties = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/my-properties?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [user]);

  // Delete Function
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you cannot recover this property!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#1e1b4b",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/properties/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        })
          .then((res) => res.json())
          .then(() => {
            setProperties(properties.filter((p) => p._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your property has been removed.",
              icon: "success",
              background: "#1e1b4b",
              color: "#fff",
            });
          })
          .catch(() => toast.error("Failed to delete property"));
      }
    });
  };

  if (loading)
    return (
       <LoadingSpinner></LoadingSpinner>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          My Properties
        </h2>

        {properties.length === 0 ? (
          <p className="text-center text-white/90">
            You haven’t added any properties yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div
                key={property._id}
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-xl hover:scale-[1.02] transition-transform"
              >
                <img
                  src={property.image || "https://via.placeholder.com/400x250"}
                  alt={property.propertyName}
                  className="w-full h-40 object-cover rounded-xl mb-4 shadow-md"
                />
                <h3 className="text-2xl font-semibold mb-1">
                  {property.propertyName}
                </h3>
                <p className="text-sm text-white/80 mb-1">
                  📍 {property.location}
                </p>
                <p className="text-sm text-white/80 mb-1">
                  🏷️ {property.category}
                </p>
                <p className="text-lg font-semibold text-yellow-300 mb-1">
                  💰 ${property.price}
                </p>
                <p className="text-xs text-white/70 mb-4">
                  Posted: {new Date(property.createdAt).toLocaleDateString()}
                </p>

                <div className="flex justify-between">
                  <button
                    onClick={() => navigate(`/update-property/${property._id}`)}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-medium shadow-md hover:opacity-90"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(property._id)}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium shadow-md hover:opacity-90"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => navigate(`/properties/${property._id}`)}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 text-white font-medium shadow-md hover:opacity-90"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperties;
