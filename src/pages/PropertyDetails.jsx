import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [refetch, setRefetch] = useState(false);

  // Fetch property details
  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/properties/${id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
      });
  }, [user, id, refetch]);

  // Fetch reviews for this property
  useEffect(() => {
    fetch(`http://localhost:3000/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data.reverse()));
  }, [id, refetch]);

  // Handle review submit
  const handleReview = (e) => {
    e.preventDefault();

    const newReview = {
      propertyId: id,
  propertyName: property.propertyName,
  propertyImage: property.image,
  reviewerName: user.displayName || "Anonymous",
  reviewerEmail: user.email,
  rating: parseInt(rating),
  reviewText,
  reviewerPhoto: user.photoURL || "",
    };

    fetch(`http://localhost:3000/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Review submitted!");
        setReviewText("");
        setRating(0);
        setRefetch(!refetch);
      })
      .catch(() => toast.error("Failed to submit review"));
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-medium text-gray-500">
        Loading Property Details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto backdrop-blur-xl bg-white/10 p-8 rounded-3xl shadow-2xl border border-white/20 text-white">
        <div className="flex flex-col lg:flex-row gap-8">
          <img
            src={property.image}
            alt={property.propertyName}
            className="rounded-2xl w-full lg:w-1/2 h-80 object-cover shadow-lg"
          />
          <div className="flex-1 space-y-4">
            <h2 className="text-4xl font-bold">{property.propertyName}</h2>
            <p className="text-white/90 leading-relaxed">
              {property.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                📍 {property.location}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                🏷️ {property.category}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                💰 ${property.price?.toLocaleString()}
              </span>
            </div>

            <p className="text-white/80 text-sm mt-2">
              Posted on:{" "}
              {new Date(property.createdAt).toLocaleDateString("en-GB")}
            </p>

            <div className="flex items-center gap-3 mt-4">
              {property.userPhoto && (
                <img
                  src={property.userPhoto}
                  alt="user"
                  className="w-10 h-10 rounded-full border-2 border-white/50"
                />
              )}
              <div>
                <p className="font-semibold">{property.userName}</p>
                <p className="text-sm text-white/80">{property.userEmail}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6">Ratings & Reviews</h3>

          <form
            onSubmit={handleReview}
            className="bg-white/20 backdrop-blur-md p-6 rounded-2xl mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
                className="w-20 text-black px-3 py-2 rounded-lg focus:outline-none"
              />
              <input
                type="text"
                placeholder="Write your review..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                className="flex-1 px-3 py-2 rounded-lg text-black focus:outline-none"
              />
              <button
                type="submit"
                className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg hover:bg-indigo-100 transition"
              >
                Submit
              </button>
            </div>
          </form>

          {reviews.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((review, i) => (
                <div
                  key={i}
                  className="bg-white/10 border border-white/20 p-5 rounded-2xl shadow-md hover:bg-white/20 transition"
                >
                  <div className="flex items-center gap-3 mb-2">
                    {review.reviewerPhoto && (
                      <img
                        src={review.reviewerPhoto}
                        alt="reviewer"
                        className="w-10 h-10 rounded-full border border-white/30"
                      />
                    )}
                    <div>
                      <p className="font-medium">{review.reviewerName}</p>
                      <p className="text-sm text-white/70">
                        ⭐ {review.rating} / 5
                      </p>
                    </div>
                  </div>
                  <p className="text-white/90">{review.reviewText}</p>
                  <p className="text-xs text-white/60 mt-2">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/80">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
