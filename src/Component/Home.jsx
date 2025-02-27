import React, { useEffect } from "react";
import Count from "./Counter/Count";
import Testimonial from "./Testimonial/Testimonial";
import Client from "./Client/Client";
import Faq from "./FAQ/Faq";
import Team from "./Team/Team";
import ContactUs from "./Contact/ContactUs";
import { Footer } from "./Footer/Footer";
import Industry from "./Industry/Industry";
import AboutSection from "./About/AboutSection";
import HeroSection from "./Herosection/HeroSection";
import ChooseUs from "./ChooseUs/ChooseUs";
import Case from "./CaseStudies/Case";
import AOS from "aos";
import "aos/dist/aos.css";
import Nav from "./Header/Nav";
import Calltoaction from "./Web/Calltoaction";
import BackToTop from "./Web/BackToTop";
import Partners from "./Web/Partners";
// import Trail from "./Trail";
import Solution from "./Web/Solution";
import ServicesScienceSoft from "./Service/ServicesScienceSoft";
import TechUse from "./Web/TechUse";

const Home = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      // disable: "phone",
      duration: 1000,
      easing: "ease-out-cubic",
    });
  }, []);
  return (
    <div>
      {/* <Trail /> */}
      <Nav />
      <BackToTop />
      <HeroSection />
      <Count />
      <Partners />
      <AboutSection />
      <ServicesScienceSoft />
      <ChooseUs />
      <Industry />
      <Solution />
      <div data-aos="fade-up">
        <Team />
      </div>
      {/* <Client /> */}
      <TechUse />
      <Case />
      <Calltoaction />
      <Testimonial />
      <Faq />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Home;
