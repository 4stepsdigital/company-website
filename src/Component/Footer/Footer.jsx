// import React from "react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFacebookF,
//   faYoutube,
//   faLinkedinIn,
//   faInstagram,
// } from "@fortawesome/free-brands-svg-icons";
// import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import Link from "next/link";
// import Image from "next/image";
// export const Footer = () => {
//   return (
//     <>
//       <div className="">
//         {/* gpt response */}

//         {/* Company Info */}
//         <div className=" bg-gray-100  text-sm p-6 flex flex-col lg:flex-row items-center justify-between">
//           <div className="lg:w-1/2  mb-4 lg:mb-0">
//             <Image
//               src="/image/logo.png"
//               alt="App Store"
//               height={200}
//               width={200}
//               className="w-20 h-16"
//             />
//             <p className=" md:text-sm text-[13px]">
//               Four Steps Digital Consulting(OPC) Pvt Ltd, an Indian digital
//               consulting agency, prioritizes honesty, hard work, and results for
//               small to medium-sized businesses. Our focus: Transforming
//               Businesses Into Digitally-Driven Organizations with expert teams
//               optimizing digital presence and efficiency.
//             </p>
//           </div>
//           <div className="flex items-center justify-center lg:justify-end space-x-6">
//             <div className="text-center">
//               <p className="font-semibold ">Zoho Partners</p>
//               <div className="flex space-x-4">
//                 <div className="flex justify-center mt-2">
//                   <Image
//                     src="/image/zoohoo.png"
//                     alt="Logo"
//                     className="h-[65px] w-full"
//                     height={500}
//                     width={500}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="text-center">
//               <p className="font-semibold mb-2">HubSpot Partners</p>
//               <div className="flex justify-center mt-2">
//                 <Image
//                   src="/image/hh.png"
//                   alt="Logo"
//                   className="h-[65px] w-full"
//                   height={500}
//                   width={500}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="container mx-auto px-4 lg:px-0">
//           <div className="bg-white grid grid-cols-1 md:grid-cols-2 py-4  px-4 lg:grid-cols-5 gap-4">
//             {/* Useful Links */}
//             <div className="border-r border-gray-300">
//               <h3 className="text-base  font-semibold mb-2">Useful Links</h3>

//               <ul className="space-y-2 text-sm list-none">
//                 <li className="footerHover relative">
//                   <Link href="/about" className="relative items-center">
//                     <span className="icon-circle">
//                       <FontAwesomeIcon icon={faAngleRight} />
//                     </span>
//                     About
//                   </Link>
//                 </li>
//                 <li className="footerHover relative">
//                   <Link
//                     href="/contact/contact"
//                     className="relative items-center"
//                   >
//                     <span className="icon-circle">
//                       <FontAwesomeIcon icon={faAngleRight} />
//                     </span>
//                     Contact
//                   </Link>
//                 </li>
//                 <li className="footerHover relative">
//                   {/* hold and cheak proper case studies  */}
//                   <Link href="/case-study" className="relative items-center">
//                     <span className="icon-circle">
//                       <FontAwesomeIcon icon={faAngleRight} />
//                     </span>
//                     Case Study
//                   </Link>
//                 </li>
//                 <li className="footerHover relative">
//                   <Link href="/#blog" className="relative items-center">
//                     <span className="icon-circle">
//                       <FontAwesomeIcon icon={faAngleRight} />
//                     </span>
//                     Blog
//                   </Link>
//                 </li>
//                 <li className="footerHover relative">
//                   <Link href="/#training" className="relative items-center">
//                     <span className="icon-circle">
//                       <FontAwesomeIcon icon={faAngleRight} />
//                     </span>
//                     Training
//                   </Link>
//                 </li>
//                 <li className="footerHover relative">
//                   <Link href="/#webinar" className="relative items-center">
//                     <span className="icon-circle">
//                       <FontAwesomeIcon icon={faAngleRight} />
//                     </span>
//                     Webinar
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             {/* Our Services  */}
//             <div className="border-r border-gray-300">
//               <h3 className="text-base  font-semibold mb-2 ">Our Services</h3>
//               <ul className="space-y-2  text-sm cursor-pointer list-none">
//                 <li className="footerHover relative hover:text-primary">
//                   <Link href="/websitepage" className=" relative">
//                     Website Development
//                   </Link>
//                 </li>
//                 <li className="footerHover relative hover:text-primary">
//                   <Link href="/zoho" className=" relative">
//                     Zoho Services
//                   </Link>
//                 </li>
//                 <li className="footerHover relative hover:text-primary">
//                   <Link href="/zohoCrm" className=" relative">
//                     Zoho Industry Solution
//                   </Link>
//                 </li>
//                 <li className="footerHover relative hover:text-primary">
//                   <Link href="/digital" className=" relative">
//                     Digital Marketing
//                   </Link>
//                 </li>
//                 <li className="footerHover relative hover:text-primary">
//                   <Link href="/hubspotIndex" className=" relative">
//                     Hubspot Services
//                   </Link>
//                 </li>
//                 <li className="footerHover relative hover:text-primary">
//                   <Link href="zohoCrm" className=" relative">
//                     Other Crm Services
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Our Services */}
//             <div className="border-r border-gray-300">
//               <h3 className="text-base  font-semibold mb-2">
//                 other content ......
//               </h3>
//               <ul className="text-sm  space-y-2 list-none">
//                 <li>Zoho Setup and Implementation</li>
//                 <li>Hubspot Setup and Implementation</li>
//                 <li>Bitrix24 Services</li>
//                 <li>Salesforce Services</li>
//               </ul>
//             </div>

