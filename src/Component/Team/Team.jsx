// import React, { useState, useEffect, useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
// import Image from "next/image";

// const Team = () => {
//   const fetchAllTeamMember = async () => {
//     const response = await fetch("/api/team");
//     return await response.json();
//   };
//   // for circle bar
//   const [allTeamMember, setAllTeamMember] = useState([]);
//   useEffect(() => {
//     fetchAllTeamMember().then((res) => {
//       setAllTeamMember(res || []);
//     });
//   }, []);
//   return (
//     <div className=" w-full bg-white">
//       <div className="container-wrapper mx-auto">
//         {/* Team Section */}
//         <div className=" py-8 ">
//           <h1 className=" text-[22px] text-heading md:text-3xl font-semibold text-center md:pb-5 pb-3">
//             Our Biggest Asset is Our Team
//           </h1>
//           <p className="text-sm md:pb-5 md:text-base leading-6 text-center pb-5 px-2 md:px-0 text-gray-700">
//             Our team thrives on collaboration and is fueled by a diverse array
//             of talent. We actively engage with the creative community,
//             consistently seeking out whats on the horizon, and always maintain a
//             positive and welcoming atmosphere.
//           </p>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0">
//             {allTeamMember?.data?.map((member) => (
//               <div
//                 key={member?._id}
//                 className="w-full max-w-xs h-auto  cursor-pointer border rounded-xl shadow-lg overflow-hidden bg-gradient-to-b from-white to-gray-50"
//               >
//                 {/* Image Section */}
//                 <div className="relative w-full h-56 overflow-hidden group">
//                   <Image
//                     className="w-full h-full p-[3px] object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-110"
//                     src={member?.path}
//                     alt={member?.title}
//                     width={500}
//                     height={500}
//                   />
//                 </div>

//                 {/* Info Section */}
//                 <div className="px-4 py-4">
//                   <h3 className="font-bold text-center text-lg text-gray-800">
//                     {member?.name}
//                   </h3>
//                   <p className="text-gray-500 text-center text-sm mb-2">
//                     {member?.designation}
//                   </p>
//                   <p className="text-gray-600 text-center text-sm line-clamp-2">
//                     {member?.description}
//                   </p>
//                   {/* Social Links */}
//                   <div className="flex justify-center items-center space-x-4 mt-4">
//                     {member?.link1 && (
//                       <a
//                         href={member?.link1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-500 hover:text-blue-600 text-xl transition-colors duration-300"
//                       >
//                         <FontAwesomeIcon icon={faLinkedin} />
//                       </a>
//                     )}
//                     {member?.link2 && (
//                       <a
//                         href={member?.link2}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-400 hover:text-blue-500 text-xl transition-colors duration-300"
//                       >
//                         <FontAwesomeIcon icon={faTwitter} />
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Team;
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import Loading from "../Web/Loading";

const Team = () => {
  const [allTeamMember, setAllTeamMember] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllTeamMember = async () => {
    try {
      const response = await fetch("/api/team");
      const res = await response.json();
      setAllTeamMember(res || []);
    } catch (err) {
      setError("Failed to load team members.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTeamMember();
  }, []);

  return (
    <div className="w-full bg-white">
      <div className="container-wrapper mx-auto">
        <div className="py-8">
          <h1 className="text-[22px] text-heading md:text-3xl font-semibold text-center md:pb-5 pb-3">
            Our Biggest Asset is Our Team
          </h1>
          <p className="text-sm md:pb-5 md:text-base leading-6 text-center pb-5 px-2 md:px-0 text-gray-700">
            Our team thrives on collaboration and is fueled by a diverse array
            of talent. We actively engage with the creative community,
            consistently seeking out whats on the horizon, and always maintain a
            positive and welcoming atmosphere.
          </p>

          {loading ? (
            <div className="text-center py-10 text-lg font-semibold text-gray-700">
             <Loading/>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-lg font-semibold text-red-500">
              {error}
            </div>
          ) : allTeamMember?.data?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0">
              {allTeamMember?.data?.map((member) => (
                <div
                  key={member?._id}
                  className="w-full max-w-xs h-auto cursor-pointer border rounded-xl shadow-lg overflow-hidden bg-gradient-to-b from-white to-gray-50"
                >
                  <div className="relative w-full h-56 overflow-hidden group">
                    <Image
                      className="w-full h-full p-[3px] object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-110"
                      src={member?.path || "/image/default.png"}
                      alt={member?.title || "Team Member"}
                      width={500}
                      height={500}
                    />
                  </div>
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
          ) : (
            <div className="text-center py-10 text-lg font-semibold text-gray-700">
              No team members listed.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;
