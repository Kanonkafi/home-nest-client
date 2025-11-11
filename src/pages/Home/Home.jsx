import Banner from "./Banner";
import CustomerStories from "./CustomerStories";
import Featured from "./Featured";
import InvestmentTips from "./InvestmentTips";
import WhyChooseUs from "./WhyChooseUs";


const Home = () => {
  return (
    <div className="w-11/12 mx-auto space-y-16">
      {/*  Banner Slider */}
      <Banner />

      {/*  Featured Section  */}
      <Featured />

      {/*  Why Choose Us */}
      <WhyChooseUs />

      {/* Extra Sections */}
     
      <CustomerStories />
       <InvestmentTips />
    </div>
  );
};

export default Home;
