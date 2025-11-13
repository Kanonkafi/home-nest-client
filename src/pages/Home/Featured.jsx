import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

const Featured = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/latest-properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <LoadingSpinner></LoadingSpinner>
    );
  }

  return (
    <div className="w-11/12 mx-auto my-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Featured Real Estates
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
          >
            {/* Image section */}
            <div className="overflow-hidden relative group">
              <img
                src={property.image}
                alt={property.propertyName}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
              />
              <div className="absolute top-3 right-3">
                <span className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {property.category}
                </span>
              </div>
            </div>

            {/* Content section */}
            <div className="p-6 space-y-3 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition">
                {property.propertyName}
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                {property.description.length > 60
                  ? property.description.slice(0, 60) + "..."
                  : property.description}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="bg-indigo-50 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full">
                   {property.location}
                </span>
                <span className="bg-green-50 text-green-600 text-xs font-medium px-3 py-1 rounded-full">
                   ${property.price.toLocaleString()}
                </span>
              </div>

              {/* Button */}
              <div className="pt-4 mt-auto">
                <Link
                  to={`/properties/${property._id}`}
                  className="inline-block bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
