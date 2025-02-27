import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Nav from "@/Component/Header/Nav";
import Calltoaction from "@/Component/Web/Calltoaction";
import { Footer } from "@/Component/Footer/Footer";

const Career = () => {
  const data1 = [
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

  const [currentdata, setCurrentData] = useState(data1[0]);
  const [fade, setFade] = useState(true); // State for fade-in effect

  const handleSectionClick = (newData) => {
    if (newData.title !== currentdata.title) {
      setFade(false); // Start fade-out effect
      setTimeout(() => {
        setCurrentData(newData);
        setFade(true); // Start fade-in effect
      }, 300); // Wait for fade-out to complete
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

  const data = [
    { id: 1, images: "/image/ab.webp" },
    { id: 2, images: "/image/ab.webp" },
    { id: 3, images: "/image/ab.webp" },
  ];

  const texts = [
    "Awesome ",
    "Front-End Developer",
    "Back-End Developer",
    "Designer",
    "Full Stack Developer",
  ];
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);

  // Effect to handle typing text letter by letter
  useEffect(() => {
    if (letterIndex < texts[index].length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + texts[index][letterIndex]);
        setLetterIndex(letterIndex + 1);
      }, 100); // Speed of typing, 100ms per letter
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        // Move to the next word after a short delay
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setCurrentText("");
        setLetterIndex(0);
      }, 2000); // Delay before typing the next word
      return () => clearTimeout(timeout);
    }
  }, [letterIndex, index, texts]);

  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    appliedFor: "",
    resume: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add backend logic here to handle the form submission.
    setShowPopup(false); // Close the popup after submission.
  };

  return (
    <>
      <div className="  sticky w-full z-[19] top-0 ">
        <Nav />
      </div>
      <div className=" bg-background md:py-6">
        <div className=" container-wrapper md:pt-24 pt-24  ">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6    items-center">
            <div className=" ">
              <h2 className="text-xl md:text-3xl text-heading  font-semibold">
                Digital Consulting Agency
              </h2>
              <h2 className="md:text-lg text-sm  pt-2 font-semibold">
                Get A Job That Fits Your Life.
              </h2>
              <div>
                <h1 className="md:text-3xl text-2xl py-4">
                  <span className="font-semibold"> Are </span> You a
                  <div className="text-primary font-semibold">
                    {currentText} |
                  </div>
                </h1>
              </div>

              <div className="mt-6">
                <button className=" border border-orange-500  hover:text-primary hover:bg-white  py-2 md:py-3 px-4 md:px-5 rounded-xl bg-primary text-white">
                  Connect Now
                </button>
                {/* <button className="ml-4 border border-orange-500  text-primary  py-2 md:py-3 px-4 md:px-5 rounded-xl hover:bg-primary hover:text-white">
                Connect Now
              </button> */}
              </div>
            </div>

            {/* Carousel Section */}
            <div className="pt-6 lg:pt-5">
              <Carousel
                showThumbs={false}
                autoPlay
                interval={3000}
                infiniteLoop
                showStatus={false}
                showArrows={false}
                showIndicators={false}
                dynamicHeight={true}
                swipeable={true}
                stopOnHover={true}
                emulateTouch={true}
                onChange={(index) => console.log(`Active index: ${index}`)}
                renderArrowPrev={(onClickHandler, hasPrev) =>
                  hasPrev && (
                    <button
                      className="arrow-circle left-arrow"
                      onClick={onClickHandler}
                    >
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                  )
                }
                renderArrowNext={(onClickHandler, hasNext) =>
                  hasNext && (
                    <button
                      className="arrow-circle right-arrow"
                      onClick={onClickHandler}
                    >
                      <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                  )
                }
              >
                {data.map((item) => (
                  <div key={item.id}>
                    <Image
                      src={item.images}
                      alt={`Image ${item.id}`}
                      className="w-full h-auto rounded-lg"
                      height={500}
                      width={500}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-white   py-10">
        <div className="w-full my-5  grid place-items-center">
          <div className="grid place-items-center">
            <h1 className="text-center text-lg md:text-3xl md:w-full  w-56  text-heading lg:text-3xl tracking-wide font-semibold">
              Work For Your
              <span className="text-gradient"> Incredible Success</span>
            </h1>
          </div>
        </div>

        <div className="flex px-1 justify-around md:max-w-4xl mx-auto border py-3 bg-white rounded-full shadow-xl">
          {data1?.map((data, index) => (
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
      <div className="w-full py-5 grid place-items-center">
        <div className="grid place-items-center">
          <p className="mt-4 text-center text-sm md:text-lg lg:text-xl">
            We are excited to announce new opportunities for growth.
            <br />
            <span className="font-medium text-gradient">
              We are Hiring!
            </span>{" "}
            Join our team to make an impact.
          </p>
          <button
            className="mt-5 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            onClick={() => setShowPopup(true)}
          >
            Send Resume
          </button>
        </div>

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
              {/* Cancel button with icon */}
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-500 text-xl hover:text-gray-700"
                onClick={() => setShowPopup(false)}
              >
                <FontAwesomeIcon icon={faXmarkCircle} />
              </button>

              {/* Modal Content */}
              <h2 className="text-xl font-semibold mb-4">Submit Your Resume</h2>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  required
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="appliedFor"
                  placeholder="Position Applied For"
                  required
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={formData.appliedFor}
                  onChange={handleInputChange}
                />
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  required
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  onChange={handleFileChange}
                />
                <div className="flex justify-end gap-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* call too action  */}
      <div>
        <Calltoaction />
      </div>
      {/* footer section here  */}
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Career;
