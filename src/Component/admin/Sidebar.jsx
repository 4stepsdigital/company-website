import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faSliders,
  faBook,
  faBlog,
  faCartShopping,
  faFile,
  faGear,
  faRightFromBracket,
  faTag,
  faLayerGroup,
  faUsers,
  faHome,
  faComment,
  faUser,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(null);
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);

  const sidebarTabs = useMemo(
    () => [
      {
        label: "Home Page",
        icon: () => <FontAwesomeIcon icon={faHome} />,

        subMenu: [
          { label: "Banner", href: "#" },
          { label: "Other Management", href: "/admin/home/manage" },
          { label: "Home Faq", href: "/admin/home/homefaq" },
        ],
      },

      ,
      {
        label: "Global",
        icon: () => <FontAwesomeIcon icon={faChartSimple} />,
        href: "/admin",
      },
      {
        label: "User",
        icon: () => <FontAwesomeIcon icon={faUser} />,
        subMenu: [
          { label: "User as Speaker", href: "/admin/user/user" },
          { label: "List Of User", href: "/admin/user/list-user" },
        ],
      },
      {
        label: "Parters",
        icon: () => <FontAwesomeIcon icon={faUser} />,
        subMenu: [
          {
            label: "Partners",
            // change url according to the bizare expendition
            href: "/admin/partner/partner",
          },
        ],
      },

      {
        label: "Webinar ",
        icon: () => <FontAwesomeIcon icon={faSliders} />,
        subMenu: [
          {
            label: "Webinar Master",
            // change url according to the bizare expendition
            href: "/admin/webinar/master-webinar",
          },
          {
            label: "Webinar Promo",
            // change url according to the bizare expendition
            href: "/admin/webinar/webinar-promo",
          },
          {
            label: "Create Webinar",
            href: "/admin/webinar/create-webinar",
          },
          {
            label: "Webinar List",
            href: "/admin/webinar/list-webinar",
          },
        ],
      },
      {
        label: "Industry ",
        icon: () => <FontAwesomeIcon icon={faSliders} />,
        subMenu: [
          {
            label: "Create-industry",
            // change url according to the bizare expendition
            href: "/admin/Industry/industry-create",
          },
          {
            label: "Industry-list",
            // change url according to the bizare expendition
            href: "/admin/Industry/industry-list",
          },
        ],
      },
      {
        label: "Technology ",
        icon: () => <FontAwesomeIcon icon={faSliders} />,
        subMenu: [
          {
            label: "Technology-master",
            // change url according to the bizare expendition
            href: "/admin/technology",
          },
          {
            label: "Create-technology",
            // change url according to the bizare expendition
            href: "/admin/technology/technology-create",
          },
          {
            label: "Technology-list",
            // change url according to the bizare expendition
            href: "/admin/technology/technology-list",
          },
        ],
      },
      {
        label: "Services",
        icon: () => <FontAwesomeIcon icon={faSliders} />,
        subMenu: [
          {
            label: "Master Service",
            // change url according to the bizare expendition
            href: "/admin/Services/master-service",
          },
          {
            label: "Create-Services",
            // change url according to the bizare expendition
            href: "/admin/Services/service-create",
          },
          {
            label: "Services-list",
            // change url according to the bizare expendition
            href: "/admin/Services/service-list",
          },
        ],
      },
      {
        label: "Solution",
        icon: () => <FontAwesomeIcon icon={faSliders} />,
        subMenu: [
          {
            label: "Master-Solution",
            // change url according to the bizare expendition
            href: "/admin/solution/master-solution",
          },
          {
            label: "Create-Solution",
            // change url according to the bizare expendition
            href: "/admin/solution/solution-create",
          },
          {
            label: "Solution-list",
            // change url according to the bizare expendition
            href: "/admin/solution/solution-list",
          },
        ],
      },

      {
        label: "Our Teams",
        icon: () => <FontAwesomeIcon icon={faUsers} />,
        subMenu: [
          { label: "Add Team here", href: "/admin/teams/team" },
          { label: "List of team", href: "/admin/teams/listofTeam" },
        ],
      },
      {
        label: "product",
        icon: () => <FontAwesomeIcon icon={faLayerGroup} />,
        subMenu: [
          { label: "Product Promo", href: "/admin/product/product-master" },
          { label: "Create Product", href: "/admin/product/create-product" },
          {
            label: "product Listing",
            href: "/admin/product/listing-product",
          },
        ],
      },
      {
        label: "Testimonial",
        icon: () => <FontAwesomeIcon icon={faComment} />,
        subMenu: [
          {
            label: "Add Testimonial Here",
            href: "/admin/testimonial/testimonial",
          },
          {
            label: "List Of Testimonial",
            href: "/admin/testimonial/list-testimonial",
          },
          {
            label: "Testimonial Bg Banner",
            href: "/admin/testimonial/bg-banner",
          },
        ],
      },
      {
        label: "Case Studies",
        icon: () => <FontAwesomeIcon icon={faBook} />,
        subMenu: [
          {
            label: "Case-study Promo",
            href: "/admin/casestudy/case-study-master",
          },
          {
            label: "Create case Study",
            href: "/admin/casestudy/create-case-study",
          },
          {
            label: "Listing Case Study",
            href: "/admin/casestudy/listing-case",
          },
        ],
      },

      {
        label: "Demoes & videos",
        icon: () => <FontAwesomeIcon icon={faCartShopping} />,
        subMenu: [
          {
            label: "user or video Maker",
            href: "/admin/demovideo/videomaker/user",
          },
          {
            label: "listing of user",
            href: "/admin/demovideo/videomaker/listing-user",
          },
          { label: "Video Promo", href: "/admin/demovideo/video-master" },
          { label: "Create Videos", href: "/admin/demovideo/create-video" },
          {
            label: "Listing the Videos",
            href: "/admin/demovideo/listing-video",
          },
        ],
      },
      {
        label: "Blog",
        icon: () => <FontAwesomeIcon icon={faBlog} />,
        subMenu: [
          { label: "Blog Promo", href: "/admin/blog/blogpromo" },
          { label: "Create", href: "/admin/blog/blog-create" },
          { label: " Blog-lists ", href: "/admin/blog/blog-listing" },
        ],
      },
      {
        label: "Change Password",
        icon: () => <FontAwesomeIcon icon={faTag} />,
        href: "/admin/change-password",
      },
    ],
    []
  );

  useEffect(() => {
    // Determine the active tab and submenu based on the current URL
    sidebarTabs.forEach((tab) => {
      if (tab.subMenu) {
        tab.subMenu.forEach((subMenu) => {
          if (router.pathname === subMenu.href) {
            setActiveTab(tab.label);
            setSelectedSubMenu(subMenu.label);
          }
        });
      } else if (router.pathname === tab.href) {
        setActiveTab(tab.label);
      }
    });
  }, [router.pathname, sidebarTabs]);

  const handleTabToggle = (tabName) => {
    setActiveTab((prevTab) => (prevTab === tabName ? null : tabName));
    console.log("Toggle Button clicked");
    setSelectedSubMenu(null);
  };

  const handleSubMenuClick = (subMenuLabel, parentLabel) => {
    setSelectedSubMenu(subMenuLabel);
    console.log("Submenu Button clicked");
    setActiveTab(parentLabel); // Ensure the parent tab remains open
  };

  const renderSubMenu = (items, parentLabel) => {
    return (
      <div
        className={`pl-4 my-2 py-2 text-para bg-slate-50 rounded-md text-black ${
          activeTab === parentLabel ? "block" : "hidden"
        }`}
      >
        {items.map((item, index) => (
          <a href={item.href} key={index}>
            <p
              onClick={() => handleSubMenuClick(item.label, parentLabel)}
              className={`text-[12px] cursor-pointer hover:underline hover:font-semibold hover:text-orange-500 ${
                selectedSubMenu === item.label ? "text-green-500 " : ""
              }`}
            >
              {item?.label}
            </p>
          </a>
        ))}
      </div>
    );
  };

  const handleLogout = async () => {
    const res = await fetch(`/api/auth/logout`, {
      method: "POST",
    });

    if (res?.ok) {
      toast.success(" Log Out Successfully");
      router.push("/admin/login");
    }
  };

  return (
    <div className="text-[14px] text-[#f5f7fb] font-sans p-4 md:w-full">
      <div className="flex flex-col gap-5">
        <div className="sm:flex items-center block gap-4 py-4 border-b border-b-white">
          <Image
            className="w-16 border-2 border-primary rounded-full"
            src="/image/1.png"
            alt="User"
            width={320}
            height={400}
          />
          <span className="text-md tracking-wide leading-5 border-l mt-2 md:mt-0 md:py-1 pl-2 md:pl-4 font-bold bg-gradient-to-r from-primary via-amber-400 to-white inline-block text-transparent bg-clip-text">
            FourSteps
            <br />
          </span>
        </div>
        {sidebarTabs.map((tab, index) => (
          <div key={index} className="relative group">
            {tab.subMenu ? (
              <div
                onClick={() => handleTabToggle(tab.label)}
                className={`flex justify-between items-center cursor-pointer ${
                  activeTab === tab.label ? "text-green-500 font-semibold" : ""
                } group-hover:text-orange-500`}
              >
                <div className="flex items-center gap-2">
                  <tab.icon size={20} />{" "}
                  {/* Use the icon component correctly */}
                  <p className="cursor-pointer">{tab.label}</p>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`transition-transform duration-200 ${
                      activeTab === tab.label ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
            ) : (
              <Link href={tab.href}>
                <div
                  className={`flex items-center gap-2 ${
                    activeTab === tab.label
                      ? "text-green-500 font-semibold"
                      : ""
                  } hover:text-orange-500`}
                >
                  <tab.icon size={20} />{" "}
                  {/* Use the icon component correctly */}
                  <p className="cursor-pointer">{tab.label}</p>
                </div>
              </Link>
            )}
            {tab.subMenu && (
              <div
                className={` left-0 w-full group-hover:block ${
                  activeTab === tab.label ? "block" : "hidden"
                }`}
              >
                {renderSubMenu(tab.subMenu, tab.label)}
              </div>
            )}
          </div>
        ))}
        <div
          className={`flex items-center gap-2 ${
            activeTab === "Logout" ? "text-green-500 font-semibold" : ""
          } hover:text-orange-500`}
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faRightFromBracket} size={20} />{" "}
          {/* Use the icon component correctly */}
          <p className="cursor-pointer">Logout </p>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        // hideProgressBar={false}
        // newestOnTop={false}
        // closeOnClick={false}
        // rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
        // theme="light"
      />
    </div>
  );
};

export default Sidebar;
