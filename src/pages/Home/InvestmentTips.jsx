import { Lightbulb, TrendingUp, Building2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// ✅ Testimonials Data
const customers = [
  {
    id: 1,
    name: "Rafiul Islam",
    feedback:
      "Buying a home in Bashundhara felt so easy and safe with HomeNest!",
    img: "https://i.ibb.co.com/whY82WcN/rafiul.jpg",
  },
  {
    id: 2,
    name: "Tahmina Akter",
    feedback: "Affordable verified properties — highly recommended!",
    img: "https://i.ibb.co.com/MyDRz1HG/tahmina.jpg",
  },
  {
    id: 3,
    name: "Sakib Hasan",
    feedback:
      "Trusted agents with detailed guidance. Loved the experience!",
    img: "https://i.ibb.co.com/7dJGWzMk/sakib.jpg",
  },
  {
    id: 4,
    name: "Farzana Rahman",
    feedback:
      "Professional support & modern system — safest real estate platform!",
    img: "https://i.ibb.co.com/Q3L5GCGL/farzana.jpg",
  },
];

const InvestmentTips = () => {
  const tips = [
    {
      id: 1,
      title: "Invest in Growth Zones",
      desc: "Areas like Purbachal, Bashundhara & Uttara are rising fast.",
      icon: <TrendingUp className="w-10 h-10 text-cyan-400" />,
    },
    {
      id: 2,
      title: "Verify Legal Papers",
      desc: "Rajuk-approved property ensures long-term safety.",
      icon: <Lightbulb className="w-10 h-10 text-orange-400" />,
    },
    {
      id: 3,
      title: "Look for Mega Projects",
      desc: "Govt. and Private future development boosts ROI.",
      icon: <Building2 className="w-10 h-10 text-purple-400" />,
    },
  ];

  const projects = [
    "Purbachal Smart City – 2026",
    "Bashundhara D Block Expansion – 2025",
    "Metro Rail Zone Housing – 2027",
  ];

  return (
    <section className="py-20 bg-gray-900 text-white rounded-2xl">
      <div className="w-11/12 mx-auto">
        {/*  Smart Investment Section */}
        <h2 className="text-3xl md:text-4xl text-center font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Smart Investment Tips
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {tips.map((t) => (
            <div
              key={t.id}
              className="border border-cyan-400/30 bg-white/5 p-8 rounded-xl text-center transition-transform duration-300 hover:scale-105"
            >
              <div className="flex justify-center mb-3">{t.icon}</div>
              <h3 className="font-semibold text-lg">{t.title}</h3>
              <p className="text-gray-300 text-sm mt-2">{t.desc}</p>
            </div>
          ))}
        </div>

        {/*  Projects */}
        <h3 className="text-2xl font-bold mt-16 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
          Upcoming Projects in Bangladesh 
        </h3>

        <ul className="mt-5 space-y-3 text-gray-300">
          {projects.map((p, i) => (
            <li key={i} className="flex items-center gap-3 ">
              {p}
            </li>
          ))}
        </ul>

        {/*  Testimonials Slider */}
        <h3 className="text-2xl font-bold mt-16 bg-gradient-to-r from-indigo-300 to-pink-300 bg-clip-text text-transparent text-center">
           Our employers Say 
        </h3>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 2500 }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mt-10 pb-10"
        >
          {customers.map((c) => (
            <SwiperSlide key={c.id}>
              <div
                className="bg-white/10 p-6 rounded-xl border border-indigo-400/30 text-center transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={c.img}
                  className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-indigo-300"
                />
                <h4 className="font-semibold text-lg">{c.name}</h4>
                <p className="text-gray-300 text-sm mt-2">“{c.feedback}”</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default InvestmentTips;