//             {/* Website Development */}
//             <div className="border-r border-gray-300">
//               <h3 className="text-base  font-semibold mb-2">
//                 Website Development
//               </h3>
//               <ul className="space-y-2 text-sm list-none ">
//                 <li className="footerHover relative hover:text-primary">
//                   <Link href="#" className=" relative">
//                     CMS Web Development
//                   </Link>
//                 </li>
//                 <li className="footerHover relative hover:text-primary">
//                   <Link href="#" className=" relative">
//                     Custom Web Development
//                   </Link>
//                 </li>
//                 <li className="footerHover relative hover:text-primary">
//                   <Link href="#" className=" relative">
//                     E-Commerce Store
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* General Queries & Social Links */}
//             <div>
//               <h3 className="text-base  font-semibold mb-2">General Queries</h3>
//               <div className=" text-sm">
//                 <p>Email: info@4stepsdigital.com</p>
//                 <p>Phone: +91-9065879989</p>
//               </div>
//               <h3 className="text-base  font-semibold mt-4 mb-2">
//                 Social Media Links
//               </h3>

//               <div className="flex space-x-1">
//                 <a
//                   href="#"
//                   className="flex items-center justify-center w-7 h-7 rounded-full border-blue-600   border text-blue-600   transition duration-200   hover:bg-blue-500 hover:text-white"
//                 >
//                   <FontAwesomeIcon icon={faFacebookF} />
//                 </a>
//                 <a
//                   href="#"
//                   className="flex items-center justify-center w-7 h-7 rounded-full  border border-red-500 text-red-600 transition duration-200   hover:bg-red-500 hover:text-white"
//                 >
//                   <FontAwesomeIcon icon={faYoutube} />
//                 </a>
//                 <a
//                   href="#"
//                   className="flex items-center justify-center w-7 h-7 rounded-full border border-blue-400 text-blue-800  transition duration-200  hover:bg-blue-500 hover:text-white"
//                 >
//                   <FontAwesomeIcon icon={faLinkedinIn} />
//                 </a>
//                 <a
//                   href="#"
//                   className="flex items-center justify-center w-7 h-7 rounded-full border border-pink-600 text-pink-600  transition duration-200   hover:bg-pink-500 hover:text-white"
//                 >
//                   <FontAwesomeIcon icon={faInstagram} />
//                 </a>
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-gray-700 py-4 pl-2 text-xs md:text-sm">
//             <p>
//               Copyright © 2024 Four Steps Digital Consulting(OPC) Pvt Ltd. All
//               Rights Reserved.
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faYoutube,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  const [industryNames, setIndustryNames] = useState([]);
  const [error, SetError] = useState(null);

  const [service, setService] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchService = async () => {
      const response = await fetch("/api/service/get-title");
      const data = await response.json();
      console.log("Fetched Data--------->:", data); // Logging the data

      setService(data);
    };
    fetchService();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/solution/get-title");
        if (!response.ok) {
          console.error("Failed to fetch data");
          return;
        }
        const result = await response.json();
        // console.log("Fetched Data--------->:", result); // Logging the data
        setData(result);
        setData(result.slice(0, 6));
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const fetchIndustries = async () => {
    try {
      const response = await fetch("/api/industry/industry-hero");
      const result = await response.json();
      if (result.data && Array.isArray(result.data)) {
        const names = result.data.map((item) => item.industryName);
        setIndustryNames(names);
        setIndustryNames(names.slice(0, 7));
      } else {
        console.error("Invalid response format:", result);
      }
    } catch (error) {
      console.error("Error fetching industries:", error);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  return (
    <div>
      <footer className=" bg-gray-800 text-white py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 px-4">
          {/* Logo Section */}
          <div className="col-span-2">
            <div className="lg:w-1/2  mb-4 lg:mb-0">
              <Image
                src="/image/logo2.png"
                alt="App Store"
                height={200}
                width={200}
                className="w-20 h-[68px]"
              />
            </div>

            <p className=" md:text-sm pr-3 text-[13px]">
              Four Steps Digital Consulting(OPC) Pvt Ltd, an Indian digital
              consulting agency, prioritizes honesty, hard work, and results for
              small to medium-sized businesses. Our focus: Transforming
              Businesses Into Digitally-Driven Organizations with expert teams
              optimizing digital presence and efficiency.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-2">Useful Links</h3>
            <ul className="space-y-1 list-none text-sm">
              <li>
                <Link href="/about" className="hover:text-gray-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Alliance
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Referral Partner
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Training
                </Link>
              </li>
              <li>
                <Link href="/career" className="hover:text-gray-300">
                  Career
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-2">Resources</h3>
            <ul className="space-y-1 list-none text-sm">
              <li>
                <Link href="/resource/product" className="hover:text-gray-300">
                  Product
                </Link>
              </li>
              <li>
                <Link href="/resource/webinar" className="hover:text-gray-300">
                  Webinar
                </Link>
              </li>
              <li>
                <Link
                  href="/resource/demo-videos"
                  className="hover:text-gray-300"
                >
                  Demos & Video
                </Link>
              </li>
              <li>
                <Link href="/resource/blog" className="hover:text-gray-300">
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  href="/resource/case-studies"
                  className="hover:text-gray-300"
                >
                  Case Study
                </Link>
              </li>
            </ul>
          </div>
          {/* Industry */}

          <div>
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-2">Industries</h3>
              <ul className="space-y-1 list-none text-sm">
                {industryNames.length > 0 ? (
                  industryNames.map((name, index) => (
                    <li key={index}>
                      <Link
                        href={`/industry/${name?.split(" ").join("-")}`}
                        className="hover:text-gray-300"
                      >
                        {name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>Loading industries...</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 mt-16 px-4">
          {/* partners 1 */}
          <div>
            <div className="">
              <p className="font-semibold">Zoho Authorized Partner</p>
              <div className="flex space-x-4">
                <div className="flex justify-center mt-2">
                  <Image
                    src="/image/auth.png"
                    alt="Logo"
                    className="h-full w-full object-cover"
                    height={500}
                    width={500}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* partners2 */}
          <div>
            <div className="">
              <p className="font-semibold">Bitrix Partners</p>
              <div className="flex">
                <Image
                  src="/image/24.png"
                  alt="Logo"
                  className="object-contain rounded-2xl md:h-[88px] h-auto w-full"
                  height={200}
                  width={200}
                />
              </div>
            </div>
          </div>

          {/* Our Services */}
          <div>
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-2">Our Services </h3>
              <div className="cursor-pointer space-y-1 list-none text-sm">
                {service?.map((item, index) => (
                  <Link
                    key={index}
                    href={`/services/${item?.title?.split(" ").join("-")}`}
                    className="hover:text-gray-300"
                  >
                    <li>{item?.title}</li>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* Solution */}
          <div>
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-2">Solution</h3>
              <div className="cursor-pointer space-y-1 list-none text-sm">
                {data && data.length > 0 ? (
                  data.map((item, index) => (
                    <Link
                      key={index}
                      href={`/solution/${item?.title?.split(" ").join("-")}`}
                      className="hover:text-gray-300"
                    >
                      <li>{item?.title}</li>
                    </Link>
                  ))
                ) : (
                  <p>Solution not present</p>
                )}
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="col-span-1">
            <div>
              <h3 className="text-base  font-semibold mb-2">General Queries</h3>
              <div className=" text-sm">
                <p>Email: info@4stepsdigital.com</p>
                <p>Phone: +91-9065879989</p>
              </div>
              <h3 className="text-base  font-semibold mt-4 mb-2">
                Social Media Links
              </h3>

              <div className="flex space-x-1">
                <Link
                  href="#"
                  className="flex items-center justify-center w-8 h-8 rounded-full    transition duration-200   bg-blue-500 text-white"
                >
                  <FontAwesomeIcon icon={faFacebookF} className="text-lg" />
                </Link>
                <Link
                  href="#"
                  className="flex items-center justify-center w-8 h-8 rounded-full  transition duration-200  bg-red-500 text-white"
                >
                  <FontAwesomeIcon icon={faYoutube} className="text-lg" />
                </Link>
                <Link
                  href="#"
                  className="flex items-center justify-center w-8 h-8 rounded-full  transition duration-200 bg-blue-500 text-white"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} className="text-lg" />
                </Link>
                <Link
                  href="#"
                  className="flex items-center justify-center w-8 h-8 rounded-full  transition duration-200 bg-pink-500 text-white"
                >
                  <FontAwesomeIcon icon={faInstagram} className="text-lg" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-7 border-t  md:text-center md:text-sm text-xs justify-center border-gray-700 pt-6 ">
          <p className=" md:pl-0 pl-2">
            © {new Date().getFullYear()}
            Consulting(OPC) Pvt Ltd. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
