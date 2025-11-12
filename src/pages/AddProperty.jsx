
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const AddProperty = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddProperty = (e) => {
    e.preventDefault();

    const formData = {
      propertyName: e.target.propertyName.value,
      description: e.target.description.value,
      category: e.target.category.value,
      price: parseFloat(e.target.price.value),
      location: e.target.location.value,
      image: e.target.image.value,
      userEmail: user?.email,
      userName: user?.displayName,
    };

    
    fetch("http://localhost:3000/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user?.accessToken}`, 
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Property added successfully!");
        console.log("Added:", data);
        e.target.reset();
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
       
      });
  };

 return (
    <section className="min-h-screen bg-gradient-to-br from-[#06251a] via-[#7a3494] to-[#581458] py-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-[0_0_25px_rgba(255,255,255,0.15)] p-8 md:p-10">
        
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
          Add New Property
        </h2>

        {/* Form */}
        <form onSubmit={handleAddProperty} className="space-y-6">
          {/* Property Name */}
          <div>
            <label className="block text-gray-200 mb-2 font-medium">Property Name</label>
            <input
              type="text"
              name="propertyName"
              required
              placeholder="Enter property name"
              className="w-full rounded-full px-5 py-3 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-200 mb-2 font-medium">Description</label>
            <textarea
              name="description"
              required
              rows="4"
              placeholder="Write short property details..."
              className="w-full rounded-2xl px-5 py-3 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-200 mb-2 font-medium">Category</label>
            <select
              name="category"
              required
              className="w-full rounded-full px-5 py-3 bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="" disabled selected>Select category</option>
              <option value="Rent">Rent</option>
              <option value="Sale">Sale</option>
              <option value="Commercial">Commercial</option>
              <option value="Land">Land</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-200 mb-2 font-medium">Price (Tk)</label>
            <input
              type="number"
              name="price"
              required
              placeholder="Enter price"
              className="w-full rounded-full px-5 py-3 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-200 mb-2 font-medium">Location</label>
            <input
              type="text"
              name="location"
              required
              placeholder="City / Area / Address"
              className="w-full rounded-full px-5 py-3 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Image Link */}
          <div>
            <label className="block text-gray-200 mb-2 font-medium">Image Link</label>
            <input
              type="url"
              name="image"
              required
              placeholder="https://example.com/property.jpg"
              className="w-full rounded-full px-5 py-3 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Read-Only Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-200 mb-2 font-medium">User Name</label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="w-full rounded-full px-5 py-3 bg-gray-300/30 text-gray-200 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-gray-200 mb-2 font-medium">User Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full rounded-full px-5 py-3 bg-gray-300/30 text-gray-200 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-6 font-semibold text-lg rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 transition text-white shadow-[0_0_20px_#7b38ff]"
          >
            Add Property
          </button>
        </form>
      </div>
    </section>
  );


};

export default AddProperty;
