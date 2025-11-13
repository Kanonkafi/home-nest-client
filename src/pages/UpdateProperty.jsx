import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UpdateProperty = () => {
  const property = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedProperty = {
      propertyName: form.propertyName.value,
      description: form.description.value,
      category: form.category.value,
      price: parseFloat(form.price.value),
      location: form.location.value,
      image: form.image.value,
    };

    // Access Token নাও Firebase থেকে
    user.getIdToken().then((token) => {
      fetch(`https://home-nest-api-server.vercel.app/properties/${property._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProperty),
      })
        .then((res) => res.json())
        .then(() => {
          toast.success(" Property updated successfully!");
          navigate(`/properties/${property._id}`);
        })
        .catch(() => toast.error("Update failed! Try again."));
    });
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-lg bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        Please wait ... Loading Property Data...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-12 px-6">
      <form
        onSubmit={handleUpdate}
        className="w-full max-w-3xl p-8 bg-white/90 text-gray-900 rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          Update Property
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="propertyName"
            defaultValue={property.propertyName}
            placeholder="Property Name"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-indigo-600"
            required
          />
          <input
            type="text"
            name="category"
            defaultValue={property.category}
            placeholder="Category"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-indigo-600"
            required
          />
          <input
            type="number"
            name="price"
            defaultValue={property.price}
            placeholder="Price"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-indigo-600"
            required
          />
          <input
            type="text"
            name="location"
            defaultValue={property.location}
            placeholder="Location"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-indigo-600"
            required
          />
          <input
            type="text"
            name="image"
            defaultValue={property.image}
            placeholder="Image Link"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-indigo-600"
          />
        </div>

        <textarea
          name="description"
          defaultValue={property.description}
          placeholder="Description"
          className="w-full mt-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-indigo-600"
          rows="4"
          required
        ></textarea>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 border border-gray-300"
          />
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 border border-gray-300"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold shadow-md hover:opacity-90 transition"
        >
          Update Property
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
