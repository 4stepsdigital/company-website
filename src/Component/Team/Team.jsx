import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

const CircularProgressBar = ({ percentage, color }) => {
  const radius = 60;
  const stroke = 15;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    // percentag progress bar section
    <svg
      height={radius * 2}
      width={radius * 2}
      className="transform rotate-[-90deg]"
    >
      <circle
        stroke="#e5e7eb" // Gray background for the circle
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={color} // Dynamic stroke color
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill={color}
        fontSize="1.2rem"
        fontWeight="bold"
      >
        {`${percentage}%`}
      </text>
    </svg>
  );
};

const Team = () => {
  const fetchAllTeamMember = async () => {
    const response = await fetch("/api/team");
    return await response.json();
  };
  // for circle bar
  const [allTeamMember, setAllTeamMember] = useState([]);
  useEffect(() => {
    fetchAllTeamMember().then((res) => {
      setAllTeamMember(res || []);
    });
  }, []);

  const progressData = [
    { title: "Zoho Consulting", percentage: 90, color: "#FF8A50" },
    { title: "Website Development", percentage: 80, color: " #0d417b" },
    { title: "HubSpot Consulting", percentage: 85, color: "#CE93D8" },
    { title: "Digital Marketing", percentage: 50, color: "#81C784" },
  ];
  return (
    <div className=" w-full bg-white">
      <div className="container-wrapper mx-auto">
        {/* Team Section */}
        <div className=" py-8 ">
          <h1 className=" text-[22px] text-heading md:text-3xl font-semibold text-center md:pb-5 pb-3">
            Our Biggest Asset is Our Team
          </h1>
          <p className="text-sm md:pb-5 md:text-base leading-6 text-center pb-5 px-2 md:px-0 text-gray-700">
            Our team thrives on collaboration and is fueled by a diverse array
            of talent. We actively engage with the creative community,
            consistently seeking out whats on the horizon, and always maintain a
            positive and welcoming atmosphere.
          </p>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2 md:px-0">
            {allTeamMember?.data?.map((member) => (
              <div
                key={member?._id}
                className="w-full max-w-xs h-auto border rounded-lg shadow-md overflow-hidden bg-white"
              >
            
                <div className="w-full h-56 p-2 ">
                  <Image
                    className="w-full h-full rounded object-cover"
                    src={member?.path}
                    alt={member?.title}
                    width={500}
                    height={500}
                  />
                </div>

            
                <div className="px-2 pb-2">
                  <h3 className="font-semibold text-heading text-center text-lg">
                    {member?.name}
                  </h3>
                  <p className="text-gray-500 text-center text-sm mb-2">
                    {member?.designation}
                  </p>
                  <p className="text-gray-600 text-center text-sm line-clamp-2">
                    {member?.description}
                  </p>
                
                  <div className="flex justify-center items-center space-x-3 mt-4">
                    {member?.link1 && (
                      <a
                        href={member?.link1}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 text-2xl"
                      >
                        <FontAwesomeIcon icon={faLinkedin} />
                      </a>
                    )}
                    {member?.link2 && (
                      <a
                        href={member?.link2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-500 text-2xl"
                      >
                        <FontAwesomeIcon icon={faTwitter} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0">
            {allTeamMember?.data?.map((member) => (
              <div
                key={member?._id}
                className="w-full max-w-xs h-auto  cursor-pointer border rounded-xl shadow-lg overflow-hidden bg-gradient-to-b from-white to-gray-50"
              >
                {/* Image Section */}
                <div className="relative w-full h-56 overflow-hidden group">
                  <Image
                    className="w-full h-full p-[3px] object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-110"
                    src={member?.path}
                    alt={member?.title}
                    width={500}
                    height={500}
                  />
                </div>

                {/* Info Section */}
                <div className="px-4 py-4">
                  <h3 className="font-bold text-center text-lg text-gray-800">
                    {member?.name}
                  </h3>
                  <p className="text-gray-500 text-center text-sm mb-2">
                    {member?.designation}
                  </p>
                  <p className="text-gray-600 text-center text-sm line-clamp-2">
                    {member?.description}
                  </p>
                  {/* Social Links */}
                  <div className="flex justify-center items-center space-x-4 mt-4">
                    {member?.link1 && (
                      <a
                        href={member?.link1}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 text-xl transition-colors duration-300"
                      >
                        <FontAwesomeIcon icon={faLinkedin} />
                      </a>
                    )}
                    {member?.link2 && (
                      <a
                        href={member?.link2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-500 text-xl transition-colors duration-300"
                      >
                        <FontAwesomeIcon icon={faTwitter} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Skills  start*/}
        {/* <div className="  py-5">
          <div className="md:flex block justify-center items-start">
            <div className="flex-col sm:px-4 md:px-0 px-2 md:py-10 py-6">
              <p className="text-xs sm:text-sm md:text-[12px] text-zinc-600 leading-3 font-bold uppercase">
                Team Skills
              </p>
              <h2 className=" mb-3 text-xl text-heading sm:text-2xl md:text-2xl font-semibold capitalize">
                Digital Consulting Experts
              </h2>
              <h4 className="text-lg sm:text-xl text-[#FF7A53] font-semibold capitalize">
                Real people for better results
              </h4>
              <p className="text-sm sm:text-[15px] md:text-base leading-6">
                We have high performing teams for Zoho consulting, HubSpot
                consulting, web development, digital marketing & CRM Expert
              </p>

              <button className="border border-orange-500 hover:text-primary hover:bg-white py-2 md:py-3 px-4 md:px-5 rounded-md bg-primary my-5 text-white">
                Meet our team
              </button>
            </div>

           
            <div className="  grid grid-cols-2 md:grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 md:gap-10 gap-3 md:p-5">
              {progressData.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <CircularProgressBar
                    percentage={item.percentage}
                    color={item.color}
                  />
                  <p className="mt-1 text-base  text-gray-800 md:text-md font-semibold text-center">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div> */}
        {/* Team Skills End */}
      </div>
    </div>
  );
};

export default Team;
