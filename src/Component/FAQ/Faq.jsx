// =======================Expand All=================================

// import { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

// const IndustryFaq = () => {
//   const [openIndices, setOpenIndices] = useState([]);
//   const [isAllOpen, setIsAllOpen] = useState(false);

//   const [faqData, setFaqData] = useState([]);

//   useEffect(() => {
//     const fetchFaqs = async () => {
//       try {
//         const res = await fetch("/api/home/home-faq");
//         const data = await res.json();

//         if (data.success) {
//           setFaqData(data.data);
//           console.log("--------->", data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch FAQs:", error);
//       }
//     };

//     fetchFaqs();
//   }, []);

//   // Toggle specific section
//   const handleToggle = (i) => {
//     if (openIndices.includes(i)) {
//       setOpenIndices(openIndices.filter((index) => index !== i));
//     } else {
//       setOpenIndices([...openIndices, i]);
//     }
//   };

//   // Expand all sections
//   const handleExpandAll = () => {
//     setOpenIndices(faqData?.map((_, i) => i));
//     setIsAllOpen(true);
//   };

//   // Hide all sections
//   const handleHideAll = () => {
//     setOpenIndices([]);
//     setIsAllOpen(false);
//   };

//   return (
//     <div className=" bg-background">
//       <div className=" md:py-10 py-5 container-wrapper">
//         {/* section 1 */}

//         <div className="flex flex-col justify-center items-center text-center mt-5 md:pb-2 ">
//           <h2 className="md:text-3xl text-xl  font-semibold text-heading text-center mb-1">
//             Frequently Asked Questions (FAQ)
//           </h2>
//           <h3 className="py-2 md:text-xl text-subheading text-base font-bold uppercase">
//             general questions
//           </h3>
//           <p className="text-sm md:text-base text-gray-900  max-w-5xl">
//             At Four Steps Digital Consulting Pvt Ltd, we are dedicated to
//             enhancing your businesss digital capabilities through Zoho and
//             HubSpot consulting, while driving growth with effective digital
//             marketing strategies.
//           </p>
//         </div>

//         <div className=" max-w-5xl  mx-auto pb-5">
//           <div className="flex justify-end items-center pb-5 md:pr-0 pr-5">
//             <button
//               className="underline underline-offset-[6px] text-sm px-2 py-1.5  hover:bg-blue-50 "
//               onClick={isAllOpen ? handleHideAll : handleExpandAll}
//             >
//               {isAllOpen ? "Hide all" : "Expand all"}
//             </button>
//           </div>
//           <div className="w-full mx-auto md:px-0 px-5">
//             {faqData?.length > 0 &&
//               faqData?.map((faq, i) => (
//                 <div key={i} className="mb-3">
//                   <div
//                     onClick={() => handleToggle(i)}
//                     className="w-full md:h-14 h-16 flex justify-between items-center   px-5 py-2 bg-white shadow-md  rounded  hover:bg-gray-200 cursor-pointer"
//                   >
//                     <p className="md:text-[15px] text-[13px] capitalize md:first-line:font-semibold font-medium mr-1 ">
//                       {faq?.title}
//                     </p>

//                     <span>
//                       {openIndices.includes(i) ? (
//                         <FontAwesomeIcon icon={faChevronUp} />
//                       ) : (
//                         <FontAwesomeIcon icon={faChevronDown} />
//                       )}
//                     </span>
//                   </div>
//                   <div
//                     className={`overflow-hidden transition-max-height   duration-100 ease-in-out
//                                         ${
//                                           openIndices.includes(i)
//                                             ? "max-h-[1000px]"
//                                             : "max-h-0"
//                                         }`}
//                     style={{
//                       maxHeight: openIndices.includes(i) ? "1000px" : "0px",
//                     }}
//                   >
//                     <div className="py-4 xl:px-10 px-7 text-xs md:text-sm">
//                       <p
//                         dangerouslySetInnerHTML={{ __html: faq?.information }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IndustryFaq;

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const IndustryFaq = () => {
  const [openIndices, setOpenIndices] = useState([]);
  const [isAllOpen, setIsAllOpen] = useState(false);
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch("/api/home/home-faq");
        const data = await res.json();

        if (data.success) {
          setFaqData(data.data);
        } else {
          setError("Failed to load FAQs.");
        }
      } catch (error) {
        setError("Failed to fetch FAQs.");
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  // Toggle specific section
  const handleToggle = (i) => {
    if (openIndices.includes(i)) {
      setOpenIndices(openIndices.filter((index) => index !== i));
    } else {
      setOpenIndices([...openIndices, i]);
    }
  };

  // Expand all sections
  const handleExpandAll = () => {
    setOpenIndices(faqData?.map((_, i) => i));
    setIsAllOpen(true);
  };

  // Hide all sections
  const handleHideAll = () => {
    setOpenIndices([]);
    setIsAllOpen(false);
  };

  return (
    <div className="bg-background">
      <div className="md:py-10 py-5 container-wrapper">
        {/* Section 1 */}
        <div className="flex flex-col justify-center items-center text-center mt-5 md:pb-2">
          <h2 className="md:text-3xl text-xl font-semibold text-heading text-center mb-1">
            Frequently Asked Questions (FAQ)
          </h2>
          <h3 className="py-2 md:text-xl text-subheading text-base font-bold uppercase">
            General Questions
          </h3>
          <p className="text-sm md:text-base text-gray-900 max-w-5xl">
            At Four Steps Digital Consulting Pvt Ltd, we are dedicated to
            enhancing your business’s digital capabilities through Zoho and
            HubSpot consulting, while driving growth with effective digital
            marketing strategies.
          </p>
        </div>

        <div className="max-w-5xl mx-auto pb-5">
          <div className="flex justify-end items-center pb-5 md:pr-0 pr-5">
            <button
              className="underline underline-offset-[6px] text-sm px-2 py-1.5 hover:bg-blue-50"
              onClick={isAllOpen ? handleHideAll : handleExpandAll}
            >
              {isAllOpen ? "Hide all" : "Expand all"}
            </button>
          </div>

          <div className="w-full mx-auto md:px-0 px-5">
            {loading ? (
              <div className="text-center py-10 text-lg font-semibold text-gray-700">
                Loading FAQs...
              </div>
            ) : error ? (
              <div className="text-center py-10 text-lg font-semibold text-red-500">
                {error}
              </div>
            ) : faqData?.length > 0 ? (
              faqData.map((faq, i) => (
                <div key={i} className="mb-3">
                  <div
                    onClick={() => handleToggle(i)}
                    className="w-full md:h-14 h-16 flex justify-between items-center px-5 py-2 bg-white shadow-md rounded hover:bg-gray-200 cursor-pointer"
                  >
                    <p className="md:text-[15px] text-[13px] capitalize md:first-line:font-semibold font-medium mr-1">
                      {faq?.title}
                    </p>

                    <span>
                      {openIndices.includes(i) ? (
                        <FontAwesomeIcon icon={faChevronUp} />
                      ) : (
                        <FontAwesomeIcon icon={faChevronDown} />
                      )}
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-max-height duration-100 ease-in-out ${
                      openIndices.includes(i) ? "max-h-[1000px]" : "max-h-0"
                    }`}
                    style={{
                      maxHeight: openIndices.includes(i) ? "1000px" : "0px",
                    }}
                  >
                    <div className="py-4 xl:px-10 px-7 text-xs md:text-sm">
                      <p
                        dangerouslySetInnerHTML={{ __html: faq?.information }}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-lg font-semibold text-gray-700">
                No FAQs available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryFaq;
