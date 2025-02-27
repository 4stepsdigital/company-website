import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const IndustryFaq = ({ faqData }) => {
  const [openIndices, setOpenIndices] = useState([]);
  const [isAllOpen, setIsAllOpen] = useState(false);

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
    setOpenIndices(faqData.map((_, i) => i));
    setIsAllOpen(true);
  };

  // Hide all sections
  const handleHideAll = () => {
    setOpenIndices([]);
    setIsAllOpen(false);
  };
  return (
    <div>
      <div className="bg-background py-10">
        {/* section 1 */}
        <div class="flex flex-col justify-center items-center text-center mt-5 md:pb-2 ">
          <h2 class="md:text-3xl text-xl  font-semibold text-heading text-center mb-1">
            Frequently Asked Questions (FAQ)
          </h2>
          <h3 class="py-2 md:text-xl text-subheading text-base font-bold uppercase">
            general questions
          </h3>
        </div>
        <div className=" md:w-3/4 max-w-4xl mx-auto pb-5">
          <div className="flex justify-end items-center pb-5 md:pr-0 pr-5">
            <button
              className="underline underline-offset-[6px] text-sm px-2 py-1.5  hover:bg-blue-100 "
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
                      {faq.title}
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
                      {faq.answer}
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
