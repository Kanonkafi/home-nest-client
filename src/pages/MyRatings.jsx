import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";


const MyRatings = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetch(`https://home-nest-api-server.vercel.app/my-reviews?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reverse());
        setLoading(false);
      });
  }, [user]);

  if (loading)
    return (
      <div className="text-center py-20 text-gray-600">Loading your ratings...</div>
    );

  return (
    <div className="min-h-fit bg-gradient-to-r from-green-400 via-purple-500 to-pink-400  py-16 px-4 md:px-8 rounded-2xl">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-10">
          My Ratings & Reviews
        </h2>

        {reviews.length === 0 ? (
          <p className="text-center text-white/80">You haven’t added any reviews yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 text-white hover:bg-white/20 transition-all"
              >
                <img
                  src={review.propertyImage || "https://via.placeholder.com/400x250"}
                  alt="property"
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold mb-1">
                  {review.propertyName}
                </h3>
                <p className="text-yellow-300 font-medium mb-1">
                  ⭐ {review.rating}/5
                </p>
                <p className="text-white/90 text-sm mb-2">{review.reviewText}</p>
                <p className="text-xs text-white/70">
                  Reviewed on {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRatings;
