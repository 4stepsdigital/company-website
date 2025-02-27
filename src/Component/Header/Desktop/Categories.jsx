import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"; // Importing FontAwesome icons
import Skeleton, { AnotherComponent } from "@/Component/Web/Skeleton";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
const fetchAllSolutionType = async () => {
  const res = await fetch("/api/service/master-service", { method: "GET" });
  return await res.json();
};

const fetchSolutionAccordingType = async (id) => {
  const res = await fetch(`/api/service/get-service?serviceType=${id}`);
  return await res.json();
};

const DesktopSolution = ({ activeLink, handleLinkClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [solutionType, setSolutionType] = useState([]);
  const [solutionList, setSolutionList] = useState([]);
  const [solutionId, setSolutionId] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading

  useEffect(() => {
    if (solutionId) {
      setLoading(true); // Start loading
      fetchSolutionAccordingType(solutionId)
        .then((data) => {
          setSolutionList(data?.data);
        })
        .catch((error) => {
          console.error("Error fetching solutions:", error);
        })
        .finally(() => {
          setLoading(false); // Stop loading
        });
    }
  }, [solutionId]);

  useEffect(() => {
    setLoading(true); // Start loading
    fetchAllSolutionType()
      .then((res) => {
        // console.log("Fetched solution types-------->:", res.data);
        setSolutionType(res.data);
        if (res.data && res.data.length > 0) {
          setActiveService(res.data[0]);
        }
        fetchSolutionAccordingType(res.data[0]?._id).then((data) => {
          setSolutionList(data?.data);
        });
      })
      .catch((error) => {
        console.error("Error fetching solution types:", error);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  }, []);

  return (
    <>
      <div>
        <div
          className="inline-block text-base font-medium px-3 py-2   text-gray-800"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div
            className={`cursor-pointer  hover:text-orange-500 flex items-center relative group`}
          >
            Services
            <FontAwesomeIcon
              icon={isDropdownOpen ? faChevronUp : faChevronDown}
              className="ml-2 text-sm transition-transform duration-300"
            />
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute  left-10 right-0 mt-2 bg-background   shadow-lg border  border-gray-100 z-50 md:mx-20 lg:mx-40">
              <div className="flex  max-w-7xl  mx-auto">
                {/* Sidebar Menu */}
                <div className="w-1/4 border-r ">
                  <h2 className="text-lg border-b bg-white hover:bg-background py-2 pl-2 font-semibold">
                    Services
                  </h2>

                  {solutionType?.map((solution) => (
                    <div
                      key={solution?._id}
                      className="py-3 text-md rounded font-normal px-4 cursor-pointer bg-white hover:bg-background flex justify-between transition-colors"
                      onMouseEnter={() => {
                        setActiveService(solution);
                        setSolutionId(solution?._id);
                      }}
                      onClick={() => {
                        setActiveService(solution);
                        setSolutionId(solution?._id);
                      }}
                    >
                      <div className="flex items-center text-sm justify-between  w-full">
                        <span>{solution?.name}</span>
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 pl-10 py-4">
                  <h2 className="text-xl font-semibold border-b transition duration-200">
                    {activeService
                      ? activeService.name
                      : "Select a solution type"}
                  </h2>

                  {/* Loading State */}
                  {loading ? (
                    <Skeleton />
                  ) : (
                    // Show loading message or spinner
                    <div className="">
                      {solutionList?.map((link) => {
                        return (
                          <Link
                            key={link?._id}
                            href={`/services/${link?.title
                              ?.split(" ")
                              ?.join("-")}`}
                          >
                            <p className="text-gray-800 text-[14px] py-1 flex gap-1 items-center hover:text-orange-500 transition duration-200">
                              <FontAwesomeIcon
                                icon={faChevronRight}
                                className="text-[10px]"
                                size={10}
                              />
                              {link?.title}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DesktopSolution;
