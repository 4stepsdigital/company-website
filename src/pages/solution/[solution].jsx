import React, { useEffect, useState } from "react";
import Testimonial from "@/Component/Testimonial/Testimonial";
import Image from "next/image";
import { Footer } from "@/Component/Footer/Footer";
import Nav from "@/Component/Header/Nav";
import { useRouter } from "next/router";
import TableofSolution from "@/Component/Solution/TableofSolution";
import SolutionFaq from "@/Component/Solution/SolutionFaq";

const getSolution = async (title) => {
  const res = await fetch(`/api/solution/get-solution-by-title?title=${title}`);
  const data = await res.json();
  return data;
};

const SolutionSection = () => {
  const router = useRouter();
  const { solution } = router?.query;
  const [solutionName, setsolutionName] = useState({});
  useEffect(() => {
    if (solution) {
      getSolution(solution?.split("-")?.join(" ")).then((data) => {
        setsolutionName(data?.data);
        console.log("response is here 123---> ", data);
      });
    }
  }, [solution]);
  // console.log(
  //   "here is all the data o solution section---->",
  //   solutionName
  // );

  return (
    <div>
      {/* headres */}
      <div className=" top-0 sticky z-10">
        <Nav />
      </div>

      {/* hero section */}
      <div className=" bg-background   md:mt-10 mt-10 shadow-lg py-16 px-4 lg:px-0">
        {/* <div className=" bg-background md:mt-0 mt-10 shadow-lg py-16 px-6 md:px-12"> */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-col md:items-cente lg:flex-row ">
          {/* Left Content */}
          <div className=" lg:w-1/2 w-full lg:px-5 md:pb-5">
            <h1 className="text-2xl md:text-[30px] font-semibold text-heading leading-tight mb-4">
              {solutionName?.title || "IT Solution for Oil & Gas Companies"}
            </h1>
            <p className="text-sm md:text-base">
              {solutionName?.description ||
                "IT Solution for Oil & Gas Companies description....."}
            </p>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 flex  justify-center mt-6 md:mt-0">
            <Image
              src={solutionName?.path || "/image/yyy.png"}
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
        <TableofSolution solutionName={solutionName} />
      </div>

      {/* Client & Testimonials */}

      <div>
        <Testimonial />
      </div>

      {/* Resource Section */}

      {/* this is FQA SECTION  */}
      <div>
        <SolutionFaq SolutionFaq={solutionName?.faq} />
      </div>

      {/* footer section */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default SolutionSection;
