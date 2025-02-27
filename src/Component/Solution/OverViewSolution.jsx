// import Image from "next/image";
// import React, { useState } from "react";

// const staticServices = [
//   {
//     _id: "1",
//     name: "Web Development",
//     image: "/image/zoho.jpg",
//     description:
//       "Building modern, responsive, and scalable websites using the latest technologies like HTML, CSS, JavaScript, and frameworks such as React, Vue, and Angular.",
//   },
//   {
//     _id: "2",
//     name: "Mobile App Development",
//     image: "/image/bootstrap.jpg",
//     description:
//       "Creating seamless applications for Apple devices and designing user-friendly and scalable Android applications, ensuring performance and smooth user experience.",
//   },
//   {
//     _id: "3",
//     name: "UI/UX Design",
//     image: "/image/try.jpeg",
//     description:
//       "Crafting visually appealing and user-friendly designs using tools like Figma and Adobe XD, focusing on accessibility and enhancing user engagement.",
//   },
//   {
//     _id: "4",
//     name: "E-Commerce Development",
//     image: "/image/sale.jpg",
//     description:
//       "Developing high-performance e-commerce platforms with secure payment gateways, seamless user experiences, and features like product catalogs and cart management.",
//   },
//   {
//     _id: "5",
//     name: "Cybersecurity",
//     image: "/image/pic.jpeg",
//     description:
//       "Implementing security measures such as encryption, firewalls, and secure authentication to protect websites and applications from potential cyber threats.",
//   },
// ];

// const OverViewSolution = () => {
//   const [activeService, setActiveService] = useState(staticServices[0]);

//   return (
//     <div className="w-full bg-white">
//       <div className="container md:pt-10 pt-5">
//         <div className="pb-5">
//           <h2 className="md:text-3xl text-xl text-heading font-semibold pb-3">
//             Overview of Solution
//           </h2>
//         </div>

//         <div className="w-full border rounded-lg shadow-md">
//           <div className="flex flex-col md:flex-row">
//             {/* Sidebar Menu */}
//             <div className="w-full md:w-1/3 bg-blue-50 px-4 py-3">
//               {staticServices.map((service) => (
//                 <div
//                   key={service?._id}
//                   className={`md:py-3 md:px-4 py-2 px-3 md:text-xl text-lg  font-semibold cursor-pointer hover:text-blue-500 transition ${
//                     activeService.name === service.name
//                       ? "bg-heading text-white hover:text-white"
//                       : "text-[#004985]"
//                   }`}
//                   onClick={() => setActiveService(service)}
//                 >
//                   {service?.name}
//                 </div>
//               ))}
//             </div>
//             {/* Content Area */}
//             <div className="w-full lg:h-[90vh] md:h-[50vh] overflow-hidden md:flex-1 px-3 md:px-16 md:py-10 py-8">
//               <h2 className="md:text-2xl text-lg text-heading font-semibold mb-3">
//                 {activeService?.name}
//               </h2>
//               <Image
//                 src={activeService?.image}
//                 alt={activeService?.name}
//                 className="w-full h-64 object-cover mb-5 rounded-lg"
//                 height={300}
//                 width={300}
//               />
//               <p className="text-sm md:text-base text-gray-600 mt-1">
//                 {activeService.description}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OverViewSolution;

import Image from "next/image";
import React, { useState, useEffect } from "react";

const OverViewSolution = ({ overview }) => {
  const [activeService, setActiveService] = useState(null);

  // Set the default active service when the component mounts
  useEffect(() => {
    if (overview && overview.overviewItem && overview.overviewItem.length > 0) {
      setActiveService(overview.overviewItem[0]); // Set first item as default
    }
  }, [overview]);

  // Render loading state until activeService is set
  if (!activeService) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full bg-white">
      <div className="container md:pt-10 pt-5">
        <div className="pb-5">
          <h2 className="md:text-3xl text-xl text-heading font-semibold pb-1">
            {overview?.heading}
          </h2>
          <p
            className="md:text-base py-2 text-sm"
            dangerouslySetInnerHTML={{
              __html: overview?.mainEditorHtmlDescription,
            }}
          />
        </div>

        <div className="w-full border   rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar Menu */}
            <div className="w-full md:w-1/3 bg-blue-50 px-4 py-3">
              {overview?.overviewItem?.map((service) => (
                <div
                  key={service?._id}
                  className={`md:py-3 md:px-4 py-2 px-3 md:text-xl text-lg font-semibold cursor-pointer hover:text-blue-500 transition ${
                    activeService?.title === service?.title
                      ? "bg-heading text-white hover:text-white"
                      : "text-[#004985]"
                  }`}
                  onClick={() => setActiveService(service)}
                >
                  {service?.title}
                </div>
              ))}
            </div>

            {/* Content Area */}
            <div className="w-full lg:h-[95vh] md:h-[60vh] overflow-y-scroll md:flex-1 px-3 md:px-16 md:py-10 py-8 custom-scrollbar">
              {/* <div className="w-full lg:h-[95vh]  md:h-[60vh] overflow-hidden md:flex-1 px-3 md:px-16 md:py-10 py-8"> */}
              <h2 className="md:text-2xl text-lg text-heading font-semibold mb-3">
                {activeService?.title}
              </h2>

              <div className="flex w-full max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl">
                {/* <Image
                  src={activeService?.path}
                  alt="overviewItemImage"
                  className="w-full h-auto max-h-64 sm:max-h-72 md:max-h-80 lg:max-h-[250px] object-cover mb-5 rounded-lg shadow-md"
                  height={500}
                  width={500}
                /> */}
                <Image
                  src={activeService?.path}
                  alt="overviewItemImage"
                  className="w-full object-cover mb-5 rounded-lg shadow-md 
                  h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80"
                  height={500}
                  width={500}
                />
              </div>

              <ul className="custom-list pl-5 ">
                {activeService?.editorHtmlDescription?.map(
                  (descItem, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-sm sm:text-base py-1 text-gray-700 transition-colors duration-200 hover:text-heading"
                      dangerouslySetInnerHTML={{
                        __html: descItem?.content,
                      }}
                    />
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverViewSolution;
