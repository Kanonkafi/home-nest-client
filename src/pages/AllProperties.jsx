import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(""); // price or date

  // load all properties initially
  useEffect(() => {
    fetch("https://home-nest-api-server.vercel.app/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data));
       setLoading(false);
  }, []);

  // search handler (like your AllModels)
  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value;
    setLoading(true);

    fetch(`https://home-nest-api-server.vercel.app/properties?search=${search_text}`)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      });
  };

  // sort handler
  const handleSort = (e) => {
    const value = e.target.value;
    setSortBy(value);
    setLoading(true);

    fetch(`https://home-nest-api-server.vercel.app/properties?sortBy=${value}`)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <LoadingSpinner></LoadingSpinner>
    );
  }

  return (
    <div className="w-11/12 mx-auto my-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          All Properties
        </h2>

        {/* Search and Sort */}
        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              name="search"
              placeholder="Search property..."
              className="input input-bordered rounded-lg px-3 py-2 border border-gray-300 focus:outline-indigo-500"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              Search
            </button>
          </form>

          <select
            onChange={handleSort}
            value={sortBy}
            className="select select-bordered rounded-lg border border-gray-300 px-3 py-2 focus:outline-indigo-500"
          >
            <option value="">Sort By</option>
            <option value="price">Price (Low to High)</option>
            <option value="date">Newest</option>
          </select>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
          >
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

            <div className="p-6 space-y-3">
              <h3 className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition">
                {property.propertyName}
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                {property.description?.length > 60
                  ? property.description.slice(0, 60) + "..."
                  : property.description}
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="bg-indigo-50 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full">
                  {property.location}
                </span>
                <span className="bg-green-50 text-green-600 text-xs font-medium px-3 py-1 rounded-full">
                  ${property.price?.toLocaleString()}
                </span>
              </div>

              <div className="pt-4">
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

export default AllProperties;
