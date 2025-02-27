import React, { useEffect, useState } from "react";
import Link from "next/link";
const fetchAllSolutionType = async () => {
  const res = await fetch("/api/service/master-service", { method: "GET" });
  return await res.json();
};

const fetchSolutionAccordingType = async (id) => {
  const res = await fetch(`/api/service/get-service?serviceType=${id}`);
  return await res.json();
};

const ServicesScienceSoft = () => {
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState([]); // Set default to the first service
  const [serviceTypeList, setServieTypeList] = useState([]);

  useEffect(() => {
    fetchAllSolutionType().then((res) => {
      setServices(res?.data || []);
      setActiveService(res?.data?.[0]);
    });
  }, []);

  useEffect(() => {
    if (activeService) {
      fetchSolutionAccordingType(activeService?._id).then((res) => {
        // console.log("res 123456789-------> is here ---> ", res);
        setServieTypeList(res?.data || []);
      });
    }
  }, [activeService]);

  return (
    <div className=" w-full bg-white">
      <div className="container-wrapper md:pt-10 pt-5 ">
        <div className=" pb-5">
          <h2 className="md:text-3xl text-xl   text-heading font-semibold pb-5">
            Our Services
          </h2>
          <p className="text-sm md:text-lg pb-3">
            We have excelled our experience in a wide range of industries to
            bring valuable insights and provide our clients with truly
            beneficial solutions.
          </p>
        </div>

        <div className="w-full   border rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar Menu */}
            <div className="w-full md:w-1/3  bg-blue-50 px-4 py-3">
              {services?.length > 0 &&
                services?.map((service, index) => (
                  <div
                    key={index}
                    className={`md:py-3 md:px-4 py-2 px-3 md:text-xl text-lg   font-semibold cursor-pointer hover:text-blue-500 transition ${
                      activeService?.name === service.name
                        ? "bg-heading text-white hover:text-white"
                        : "text-[#004985]"
                    }`}
                    onClick={() => setActiveService(service)}
                  >
                    {service?.name}
                  </div>
                ))}
            </div>
            {/* Content Area */}
            <div className="w-full lg:h-[90vh] md:h-[65vh] overflow-hidden md:flex-1 px-3  md:px-16 md:py-10 py-8">
              <h2 className="md:text-2xl text-lg text-heading font-semibold mb-3 ">
                {activeService?.name}
              </h2>
              <p className="text-gray-700 text-sm line-clamp-3 md:text-lg mb-5">
                {activeService?.description}
              </p>
              <div className="grid grid-cols-1 md:px-0 px-3  sm:grid-cols-2 gap-4">
                {serviceTypeList?.length > 0 &&
                  serviceTypeList?.map((link, index) => (
                    <Link
                      key={link?._id}
                      href={`/services/${link?.title?.split(" ")?.join("-")}`}
                    >
                      <ul className=" custom-list-service ">
                        <li className=" md:text-lg text-base   underline decoration-heading cursor-pointer">
                          {link.title}
                        </li>
                      </ul>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesScienceSoft;
