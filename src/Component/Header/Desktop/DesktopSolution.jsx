import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"; // Importing FontAwesome icons
import Skeleton, { AnotherComponent } from "@/Component/Web/Skeleton";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
const fetchAllSolutionType = async () => {
  const res = await fetch("/api/solution/masterS", { method: "GET" });
  return await res.json();
};

const fetchSolutionAccordingType = async (id) => {
  const res = await fetch(`/api/solution/get-solution?solutionType=${id}`);
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
          fetchSolutionAccordingType(res.data[0]?._id).then((data) => {
            setSolutionList(data?.data);
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching solution types:", error);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <div
        className={`relative inline-block text-base font-medium px-3 py-2 hover:text-orange-500`}
      >
        Solution
        <FontAwesomeIcon
          icon={isDropdownOpen ? faChevronUp : faChevronDown}
          className="ml-2 text-sm transition-transform duration-300"
        />
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute left-[-10vw] w-[65vw] bg-background border">
          <div className="flex max-w-7xl mx-auto">
            {/* Sidebar Menu */}
            <div className="w-1/4 border-r ">
              <h2 className="text-lg border-b py-2 bg-white hover:bg-background pl-2 font-semibold">
                Solutions
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
                      className="text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 pl-10 py-4">
              <h2 className="text-xl font-semibold border-b transition duration-200">
                {activeService ? activeService.name : "Select a solution type"}
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
                        href={`/solution/${link?.title?.split(" ")?.join("-")}`}
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
  );
};

export default DesktopSolution;
