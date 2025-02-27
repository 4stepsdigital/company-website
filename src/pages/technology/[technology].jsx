import React, { useEffect, useState } from "react";
import Nav from "@/Component/Header/Nav";
import Image from "next/image";
import { Footer } from "@/Component/Footer/Footer";
import Testimonial from "@/Component/Testimonial/Testimonial";
import TableOfTechnology from "@/Component/Technology/TableOfTechnology";
import TechFaqs from "@/Component/Technology/TechFaqs";
import { useRouter } from "next/router";

const getTechonology = async (title) => {
  const res = await fetch(
    `/api/technology/get-technology-by-title?title=${title}`
  );
  const data = await res.json();
  return data;
};

const Technology = () => {
  const router = useRouter();
  const { technology } = router?.query;
  const [technologyName, setTechnologyName] = useState({});
  useEffect(() => {
    if (technology) {
      getTechonology(technology?.split("-")?.join(" ")).then((data) => {
        setTechnologyName(data?.data);
      });
    }
  }, [technology]);
  console.log("here is all the data final technology ---->", technologyName);
  return (
    <>
      <div>
        <div className=" top-0 sticky z-10">
          <Nav />
        </div>

        <div className="font-sans">
          {/* hero section */}
          <div className=" bg-background   md:mt-14 mt-10 shadow-lg py-16 px-4 lg:px-0">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-col md:items-cente lg:flex-row ">
              {/* Left Content */}
              <div className=" lg:w-1/2 w-full lg:px-5 md:pb-5">
                <h1 className="text-2xl md:text-[30px] font-semibold text-heading leading-tight mb-4">
                  {technologyName?.title ||
                    "IT Solution for Oil & Gas Companies"}
                </h1>
                <p className="text-sm md:text-base">
                  {technologyName?.description ||
                    "IT Solution for Oil & Gas Companies description....."}
                </p>
              </div>

              {/* Right Image */}
              <div className="lg:w-1/2 flex  justify-center mt-6 md:mt-0">
                <Image
                  src={technologyName?.path || "/image/yyy.png"}
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
            <TableOfTechnology technologyName={technologyName} />
          </div>

          {/* FQA */}
          <div>
            <TechFaqs faqDataTech={technologyName?.faq} />
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
    </>
  );
};

export default Technology;
