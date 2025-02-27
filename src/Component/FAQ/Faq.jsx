// ====================Without Expand All===============================

// import React, {useState} from 'react'

// const Faq = () => {

//   const [expandedIndex, setExpandedIndex] = useState(null);

//   const handleToggle = (i) => {
//     setExpandedIndex(expandedIndex === i ? null : i);
//   };

//   const faqs = [
//     {
//       question: 'What services does Four Steps Digital Consulting Pvt Ltd offer?',
//       answer: `We provide a range of services, including Zoho consulting to optimize your business processes,
//                HubSpot consulting to enhance your customer relationship management,
//                and digital marketing strategies to boost your online presence.`
//     },
//     {
//       question: 'How can Zoho consulting benefit my business?',
//       answer: `Our Zoho consulting services help you leverage Zoho’s powerful suite of tools
//                for efficient customer relationship management, process automation, and data analytics,
//                resulting in improved productivity and better decision-making.`
//     },
//     {
//       question: 'What is the significance of HubSpot consulting for my company?',
//       answer: `Back when you keep the claims low. Be first to learn insurance
//                can save you thousands each year and get notified`
//     },
//     {
//       question: 'Why is digital marketing essential for my business, and how can you help?',
//       answer: ` In today’s digital landscape, having a strong online presence is crucial.
//                 Our digital marketing services encompass SEO, social media marketing, content creation, and more,
//                 tailored to your business goals, ensuring increased brand visibility and customer engagement`
//     },
//     {
//       question: 'How do you tailor your services to suit our specific business needs?',
//       answer: `We believe in a personalized approach. Our team conducts a thorough analysis of your business requirements, goals, and challenges.
//                Based on this assessment, we develop customized strategies and solutions that align with your unique needs. each year and get notified`
//     },
//     {
//       question: 'What sets Four Steps Digital Consulting apart from other consulting agencies?',
//       answer: `Our expertise spans Zoho and HubSpot consulting, coupled with comprehensive digital marketing knowledge.
//                We offer an end-to-end solution that integrates technology and marketing for seamless business growth.`
//     }
//     // Add more FAQ items here if needed
//   ];

//   return (
//     <>
//         {/* <div className="container"> */}
//         <div className='flex-col justify-center items-center md:py-7 md:px-10  px-5 py-5 w-full'>
//             <p className='text-[12px] text-zinc-500 leading-3 font-bold'>FAQ</p>
//             <h3 className='my-5 md:text-2xl text-xl font-bold uppercase'>general questions</h3>
//             <p className='text-[15px]'>
//                 At Four Steps Digital Consulting Pvt Ltd,
//                 we’re dedicated to enhancing your business’s digital capabilities through Zoho
//                 and HubSpot consulting while driving growth with effective digital marketing strategies.
//             </p>
//         </div>
//         <div className="w-full md:w-3/4 m-auto md:px-0 px-5 pb-5">
//             <div className="w-full mx-auto mt-5">
//                 {faqs.map((faq, i) => (
//                     <div key={i} className="mb-3">
//                         <div onClick={() => handleToggle(i)}
//                             className="w-full md:h-14 h-16 flex justify-between items-center px-5 py-2 bg-[#f3f3f3] rounded-md hover:bg-gray-200 cursor-pointer">
//                             <p className="md:text-[14px] text-sm capitalize font-semibold mr-1">{faq.question}</p>
//                             <span>{expandedIndex === i ? '-' : '+'}</span>
//                         </div>
//                         <div className={`overflow-hidden transition-max-height duration-700 ease-in-out
//                             ${ expandedIndex === i ? 'max-h-screen' : 'max-h-0' }`}>
//                             <div className="py-4 xl:px-10 px-7  text-sm">
//                                 {faq.answer}
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//         {/* </div> */}
//     </>
//   )
// }

// export default Faq

// =======================Expand All=================================

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const IndustryFaq = () => {
  const [openIndices, setOpenIndices] = useState([]);
  const [isAllOpen, setIsAllOpen] = useState(false);

  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch("/api/home/home-faq");
        const data = await res.json();

        if (data.success) {
          setFaqData(data.data);
          console.log("--------->", data);
        }
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
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
    <div className=" bg-background">
      <div className=" md:py-10 py-5 container-wrapper">
        {/* section 1 */}

        <div className="flex flex-col justify-center items-center text-center mt-5 md:pb-2 ">
          <h2 className="md:text-3xl text-xl  font-semibold text-heading text-center mb-1">
            Frequently Asked Questions (FAQ)
          </h2>
          <h3 className="py-2 md:text-xl text-subheading text-base font-bold uppercase">
            general questions
          </h3>
          <p className="text-sm md:text-base text-gray-900  max-w-5xl">
            At Four Steps Digital Consulting Pvt Ltd, we are dedicated to
            enhancing your businesss digital capabilities through Zoho and
            HubSpot consulting, while driving growth with effective digital
            marketing strategies.
          </p>
        </div>

        <div className=" max-w-5xl  mx-auto pb-5">
          <div className="flex justify-end items-center pb-5 md:pr-0 pr-5">
            <button
              className="underline underline-offset-[6px] text-sm px-2 py-1.5  hover:bg-blue-50 "
              onClick={isAllOpen ? handleHideAll : handleExpandAll}
            >
              {isAllOpen ? "Hide all" : "Expand all"}
            </button>
          </div>
          <div className="w-full mx-auto md:px-0 px-5">
            {faqData?.length > 0 &&
              faqData?.map((faq, i) => (
                <div key={i} className="mb-3">
                  <div
                    onClick={() => handleToggle(i)}
                    className="w-full md:h-14 h-16 flex justify-between items-center   px-5 py-2 bg-white shadow-md  rounded  hover:bg-gray-200 cursor-pointer"
                  >
                    <p className="md:text-[15px] text-[13px] capitalize md:first-line:font-semibold font-medium mr-1 ">
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
                    className={`overflow-hidden transition-max-height   duration-100 ease-in-out
                                        ${
                                          openIndices.includes(i)
                                            ? "max-h-[1000px]"
                                            : "max-h-0"
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
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryFaq;
