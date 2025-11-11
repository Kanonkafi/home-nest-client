import { ShieldCheck, Home, DollarSign, Headset } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: "Trusted Agents",
      desc: "We connect you with reliable and experienced real estate agents.",
      icon: <ShieldCheck className="w-10 h-10 text-indigo-400 drop-shadow-[0_0_12px_#6366f1]" />,
    },
    {
      id: 2,
      title: "Verified Properties",
      desc: "Buy or rent from fully verified & legally approved listings.",
      icon: <Home className="w-10 h-10 text-purple-400 drop-shadow-[0_0_12px_#a855f7]" />,
    },
    {
      id: 3,
      title: "Easy Transactions",
      desc: "Smooth property deals with zero hidden charges.",
      icon: <DollarSign className="w-10 h-10 text-pink-400 drop-shadow-[0_0_12px_#ec4899]" />,
    },
    {
      id: 4,
      title: "24/7 Support",
      desc: "Our team is always ready to assist with any queries.",
      icon: <Headset className="w-10 h-10 text-indigo-300 drop-shadow-[0_0_12px_#818cf8]" />,
    },
  ];

  return (
    <section className="py-10 bg-gradient-to-br from-[#06251a] via-[#7a3494] to-[#581458] rounded-2xl">
      <div className="w-11/12 mx-auto text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Why Choose HomeNest?
        </h2>

        <p className="mt-3 text-gray-300 text-sm md:text-base max-w-lg mx-auto">
          We make your real estate journey seamless and secure.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="rounded-2xl p-8 bg-white/10 backdrop-blur-lg border border-white/20
              hover:scale-105 hover:shadow-[0_0_20px_#7b38ff] transition transform duration-300"
            >
              <div className="flex justify-center mb-5">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>

              <p className="text-gray-300 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Button */}
        <button className="mt-14 bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-95 transition px-10 py-3 rounded-xl font-semibold shadow-[0_0_20px_#7b38ff] text-white">
          Explore Now
        </button>

      </div>
    </section>
  );
};

export default WhyChooseUs;
