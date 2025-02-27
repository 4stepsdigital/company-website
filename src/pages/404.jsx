import Nav from "@/Component/Header/Nav";
import Link from "next/link";
import React from "react";
const PageNotFound = () => {
  return (
    <>
      <Nav />
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50">
        <h1 className="text-9xl font-bold text-gray-400">
          <span className=" text-red-500">4</span>0
          <span className=" text-red-500">4</span>
        </h1>
        <div className=" px-5 text-center">
          <p className="md:text-2xl text-xl  font-semibold text-gray-800 mt-4">
            Sorry, we could not find this page.
          </p>
          <p className="text-gray-600 mt-2 ">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
        </div>
        <Link
          href="/"
          className="mt-6 px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
        >
          Back to homepage
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
