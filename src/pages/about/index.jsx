import React, { useState } from "react";
import { Footer } from "@/Component/Footer/Footer";
import Team from "@/Component/Team/Team";
import Testimonial from "@/Component/Testimonial/Testimonial";
import Image from "next/image";
import Nav from "@/Component/Header/Nav";
import Head from "next/head";
const About = () => {
  const data = [
    {
      title: "Our Mission",
      content:
        "At FourSteps Digital, our mission is to provide comprehensive IT solutions that drive innovation and efficiency. We specialize in delivering tailored technology services that help businesses optimize their operations, enhance security, and scale with confidence. From cloud computing and cybersecurity to software development and IT consulting, we are dedicated to offering cutting-edge solutions that align with our clients' goals. With a focus on reliability, innovation, and customer success, FourSteps Digital is your trusted partner in navigating the complexities of today’s IT landscape. Together, we build a future where technology powers progress.",
    },
    {
      title: "Our Vision",
      content:
        "At FourSteps Digital, our vision is to be a global leader in IT solutions, driving digital innovation that empowers businesses to thrive in a rapidly evolving technological landscape. We aspire to create a world where cutting-edge technology is accessible, seamless, and transformative, enabling companies of all sizes to unlock their full potential. Through continuous innovation, exceptional service, and a commitment to excellence, we envision shaping a future where technology fuels success, fosters growth, and brings lasting positive impact to businesses and communities worldwide.",
    },
    {
      title: "Our Goal",
      content:
        "At FourSteps Digital, our goal is to deliver top-tier IT solutions that drive business success and digital transformation. We aim to provide innovative, reliable, and scalable technology services that meet the unique needs of our clients. By fostering strong partnerships, staying at the forefront of technological advancements, and maintaining a client-centric approach, we strive to empower businesses to achieve operational excellence, enhance productivity, and stay competitive in today’s dynamic market. Our ultimate goal is to be a trusted partner, guiding our clients toward sustainable growth and long-term success through strategic IT solutions.",
    },
  ];

  const [currentdata, setCurrentData] = useState(data[0]);
  const [fade, setFade] = useState(true); // State for fade-in effect

  const handleSectionClick = (newData) => {
    if (newData.title !== currentdata.title) {
      setFade(false);
      setTimeout(() => {
        setCurrentData(newData);
        setFade(true);
      }, 300);
    }
  };

  const formatFirstFourWords = (content) => {
    const words = content.split(" ");
    const firstFourWords = words.slice(0, 3).join(" ");
    const remainingWords = words.slice(3).join(" ");
    return (
      <p className="text-md">
        <span className="font-bold italic">{firstFourWords}</span>{" "}
        {remainingWords}
      </p>
    );
  };

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>About Us |4stepsdigital</title>
        <meta
          name="description"
          content="Transform Your Business Into A Digitally-Driven Organization .We are one of the best digital consulting agency in India."
        ></meta>

        <meta
          name="keywords"
          content="About Us, Digital consulting, Company Info, Team"
        />
        <meta name="author" content="4steps digital team" />

        {/* Open Graph Meta Tags */}

        <meta
          property="og:description"
          content="Discover who we are and what drives us to create amazing experiences."
        />
        <meta property="og:url" content="https://4stepsdigital.com/about" />
        <meta property="og:type" content="website" />
      </Head>

      <div className=" sticky w-full z-[19] top-0">
        <Nav />
      </div>
      <div className="">
        {/*  hero section  */}
        <div className=" bg-background  ">
          <div className=" container-wrapper py-10">
            <div className="flex justify-center  items-center ">
              <div className="grid grid-cols-1 mt-20 md:pt-0 md:grid-cols-2 gap-8  ">
                {/* Content Section */}
                <div className="flex flex-col justify-center  text-center md:text-left space-y-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl  font-semibold text-heading">
                    About Us
                  </h2>
                  <p className="text-primary text-sm md:text-lg font-medium">
                    Tailored solutions to help your business thrive in the
                    digital era.
                  </p>
                  <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                    Since 2020, we have been delivering cutting-edge digital
                    consulting, website development, and branding strategies. At
                    Four Steps Digital, we are more than consultants—we are your
                    partners in transforming ideas into impactful results. Lets
                    turn challenges into opportunities together.
                  </p>
                </div>

                {/* Image Section */}
                <div className="flex justify-center md:justify-end items-center ">
                  <Image
                    src="/image/abouttt.png"
                    alt="About Us"
                    className="w-full max-w-sm md:max-w-md lg:max-w-lg rounded  object-cover"
                    height={500}
                    width={500}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* after hero section */}
        <div className=" bg-white">
          <div className=" container-wrapper">
            <div className="w-full  py-10">
              <div className="grid md:grid-cols-2 items-center gap-12">
                {/* Image Section */}
                <div className="flex justify-center order-2 md:order-none">
                  <Image
                    alt="Four Steps Digital"
                    src="/image/yyy.png"
                    className=""
                    height={500}
                    width={500}
                    priority
                  />
                </div>

                {/* Text Section */}
                <div className="text-center md:text-left order-1 md:order-none">
                  {/* Highlighted Tag */}
                  <div className="inline-block bg-orange-100 text-red-500 px-3 py-2 rounded-md text-xs mb-4">
                    4steps Digital
                  </div>
                  {/* Main Heading */}
                  <h1 className="text-xl lg:text-3xl text-heading font-semibold leading-snug mb-6">
                    We are born to
                    <br />
                    <span className="text-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
                      Develop Experience
                    </span>
                  </h1>
                  {/* Paragraph Content */}
                  <p className="text-gray-900 text-sm lg:text-base leading-relaxed">
                    Back in 2020, something exciting took shape in Greater Noida
                    - an agency led by the enthusiastic Mr. Amarjeet Kumar
                    Singh. They started off as <b>“4steps Marketing”</b> and
                    quickly made a name for themselves with their innovative
                    ideas. But guess what? They have grown even more since then!
                    They recently revamped their identity and are now known as
                    <b>“Four Steps Digital Consulting Pvt. Ltd.”</b> This new
                    name shows they are not just about marketing anymore - they
                    are all about helping folks navigate the digital world and
                    offering top-notch advice.
                    <br />
                    <span className="text-heading  font-semibold">
                      Zoho Consulting, HubSpot Consulting, Digital Marketing &
                      Branding, and Website Designing & Development
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" bg-background   py-10">
          <div className="w-full my-5  grid place-items-center">
            <div className="grid place-items-center">
              <h1 className="text-center text-lg md:text-3xl md:w-full  w-56  text-heading lg:text-3xl tracking-wide font-semibold">
                Work For Your
                <span className="text-gradient"> Incredible Success</span>
              </h1>
            </div>
          </div>

          <div className="flex px-1 justify-around md:max-w-4xl mx-auto border py-3 bg-white rounded-full shadow-xl">
            {data?.map((data, index) => (
              <span
                key={index}
                onClick={() => handleSectionClick(data)}
                className={`cursor-pointer flex items-center ${
                  currentdata.title === data?.title
                    ? "text-red-500"
                    : "text-zinc-800"
                }`}
              >
                <span className="text-3xl">•</span>
                <span className="ml-1 md:text-lg text-sm   font-medium ">
                  {data?.title}
                </span>
              </span>
            ))}
          </div>

          <div
            className={`w-full md:max-w-4xl my-5 h-auto mx-auto grid place-items-center px-5 text-sm md:text-base ${
              fade ? "fade-in" : "fade-out"
            }`}
          >
            {formatFirstFourWords(currentdata?.content)}
          </div>
        </div>
        {/* Team Section */}
        <div>
          <Team />
        </div>

        {/* Extra Section */}
        <div className="w-full py-5 grid place-items-center">
          <div className="grid place-items-center">
            <h1 className="text-center text-md md:text-xl lg:text-2xl tracking-wide font-semibold">
              Access your business potentials
              <br /> today & find opportunity for
              <span className="text-gradient">bigger success</span>
            </h1>
          </div>
        </div>
      </div>
      {/* this is testimonial */}

      <div>
        <Testimonial />
      </div>
      {/*footer section  */}
      <div>
        <Footer />
      </div>
    </>
  );
};

export default About;
