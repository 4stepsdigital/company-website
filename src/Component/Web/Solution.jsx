import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const App = () => {
  const [solutiondata, setSolutionData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log(" all title data is here --->", solutiondata);
  const handleDataFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/solution/get-title`);
      const result = await response.json();
      setSolutionData(result);
      // console.log("------title here", result);
    } catch (err) {
      setError(err.message); // Set error message if fetch fails
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleDataFetch();
  }, []);
  if (loading) return <p className=" text-center">Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    // [#BFECFF]
    <div className="h-auto bg-background ">
      <div className="container-wrapper py-10">
        <div>
          <h2 className="md:text-3xl text-lg text-heading font-semibold pb-2 md:pb-4">
            Our Solutions
          </h2>
          <p className="text-sm md:text-lg md:px-0 px-3 pb-3">
            We have excelled in our experience across a wide range of industries
            to bring valuable insights and provide our clients with truly
            beneficial solutions.
          </p>
        </div>
        <div className="grid pl-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  mx-auto">
          {solutiondata.length > 0 &&
            solutiondata.map((item, index) => (
              <Link
                key={index}
                href={`/solution/${item?.title?.split(" ")?.join("-")}`}
              >
                <div
                  key={index}
                  className="group flex items-center justify-between bg-white rounded-lg shadow p-4 cursor-pointer transition-transform transform hover:scale-105"
                >
                  <span className="text-white bg-blue-900 px-3 py-2 rounded-full">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-gray-800 font-medium text-center flex-1 ml-2">
                    {item?.title}
                  </span>
                  <div className="right-2 bottom-1 absolute transform rotate-[50deg] group-hover:rotate-0 transition-transform duration-300">
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-blue-800"
                    />
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
