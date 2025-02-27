// import { useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
// import Image from "next/image";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const Calltoaction = () => {
//   useEffect(() => {
//     AOS.init({
//       duration: 1200,
//       once: true,
//     });
//   }, []);
//   return (
//     <div>
//       <div className="relative container mb-10" data-aos="fade-up">
//         <div className="absolute inset-0 bg-gradient-to-t mx-4 from-orange-500 to-transparent"></div>
//         <div className="relative text-black py-3">
//           <div className="container mx-auto ">
//             <div className="flex flex-col gap-10 md:flex-row items-center justify-between bg-gray-100 p-8 z-10 relative">
//               <div className="w-full md:w-1/3 mb-4 md:mb-0">
//                 <Image
//                   src="/image/ab.webp"
//                   alt="Consultant"
//                   className="w-full h-auto object-cover"
//                   height={100}
//                   width={100}
//                 />
//               </div>

//               <div className="md:w-2/3 text-center md:text-left">
//                 <h2 className="text-xl md:text-2xl font-semibold mb-4 w-full md:w-2/3">
//                   Get expert insights with a free consultation book today!
//                 </h2>

//                 <p className="md:text-md mb-6 text-md w-full md:w-2/3">
//                   We help you see the world differently, discover opportunities
//                   you may never have imagined.
//                 </p>

//                 <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:justify-start">
//                   {/* WhatsApp Icon and Phone Number */}
//                   <div className="flex items-center space-x-1 mb-4 md:mb-0">
//                     <span className="text-[#35D366] text-3xl">
//                       <FontAwesomeIcon icon={faWhatsapp} />
//                     </span>
//                     <span className="text-xl"> +980 876 765 654</span>
//                   </div>

//                   {/* Button centered */}
//                   <div className="flex justify-center w-full md:w-auto">
//                     <button className=" border border-orange-500  hover:text-primary hover:bg-white  py-2 md:py-3 px-4 md:px-5 rounded-xl bg-primary text-white">
//                       meeting Link
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Calltoaction;

import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

const Calltoaction = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <div className="bg-gradient-to-t from-blue-900  to-transparent">
      <div className="relative container mb-10 px-4 md:px-8" data-aos="fade-up">
        <div className="absolute inset-0 "></div>
        <div className="relative  text-black py-6 md:py-10">
          <div className="container mx-auto">
            <div className="flex flex-col gap-10 md:flex-row items-center justify-between bg-white p-6 md:p-10 z-10 relative rounded-lg shadow-lg">
              {/* Image Section */}
              <div className="w-full md:w-1/3 flex-shrink-0">
                <Image
                  src="/image/contactt.png"
                  alt="Consultant"
                  className="w-full h-auto object-cover rounded-md"
                  height={200}
                  width={200}
                />
              </div>
              {/* Text and CTA Section */}
              <div className="w-full md:w-2/3 text-center md:text-left">
                <h2 className="text-lg md:text-2xl text-heading font-semibold mb-4">
                  Get expert insights with a free consultation book today!
                </h2>

                <p className="text-sm    md:text-base mb-6">
                  We help you see the world differently, discover opportunities
                  you may never have imagined.
                </p>

                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                  {/* WhatsApp Contact */}
                  <div className="flex items-center space-x-1 text-center md:text-left">
                    <span className="text-[#35D366] text-3xl">
                      <FontAwesomeIcon icon={faWhatsapp} />
                    </span>
                    <span className="text-lg md:text-xl">+980 876 765 654</span>
                  </div>

                  {/* Meeting Link Button */}
                  <div>
                    {/* <button className="border  border-[#00308F] bg-[#00308F] text-white hover:bg-white hover:text-[#00308F] transition-all py-2 px-6 rounded-full text-sm md:text-base">
                      Meeting Link
                    </button> */}
                    <button className="border  border-primary bg-primary text-white hover:bg-white hover:text-primary transition-all py-2 px-6 rounded-full text-sm md:text-base">
                      Meeting Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calltoaction;
