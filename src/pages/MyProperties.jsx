import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import PropertyCard from "../components/PropertyCard";

const MyProperties = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0731] text-white text-lg">
        Please wait ... Loading...
      </div>
    );
  }

  return (
    <section className="py-14 bg-gradient-to-br from-[#0a0731] via-[#0d0b45] to-[#1a1458] rounded-2xl">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          My Properties
        </h2>
        <p className="text-gray-300 mt-2">Manage your listed properties easily</p>
      </div>

      <div className="grid max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              setProperties={setProperties}
            />
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            No properties found.
          </p>
        )}
      </div>
    </section>
  );
};

export default MyProperties;
