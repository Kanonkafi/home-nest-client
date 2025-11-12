import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { toast } from "react-toastify"; // টোস্ট নোটিফিকেশন দেখানোর জন্য ইম্পোর্ট করুন (যদি ব্যবহার করেন)

const PropertyCard = ({ property, setProperties }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // user অবজেক্ট ব্যবহার করা হচ্ছে

  const handleDelete = () => {
    // 1. ✅ টোকেন এবং ইউজার চেক করুন
    if (!user || !user.accessToken) {
        toast.error("❌ You must be logged in to delete a property.");
        return; 
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7b38ff",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/properties/${property._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((res) => {
            // 2. ✅ সার্ভার এরর হ্যান্ডেল করুন
            if (res.status === 401) {
                Swal.fire("Error!", "Unauthorized: Please log in again.", "error");
                // টোকেন অবৈধ হলে, আর কিছু না করে এখান থেকে বের হয়ে যান
                throw new Error("Unauthorized"); 
            }
            if (!res.ok) {
                Swal.fire("Error!", "Failed to delete property.", "error");
                throw new Error("Deletion failed on server"); 
            }
            // 3. যদি সার্ভার DELETE রিকোয়েস্টে কোনো বডি (যেমন JSON) না পাঠায়, 
            // তবে res.json() ক্র্যাশ করতে পারে। তাই স্ট্যাটাস চেক করে শুধু প্রসিড করুন।
            // যদি সার্ভার অবশ্যই JSON পাঠায়, তবে res.json() ব্যবহার করুন।
            // আমরা ধরে নিলাম সার্ভার একটি সফল (res.ok) রেসপন্সে কিছু একটা পাঠায়:
            return res.json(); 
        })
        .then(() => {
          Swal.fire("Deleted!", "Property has been deleted.", "success");
          // UI থেকে প্রপার্টিটি সরিয়ে দিন
          setProperties((prev) =>
            prev.filter((item) => item._id !== property._id)
          );
        })
        .catch((err) => {
            // যদি fetch বা network error হয় (যা সার্ভার স্ট্যাটাস কোড নয়)
            if (err.message !== "Unauthorized" && err.message !== "Deletion failed on server") {
                console.error(err);
                Swal.fire("Error!", "An unexpected error occurred.", "error");
            }
        });
      }
    });
  };

  return (
    <div
      className="rounded-3xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl 
      hover:scale-[1.03] hover:shadow-[0_0_25px_#7b38ff] transition duration-300 flex flex-col justify-between"
    >
      <img
        src={property.image}
        alt={property.propertyName}
        className="rounded-2xl w-full h-48 object-cover mb-4 border border-white/10"
      />

      <div>
        <h3 className="text-xl font-semibold text-white mb-2">
          {property.propertyName}
        </h3>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {property.category}
          </span>
          <span className="bg-gradient-to-r from-pink-500 to-orange-400 text-white text-xs font-semibold px-3 py-1 rounded-full">
            ${property.price}
          </span>
          <span className="bg-gradient-to-r from-cyan-500 to-blue-400 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {property.location}
          </span>
        </div>

        <p className="text-gray-300 text-sm mb-4">
          Posted: {new Date(property.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-auto pt-4">
        <button
          onClick={() => navigate(`/update-property/${property._id}`)}
          className="flex-1 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 transition"
        >
          Update
        </button>

        <button
          onClick={handleDelete}
          className="flex-1 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 transition"
        >
          Delete
        </button>

        <button
          onClick={() => navigate(`/property/${property._id}`)}
          className="flex-1 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-green-500 to-teal-400 hover:opacity-90 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;