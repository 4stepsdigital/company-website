import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
const fetchWebinarPromo = async () => {
  const res = await fetch(`/api/webinar`);
  return await res?.json();
};
const fetchProductPromo = async () => {
  const res = await fetch(`/api/product`);
  const data = await res.json();
  return data;
};
const fetchVideoPromo = async () => {
  const res = await fetch(`/api/videos/videopromo`);
  const data = await res.json();
  return data;
};
const fetchCaseStudyPromo = async () => {
  const res = await fetch(`/api/casestudy`);
  const data = await res.json();
  return data;
};
const fetchBlogPromo = async () => {
  const res = await fetch(`/api/blog`);
  const data = await res.json();
  return data;
};
const Hero = ({ Heading }) => {
  const [promoData, setPromoData] = useState({});
  useEffect(() => {
    // console.log("heading----------> ",Heading)
    if (Heading === "webinar") {
      fetchWebinarPromo().then((res) => {
        // console.log("webinar data   ",res)
        setPromoData(res?.data || {});
      });
    }
    if (Heading === "product") {
      fetchProductPromo().then((res) => {
        // console.log("product data   ",res)
        setPromoData(res?.data || {});
      });
    }
    if (Heading === "demo-videos") {
      fetchVideoPromo().then((res) => {
        // console.log("demo-videos data   ",res)
        setPromoData(res?.data || {});
      });
    }
    if (Heading === "case-studies") {
      fetchCaseStudyPromo().then((res) => {
        // console.log("case-studies data   ",res)
        setPromoData(res?.data || {});
      });
    }
    if (Heading === "blog") {
      fetchBlogPromo().then((res) => {
        // console.log("blog data   ",res)
        setPromoData(res?.data || {});
      });
    }
  }, [Heading]);

  return (
    <div>
      {/* trail section */}
      <div className="bg-blue-50 w-full md:h-[60vh] xl:h-[70vh] md:mt-20 mt-20 md:mb-0 mb-4 flex items-center">
        <div className="container-wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Content Section */}
            <div className="flex flex-col pt-7 md:pt-0 justify-center space-y-4 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-heading">
                {promoData?.title || "Heading"}
              </h2>
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                {promoData?.description ||
                  `I hated every minute of training, but I said, “Don't quit. Suffer now and live the rest of your life as a champion.”`}
              </p>
              <Link href="#">
                <button className="mt-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold md:py-3 py-2 md:px-5 px-4 rounded-lg text-sm shadow-md transition-transform transform hover:scale-105">
                  Explore Now
                </button>
              </Link>
            </div>

            {/* Image Section */}
            <div className="flex justify-center lg:justify-end">
              <Image
                aria-hidden="true"
                alt="Inspiring web design"
                src={
                  promoData?.videoPath ||
                  "https://images.unsplash.com/photo-1621763540919-1a0477861102?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViaW5hcnxlbnwwfHwwfHx8MA%3D%3D"
                }
                width={400}
                height={500}
                className="w-full max-w-[400px] rounded-lg shadow-lg object-cover transform hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

// <div className=" bg-blue-50 w-full sm:h-[40vh] md:mt-20 mt-0  h-auto md:mb-0 mb-4 md:h-[65vh] xl:h-[70vh]">
//   <div className=" container-wrapper">
//     <div className=" ">
//       <div className="grid grid-cols-1 pt-24 md:pt-0   md:grid-cols-2 gap-8  ">
//         {/* Content Section */}
//         <div className="flex flex-col justify-center  md:text-left space-y-4">
//           <h2 className="text-xl sm:text-2xl md:text-3xl  md:text-[40px] text-[26px] font-semibold text-heading">
//             {promoData?.title || "Heading"}
//           </h2>

//           <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
//             {promoData?.description ||
//               `I hated every minute of training, but I said, “Don't quit. Suffer now and live the rest of your life as a champion.”`}
//           </p>
//           <Link href="#">
//             <button className="mt-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold md:py-2.5 py-1.5 md:px-4 px-3 rounded text-sm">
//               Explore Now
//             </button>
//           </Link>
//         </div>

//         {/* Image Section */}
//         <div className="flex justify-center pt-7 md:justify-end items-center ">
//           <Image
//             aria-hidden="true"
//             alt="Inspiring web design"
//             src={
//               promoData?.videoPath ||
//               "https://images.unsplash.com/photo-1621763540919-1a0477861102?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViaW5hcnxlbnwwfHwwfHx8MA%3D%3D"
//             }
//             width={400}
//             height={500}
//             className="rounded-lg shadow-lg object-cover transform hover:scale-105 transition-transform duration-300 ease-in-out"
//           />
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
