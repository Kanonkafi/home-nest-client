import { Quote } from "lucide-react";

const CustomerStories = () => {
  const stories = [
    {
      id: 1,
      name: "Ariful Islam",
      location: "Dhaka",
      review:
        "Finding a perfect flat in Dhaka was so stressful, but HomeNest made it super easy! The agents were supportive and gave the highest level of service!",
      highlight: "highest level",
      img: "https://i.ibb.co.com/xqM6pSH8/arifu.webp",
    },
    {
      id: 2,
      name: "Farhana Akter",
      location: "Chattogram",
      review:
        "HomeNest verified every property before showing me. No tension at all! I felt completely safe and satisfied!",
      highlight: "completely safe",
      img: "https://i.ibb.co.com/9HxBd8Nn/farhana.jpg",
    },
    {
      id: 3,
      name: "Mahmud Hasan",
      location: "Sylhet",
      review:
        "Great experience! Quick response, honest guidance & smooth paperwork. Truly recommended for home buyers!",
      highlight: "Truly recommended",
      img: "https://i.ibb.co.com/HD3YvfP9/mahmud.jpg",
    },
    {
      id: 4,
      name: "Nusrat Jahan",
      location: "Rajshahi",
      review:
        "The team understands customer needs very well. They helped me rent the perfect home in just 2 days!",
      highlight: "perfect home",
      img: "https://i.ibb.co.com/6RMCWZwJ/khadiza.jpg",
    },
  ];

  return (
    <section className="py-10 bg-gradient-to-br from-[#0a0731] via-[#0d0b45] to-[#1a1458] rounded-2xl">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          What Our Clients Say
        </h2>
        <p className="text-gray-300 mt-2">Trusted all over Bangladesh</p>
      </div>

      <div className="grid max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {stories.map((s) => (
          <div
            key={s.id}
            className="rounded-3xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl
            hover:scale-[1.03] hover:shadow-[0_0_25px_#7b38ff] transition duration-300 group"
          >
            <Quote className="w-10 h-10 text-purple-300 mb-5" />

            <p className="text-gray-200 text-sm mb-6 leading-relaxed">
              {s.review.split(s.highlight)[0]}
              <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent font-semibold">
                {s.highlight}
              </span>
              {s.review.split(s.highlight)[1]}
            </p>

            <div className="flex items-center gap-4">
              <img
                src={s.img}
                className="w-12 h-12 rounded-full border-2 border-purple-500 shadow-md"
                alt={s.name}
              />
              <div>
                <h4 className="font-semibold text-white">{s.name}</h4>
                <p className="text-sm text-gray-400">{s.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerStories;
