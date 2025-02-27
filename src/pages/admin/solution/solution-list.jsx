import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCube,
  faArrowRightLong,
  faMagnifyingGlass,
  faEdit,
  faTrash,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import AdminLayout from "@/Component/admin/AdminLayout";

const getAllPost = async () => {
  return await (
    await fetch("/api/solution/solutionHero", { method: "GET" })
  ).json();
};

const AllPosts = () => {
  const [itineraries, setItineraries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items per page
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllPost().then((res) => {
      setItineraries(res|| []);
    });
  }, []);

  const deleteItem = async (id) => {
    // alert("button clicked")
    try {
      const res = await fetch(`/api/solution/solutionHero?id=${id}`, {
        method: "DELETE",
      });
      if (res?.ok) {
        alert("Item successfully deleted");
        getAllPost().then((res) => {
          setItineraries(res|| []);
        });
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let filteredItineraries = itineraries?.filter((itinerary) =>
    itinerary?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalItemsCount = filteredItineraries.length;
  const totalNumberOfPages = Math.ceil(totalItemsCount / itemsPerPage);
  const currentItems = filteredItineraries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <AdminLayout>
      <div>
        <div className="p-4 min-w-[768px] overflow-x-auto">
          <div className="flex justify-between items-center pb-5">
            <div className="flex items-center gap-5 text-primary pb-3">
              <FontAwesomeIcon icon={faCube} className="text-2xl" />
              <p className="text-[24px] text-black">All Solutions</p>
              <FontAwesomeIcon
                icon={faArrowRightLong}
                className="text-teal-700 text-xl"
              />
            </div>
            <label className="relative block">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-slate-400 text-sm"
                />
              </span>
              <input
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 h-8 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none sm:text-sm"
                placeholder="Search for package..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>
          </div>
          <table className="bg-[#FFFBF5] shadow-md table-auto w-full border-collapse border rounded-lg">
            <thead>
              <tr className="border rounded">
                <th className="py-2 bg-slate-600 text-white border text-[15px] pl-2">
                  Image
                </th>
                <th className="py-2 bg-slate-600 text-white border text-[15px] px-2">
                  Name
                </th>
                <th className="py-2 bg-slate-600 text-white border text-[15px] px-2">
                  Edit & Remove
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((itinerary) => (
                <tr className="border-b" key={itinerary?._id}>
                  <td className="py-2 pl-4 w-52">
                    <Image
                      className="w-40 h-16 object-cover rounded"
                      src={
                        itinerary?.path ||
                        "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      alt=""
                      width="1920"
                      height="1280"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/logo.png";
                      }}
                    />
                  </td>
                  <td className="py-4 pl-4 text-start border-x capitalize">
                    {itinerary?.title}
                  </td>
                  <td className="py-4 flex justify-center items-center gap-3">
                    <a href={"/admin/solution/solution/" + itinerary?._id}>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="font1 hover:text-primary cursor-pointer"
                      />
                    </a>
                    <button onClick={() => deleteItem(itinerary?._id)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="font1 hover:text-primary cursor-pointer"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center mt-4 gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className={`px-4 py-2 rounded-md bg-primary ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed text-gray-400"
                  : "text-teal-700 hover:text-teal-900"
              }`}
            >
              <FontAwesomeIcon icon={faChevronLeft} size="lg" />
            </button>
            {Array.from({ length: totalNumberOfPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === index + 1
                    ? "bg-teal-700 text-white"
                    : "text-teal-700 hover:bg-teal-100"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalNumberOfPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-4 py-2 rounded-md bg-primary ${
                currentPage === totalNumberOfPages
                  ? "opacity-50 cursor-not-allowed text-gray-400"
                  : "text-teal-700 hover:text-teal-900"
              }`}
            >
              <FontAwesomeIcon icon={faChevronRight} size="lg" />
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AllPosts;
