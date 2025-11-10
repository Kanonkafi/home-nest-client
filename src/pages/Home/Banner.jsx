import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

//from (assets folder)
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import banner4 from "../../assets/banner4.jpg";
import banner5 from "../../assets/banner5.jpg";
import banner6 from "../../assets/banner6.jpg";

const slides = [
  {
    id: 1,
    image: banner1,
    title: "Find Your Dream Home",
    subtitle: "Discover modern apartments and luxurious villas tailored for you.",
  },
  {
    id: 2,
    image: banner2,
    title: "Elegant Living Awaits",
    subtitle: "Experience elegance, comfort, and peace in every corner.",
  },
  {
    id: 3,
    image: banner3,
    title: "Your Space, Your Style",
    subtitle: "Choose homes that reflect your lifestyle and personality.",
  },
  {
    id: 4,
    image: banner4,
    title: "Luxury Beyond Walls",
    subtitle: "From interiors to ambiance — live where elegance breathes.",
  },
  {
    id: 5,
    image: banner5,
    title: "Smart Homes for Smart Living",
    subtitle: "Sustainable, tech-enabled, and built for your convenience.",
  },
  {
    id: 6,
    image: banner6,
    title: "Invest in Your Future",
    subtitle: "Explore premium real estate opportunities across Bangladesh.",
  },
];

const Banner = () => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true, 
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-[40vh] md:h-[70vh] flex items-center justify-center bg-cover bg-center transition-all duration-500"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

              <div className="relative z-10 text-center text-white px-6">
                <h2
                  className="text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg"
                >
                  {slide.title}
                </h2>
                <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto">
                  {slide.subtitle}
                </p>
                <button className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 transition px-8 py-3 rounded-lg font-semibold shadow-lg">
                  Explore Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
