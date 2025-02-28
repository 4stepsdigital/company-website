import React from "react";
import {
  faWhatsapp,
  faFacebook,
  faYoutube,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faLeaf,
  faPhone,
  faEnvelope,
  faFile,
  faEarth,
  faLocationDot,
  faHouse,
  faPhoneSquare,
} from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import { Footer } from "@/Component/Footer/Footer";
import Testimonial from "@/Component/Testimonial/Testimonial";
import Nav from "@/Component/Header/Nav";
import Image from "next/image";
import Head from "next/head";

const Contact = () => {
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.910862140821!2d77.51411137505966!3d28.48223097574713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ceb07a0270cf1%3A0xef3dde7c7ebbe43e!2sFour%20Steps%20Digital%20Consulting%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1723887840924!5m2!1sen!2sin`;
  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>Contact Us | Four Steps Digital Consulting Pvt Ltd</title>
        <meta
          name="description"
          content="Are you looking for a digital consulting agency in Delhi NCR? Four Steps Digital offers affordable digital marketing and Business Automation consulting."
        />
        <meta
          name="keywords"
          content="Contact, Support, Next.js App, Get in Touch"
        />
        <meta name="author" content="My Awesome Next.js App Team" />
        <meta
          property="og:title"
          content="Contact Us | Four Steps Digital Consulting Pvt Ltd"
        />
        <meta
          property="og:description"
          content="We'd love to hear from you. Reach out for support or collaboration!"
        />
        <meta
          property="og:description"
          content="Are you looking for a digital consulting agency in Delhi NCR? Four Steps Digital offers affordable digital marketing and Business Automation consulting."
        />
        <meta
          property="og:url"
          content="https://4stepsdigital.com/contact-us/"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://4stepsdigital.com/contact-us/"
        />
        <meta
          property="article:publisher"
          content="https://www.facebook.com/4stepsmarketing"
        />
        <meta
          property="og:image"
          content="https://img.freepik.com/free-vector/contact-us-concept-illustration_114360-2299.jpg"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Open Graph Meta Tags */}
      </Head>

      {/* navbar */}
      <div>
        <Nav />
      </div>

      <div className=" bg-background w-full h-auto md:mb-0 mb-4 md:h-[80vh]">
        <div className=" container-wrapper">
          <div className="flex justify-center  items-center ">
            <div className="grid grid-cols-1  pt-24 md:pt- md:grid-cols-2 gap-8  ">
              {/* Content Section */}
              <div className="flex flex-col justify-center  md:text-left space-y-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl  md:text-[40px] text-[26px] font-semibold text-heading">
                  Contact Page
                </h2>
                <p className="text-primary text-sm md:text-xl font-medium">
                  We are here to help
                </p>
                <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                  we are here to help! Whether you have a question about your
                  booking, need assistance with your travel plans, or just want
                  to know more about our services, feel free to get in touch
                  with us.
                </p>
                <Link href="#">
                  <button className="mt-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold md:py-2.5 py-1.5 md:px-4 px-3 rounded text-sm">
                    Explore Now
                  </button>
                </Link>
              </div>

              {/* Image Section */}
              <div className="flex justify-center md:justify-end  items-center ">
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

      <div className=" p-4 bg-[#ebf7ff]">
        <div className="grid md:grid-cols-[0.5fr_1fr_0.5fr] sm:grid-cols-[1fr_1fr] gap-4">
          <div className="md:space-y-8 space-y-4 md:px-5 pt-10">
            {/* Section 1 */}
            <div className="flex items-center  space-x-4">
              <FontAwesomeIcon icon={faEarth} className="text-xl" />

              <div>
                <h3 className="text-[15px] font-semibold">Quick response</h3>
                <p className="text-xs md:text-sm text-gray-700">
                  We usually reply within 1 hour on business days to sign an NDA
                  and arrange a discussion.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faClock} className="text-xl" />
              <div>
                <h3 className="text-[15px] font-semibold">
                  Personalized approach
                </h3>
                <p className="text-xs md:text-sm text-gray-700">
                  You will engage directly with specialists who are experienced
                  in your domain.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faLeaf} className="text-xl mr-1 " />
              <div>
                <h3 className="text-[15px] font-semibold">No pressure</h3>
                <p className="text-xs md:text-sm text-gray-700">
                  We are here to explore your needs and provide guidance —
                  whenever you are ready to move forward.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white md:p-6 p-3">
            <div>
              <h2 className="md:text-2xl text-lg font-semibold mb-4">
                Lets discuss your needs!
              </h2>
              <p className="mb-4 sm:text-base lg:text-base text-xs">
                Do you have a question for our specialists, want to discuss your
                project, or learn more about our expertise? Feel free to send
                your request using the form below!
              </p>
              <form className="  rounded  md:px-0 px-2 md:pb-8 mb-4">
                <div className="mb-2 md:mb-4">
                  <textarea
                    placeholder="Kindly describe your request"
                    id="description"
                    rows="4"
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline focus:outline-1 focus:outline-blue-800 focus:shadow"
                  ></textarea>
                </div>

                <div className=" grid md:grid-cols-2  grid-cols-1 gap-5">
                  <div className=" md:mb-4">
                    <input
                      placeholder="Full Name "
                      type="text"
                      id="name"
                      className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline focus:outline-1 focus:outline-blue-800 focus:shadow"
                    />
                  </div>
                  <div className=" md:mb-4">
                    <input
                      type="text"
                      placeholder="Company"
                      id="company"
                      className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline focus:outline-1 focus:outline-blue-800 focus:shadow"
                    />
                  </div>
                  <div className=" md:mb-4">
                    <input
                      placeholder=" Work Email"
                      type="email"
                      id="email"
                      className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline focus:outline-1 focus:outline-blue-800 focus:shadow"
                    />
                  </div>
                  <div className=" md:mb-4">
                    <div className="flex">
                      <select className=" appearance-none border rounded-l py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option>+91</option>
                        <option>+92</option>
                        {/* Add more country codes as needed */}
                      </select>
                      <input
                        type="tel"
                        id="phone"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline focus:outline-1 focus:outline-blue-800 focus:shadow"
                        placeholder="00000 00000"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center  pt-5 justify-center">
                  <button
                    className="bg-primary   text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 "
                    type="button"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className=" ">
            <div className=" px-5 pb-3 md:pt-10">
              <h3 className="text-base font-semibold md:mb-2  mb-2">
                Our contacts
              </h3>

              <div className=" cursor-pointer">
                <p className="mb-1 text-blue-500">
                  <FontAwesomeIcon icon={faPhone} className="mr-2" />
                  <span className=" text-sm text-gray-500 hover:underline hover:text-blue-800">
                    +12143066837
                  </span>
                </p>
                <p className="mb-2">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="mr-1 text-blue-500"
                  />

                  <span className=" text-sm text-gray-500 hover:underline hover:text-blue-800">
                    contact@4steps.com
                  </span>
                </p>
                <p className="mb-4 ">
                  <FontAwesomeIcon
                    icon={faWhatsapp}
                    className="mr-1 text-green-500"
                  />
                  <span className=" text-sm text-gray-500 hover:underline hover:text-blue-800">
                    WhatsApp
                  </span>
                </p>
              </div>

              {/* <h3 className="text-base font-semibold md:mb-4 mb-2">
                Join our team
              </h3> */}
              {/* <p className="mb-4 cursor-pointer">
                <FontAwesomeIcon icon={faFile} className="mr-1 text-blue-500" />

                <span className=" text-sm text-gray-500 hover:underline hover:text-blue-800">
                  Upload your CV
                </span>
              </p> */}
              <h3 className="text-base font-semibold md:mb-4 mb-2">
                Social media
              </h3>

              <div className="flex gap-2 md:space-x-4 space-x-2">
                <Link
                  href="#"
                  className="text-red-600 flex items-center space-x-2"
                >
                  <FontAwesomeIcon
                    icon={faYoutube}
                    className="md:text-3xl text-2xl"
                  />
                </Link>
                <Link
                  href="#"
                  className="text-blue-800 flex items-center space-x-2"
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="md:text-3xl text-2xl"
                  />
                </Link>
                <Link
                  href="#"
                  className="text-black flex items-center space-x-2"
                >
                  <FontAwesomeIcon
                    icon={faXTwitter}
                    className="md:text-3xl text-2xl"
                  />
                </Link>
                <Link
                  href="#"
                  className="text-blue-600 flex items-center space-x-2"
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="md:text-3xl text-2xl"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" mx-auto p-5 cursor-pointer">
        {/* Contact Information */}
        <div className="md:p-10 py-5">
          <h3 className="md:text-3xl text-2xl font-semibold text-center md:mb-4">
            Get In
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Touch
            </span>
          </h3>
          <p className="leading-6 md:text-lg text-sm text-center mb-10">
            We will contact you again after receiving your request within 24
            hours.
          </p>

          {/* Contact Details */}
          <div className="md:flex px-5 md:px-0 py-4   items-center justify-around bg-white shadow-lg border rounded-lg p md:py-8">
            <div className="flex flex-col items-center text-center">
              <p className="text-gray-500 font-medium">
                <FontAwesomeIcon
                  icon={faHouse}
                  className="text-2xl text-blue-800 "
                />
              </p>
              <span className="md:text-base text-base font-semibold text-gray-700 hover:text-blue-500 transition">
                info@4stepsdigital.com
              </span>
            </div>
            <div className="hidden md:block border-l-2 h-10 mx-4"></div>
            <div className="flex flex-col items-center text-center mt-4 md:mt-0">
              <p className="text-gray-500 font-medium">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-2xl text-blue-800"
                />
              </p>
              <span className="md:text-base text-sm font-semibold text-gray-700 hover:text-blue-500 transition">
                T-3 A-1113, NX Byte, NX One Plot No. - 17, <br />
                Sector - Tech Zone IV, Greater Noida West, 201310
              </span>
            </div>
            <div className="hidden md:block border-l-2 h-10 mx-4"></div>
            <div className="flex flex-col items-center text-center mt-4 md:mt-0">
              <p className="text-gray-500 font-medium">
                <FontAwesomeIcon
                  icon={faPhoneSquare}
                  className="text-2xl text-blue-800 "
                />
              </p>
              <span className="md:text-base  text-sm font-semibold text-gray-700 hover:text-blue-500 transition">
                +91-9065879989
              </span>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="md:p-10 5">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="w-full h-[250px] md:h-[400px] xl:h-[500px]"
              src={mapSrc}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      <div>
        <Testimonial />
      </div>
      {/* This is our Footer section  */}
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
