import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import IndustrySideForm from "../Industry/IndustrySideForm";

import ApproacheIndustry from "../Industry/ApproacheIndustry";
import SolutionAbout from "./SolutionAbout";
import SuccessStorySolution from "./SuccessStorySolution";
import ProductSolution from "./ProductSolution";
import BenifitSolution from "./BenifitSolution";
import Why4stepSolution from "./Why4stepSolution";
import OurServiceSolution from "./OurServiceSolution";
import SolutionDeliver from "./SolutionDeliver";
import OverViewSolution from "./OverViewSolution";
const TableofSolution = ({ solutionName }) => {
  const [highlightedText, setHighlightedText] = useState("");
  function highlightSection(highlightId, hightValue) {
    // Reset all highlights
    const highlights = document.querySelectorAll('[id^="highlight"]');
    highlights.forEach((highlight) => {
      highlight.style.height = "0px";
    });
    setHighlightedText(highlightId);
    // Apply highlight to the selected section
    const activeHighlight = document.getElementById(highlightId);
    if (activeHighlight) {
      activeHighlight.style.height = hightValue; // Adjust height dynamically based on the heading position
    }
  }

  return (
    <div className="">
      <div className="bg-white ">
        <div className="md:px-5 gap-4 grid grid-cols-1 lg:grid-cols-[2fr,0.6fr]">
          {/* Main Content */}
          <div className="px-5 container grid grid-cols-1 bg-white">
            {/* overview item here to present ---- */}
            <div>
              {solutionName?.overview && (
                <OverViewSolution overview={solutionName?.overview} />
              )}
            </div>

            {/* Solution About section */}
            {/* <div>
              {solutionName?.contentsummary && (
                <SolutionAbout about={solutionName?.contentsummary} />
              )}
            </div> */}
            {/* Reliable partners  */}
            <div
              id="OverviewContent"
              className="flex flex-col justify-between mt-5 mb-3"
            >
              <div className="md:px-2">
                <h2
                  className="font-semibold text-heading text-xl md:text-3xl py-5"
                  dangerouslySetInnerHTML={{
                    __html:
                      solutionName?.Why4StepS?.heading || "Why 4Step Solution",
                  }}
                ></h2>

                {solutionName?.Why4StepS && (
                  <Why4stepSolution Why4StepS={solutionName?.Why4StepS} />
                )}
              </div>
            </div>
            {/* Success story section */}
            <div id="agenda" className="flex flex-col justify-between  mb-3">
              <div>
                {/* Heading */}
                <div className="font-semibold text-heading text-lg md:text-3xl">
                  {solutionName?.success?.heading || "Success Story"} main
                </div>
                <div>
                  {/* Description */}
                  <p
                    className="md:text-base py-2 text-sm"
                    dangerouslySetInnerHTML={{
                      __html: solutionName?.success?.mainEditorHtmlDescription,
                    }}
                  />
                </div>

                {solutionName?.success && (
                  <SuccessStorySolution successStory={solutionName?.success} />
                )}
              </div>
            </div>
            {/* Solution we deliver Section */}
            <div
              id="speakerSection"
              className="flex flex-col justify-between md:mt-20 mb-3"
            >
              <div>
                <div className="font-semibold py-2 text-xl">
                  <h3 className="font-semibold text-heading text-xl md:text-3xl">
                    {solutionName?.solution?.heading || " Solution We Deliver"}
                  </h3>
                </div>
                {solutionName?.solution && (
                  <SolutionDeliver solutionDeliver={solutionName.solution} />
                )}
              </div>
            </div>
            {/* Our Services Section */}
            <div
              id="ourServices"
              className="flex flex-col justify-between mt-5 mb-3"
            >
              <div>
                <div className="font-semibold text-heading text-xl md:text-3xl">
                  {solutionName?.service?.heading || "Our Services"}
                </div>

                {solutionName?.service && (
                  <OurServiceSolution SolutionService={solutionName?.service} />
                )}
              </div>
            </div>
            {/* Product Section */}
            <div
              id="product"
              className="flex flex-col justify-between mt-5 mb-3"
            >
              {/* heading section  */}

              <div className="font-semibold text-heading text-xl md:text-3xl">
                {solutionName?.product?.heading || "Our Services"}
              </div>

              {solutionName?.product && (
                <ProductSolution productsolution={solutionName?.product} />
              )}
            </div>
            {/* Approaches Section */}
            <div
              id="approaches"
              className="flex flex-col justify-between mt-5 mb-3"
            >
              <div>
                {/* <div className="font-semibold py-2 text-xl">Approaches</div> */}
                <ApproacheIndustry />
              </div>
            </div>
            {/* Benefits Section */}
            <div
              id="benefits"
              className="flex flex-col justify-between mt-5 mb-3"
            >
              <div className="md:px-2">
                <div className="font-semibold text-heading text-xl md:text-3xl">
                  {solutionName?.benefit?.heading || "Our Benifits"}
                </div>
                {solutionName?.benefit && (
                  <BenifitSolution solutionBenifits={solutionName?.benefit} />
                )}
              </div>
            </div>
          </div>

          {/* Table of content */}
          <div className="pl-3 md:pl-0 order-first md:order-first lg:order-none">
            <div className="sticky top-24 z-3 ">
              <h2 className="font-bold text-lg mb-4">
                Table of contents Solution
              </h2>
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gray-300">
                  {/* Highlight sections */}
                  <div
                    id="highlight1"
                    className=" bg-heading transition-all duration-300 h-0"
                  ></div>
                  <div
                    id="highlight2"
                    className=" bg-heading transition-all duration-300 h-0"
                  ></div>
                  <div
                    id="highlight3"
                    className=" bg-heading transition-all duration-300 h-0"
                  ></div>
                  <div
                    id="highlight4"
                    className=" bg-heading transition-all duration-300 h-0"
                  ></div>
                  <div
                    id="highlight5"
                    className=" bg-heading transition-all duration-300 h-0"
                  ></div>
                  <div
                    id="highlight6"
                    className=" bg-heading transition-all duration-300 h-0"
                  ></div>
                  <div
                    id="highlight7"
                    className=" bg-heading transition-all duration-300 h-0"
                  ></div>
                </div>

                {/* Table of Content Items */}
                <div className="flex flex-col gap-4 pl-4">
                  <ScrollLink
                    to="OverviewContent"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    activeClass="active"
                    onSetActive={() => highlightSection("highlight1", "20px")}
                  >
                    <p
                      className={`text-gray-700 ${
                        highlightedText === "highlight1" ? "text-heading" : ""
                      }  hover:text-black cursor-pointer`}
                    >
                      Why 4steps Digital
                    </p>
                  </ScrollLink>

                  <ScrollLink
                    to="agenda"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    activeClass="active"
                    onSetActive={() => highlightSection("highlight2", "55px")}
                  >
                    <p
                      className={`text-gray-700 ${
                        highlightedText === "highlight2" ? "text-heading" : ""
                      }  hover:text-black cursor-pointer`}
                    >
                      Success stories
                    </p>
                  </ScrollLink>

                  <ScrollLink
                    to="speakerSection"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    activeClass="active"
                    onSetActive={() => highlightSection("highlight3", "95px")}
                  >
                    <p
                      className={`text-gray-700 ${
                        highlightedText === "highlight3" ? "text-heading" : ""
                      }  hover:text-black cursor-pointer`}
                    >
                      Related Industries
                    </p>
                  </ScrollLink>

                  <ScrollLink
                    to="ourServices"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    activeClass="active"
                    onSetActive={() => highlightSection("highlight4", "135px")}
                  >
                    <p
                      className={`text-gray-700 ${
                        highlightedText === "highlight4" ? "text-heading" : ""
                      }  hover:text-black cursor-pointer`}
                    >
                      Related Services
                    </p>
                  </ScrollLink>

                  <ScrollLink
                    to="product"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    activeClass="active"
                    onSetActive={() => highlightSection("highlight5", "175px")}
                  >
                    <p
                      className={`text-gray-700 ${
                        highlightedText === "highlight5" ? "text-heading" : ""
                      }  hover:text-black cursor-pointer`}
                    >
                      Technology We Use
                    </p>
                  </ScrollLink>

                  <ScrollLink
                    to="approaches"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    activeClass="active"
                    onSetActive={() => highlightSection("highlight6", "215px")}
                  >
                    <p
                      className={`text-gray-700 ${
                        highlightedText === "highlight6" ? "text-heading" : ""
                      }  hover:text-black cursor-pointer`}
                    >
                      Our Approach
                    </p>
                  </ScrollLink>

                  <ScrollLink
                    to="benefits"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    activeClass="active"
                    onSetActive={() => highlightSection("highlight7", "270px")}
                  >
                    <p
                      className={`text-gray-700 ${
                        highlightedText === "highlight7" ? "text-heading" : ""
                      }  hover:text-black cursor-pointer`}
                    >
                      Benefits
                    </p>
                  </ScrollLink>
                </div>
              </div>

              {/* Side form section */}
              <div className=" mt-2">
                <IndustrySideForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableofSolution;
