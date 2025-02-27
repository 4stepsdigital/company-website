import React, { useEffect, useState } from "react";

import Testimonial from "@/Component/Testimonial/Testimonial";
import Image from "next/image";
import { Footer } from "@/Component/Footer/Footer";
import Nav from "@/Component/Header/Nav";
import TableOfContent from "@/Component/Industry/TableOfContent";
import IndustryFaq from "@/Component/Industry/IndustryFaq";
import { useRouter } from "next/router";
const getIndustry = async (item) => {
  return await (
    await fetch(
      `/api/industry/get-industry?industryName=${item?.split("-")?.join(" ")}`,
      { method: "GET" }
    )
  ).json();
};
const Travel = () => {
  const router = useRouter();

  const { industry } = router?.query;
  const [industryName, setIndustryName] = useState({});

  useEffect(() => {
    if (industry) {
      getIndustry(industry).then((res) => {
        setIndustryName(res?.data || {});
      });
    }
  }, [industry]);

  // console.log("itineary all data one by one industry ---==> ", industryName);
  return (
    <div>
      {/* headres */}
      <div className=" top-0 sticky z-10">
        <Nav />
      </div>

      <div className="font-sans">
        {/* hero section */}

        {/* <div className=" bg-background md:mt-0 mt-10 mx-auto shadow-lg py-16 px-6 md:px-12"> */}
        <div className=" bg-background   md:mt-10 mt-10 shadow-lg py-16 px-4 lg:px-0">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-col md:items-cente lg:flex-row ">
            {/* Left Content */}
            <div className=" lg:w-1/2 w-full lg:px-5 md:pb-5">
              <h1 className="text-2xl md:text-[30px] font-semibold text-heading leading-tight mb-4">
                {industryName?.title || "IT Solution for Oil & Gas Companies"}
              </h1>
              <p className="text-sm md:text-base">
                {industryName?.description ||
                  "IT Solution for Oil & Gas Companies description....."}
              </p>
            </div>

            {/* Right Image */}
            <div className="lg:w-1/2 flex  justify-center mt-6 md:mt-0">
              <Image
                src={industryName?.path || "/image/yyy.png"}
                alt="Hero Section"
                className="w-full max-w-md md:max-w-lg rounded"
                height={500}
                width={500}
              />
            </div>
          </div>
        </div>

        {/* tabel of content section */}
        <div>
          <TableOfContent industryName={industryName} />
        </div>

        {/* this is FQA SECTION  */}
        <div>
          <IndustryFaq faqData={industryName?.faq?.faq} />
        </div>
        {/* Client & Testimonials */}

        <div>
          <Testimonial />
        </div>

        {/* Resource Section */}
      </div>

      {/* footer section */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Travel;
