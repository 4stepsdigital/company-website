import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/Component/admin/AdminLayout";
import IndustryHeroSection from "@/Component/admin/Industry/IndustryHeroSection";
import IndustryWhy4steps from "@/Component/admin/Industry/IndustryWhy4steps";
import IndustrySuccessStories from "@/Component/admin/Industry/IndustrySuccessStories";
import IndustrySolutions from "@/Component/admin/Industry/IndustrySolutions";
import IndustryProducts from "@/Component/admin/Industry/IndustryProducts";
import IndusServices from "@/Component/admin/Industry/IndusServices";
import IndusBenefits from "@/Component/admin/Industry/IndusBenefits";
import IndusFaq from "@/Component/admin/Industry/IndusFaq";
import IndustryOverview from "@/Component/admin/Industry/IndustryOverview";
const postDataAccordingId = async (id) => {
  return await (await fetch(`/api/industry/${id}`)).json();
};
export default function CreateWebinar() {
  const router = useRouter();
  const { industry } = router?.query;
  const [blogData, setBlogData] = useState(null);
  const [activeTab, setActiveTab] = useState("Tab1");
  useEffect(() => {
    if (activeTab === "Tab1") {
      setActiveTab("Tab2");
    } else if (activeTab === "Tab2") {
      setActiveTab("Tab3");
    } else if (activeTab === "Tab3") {
      setActiveTab("Tab4");
    } else if (activeTab === "Tab4") {
      setActiveTab("Tab5");
    } else if (activeTab === "Tab5") {
      setActiveTab("Tab6");
    } else if (activeTab === "Tab6") {
      setActiveTab("Tab7");
    } else if (activeTab === "Tab7") {
      setActiveTab("Tab8");
    } else if (activeTab === "Tab8") {
      setActiveTab("Tab9");
    }
  }, []);
  useEffect(() => {
    if (industry) {
      postDataAccordingId(industry).then((res) => {
        setBlogData(res?.data || null);
      });
    }
  }, [industry]);
  return (
    <AdminLayout>
      <div className="flex items-center gap-5 text-primary pb-3">
        <p className="md:text-[28px] text-2xl text-black">Create Industry</p>
      </div>
      <div className="border-b border-slate-300 mb-5">
        <div className="flex gap-2 text-[14px] pt-3 pb-2 flex-wrap">
          <button
            onClick={() => setActiveTab("Tab1")}
            className={`${
              activeTab === "Tab1"
                ? "border-b-2 scale-105 border-black text-black"
                : "border-black text-slate-500"
            } px-3 py-1`}
          >
            Hero Section
          </button>
          <>
            <button
              onClick={() => setActiveTab("Tab2")}
              className={`${
                activeTab === "Tab2"
                  ? "border-b-2 scale-105 border-black text-black"
                  : "border-black text-slate-500"
              } px-3 py-1`}
            >
              Why 4steps
            </button>
            <button
              onClick={() => setActiveTab("Tab3")}
              className={`${
                activeTab === "Tab3"
                  ? "border-b-2 scale-105 border-black text-black"
                  : "border-black text-slate-500"
              } px-3 py-1`}
            >
              Success stories
            </button>
            <button
              onClick={() => setActiveTab("Tab4")}
              className={`${
                activeTab === "Tab4"
                  ? "border-b-2 scale-105 border-black text-black"
                  : "border-black text-slate-500"
              } px-3 py-1`}
            >
              Related Solution
            </button>
            <button
              onClick={() => setActiveTab("Tab5")}
              className={`${
                activeTab === "Tab5"
                  ? "border-b-2 scale-105 border-black text-black"
                  : "border-black text-slate-500"
              } px-3 py-1`}
            >
              Technology We Use
            </button>
            <button
              onClick={() => setActiveTab("Tab6")}
              className={`${
                activeTab === "Tab6"
                  ? "border-b-2 scale-105 border-black text-black"
                  : "border-black text-slate-500"
              } px-3 py-1`}
            >
              Our services
            </button>
            <button
              onClick={() => setActiveTab("Tab7")}
              className={`${
                activeTab === "Tab7"
                  ? "border-b-2 scale-105 border-black text-black"
                  : "border-black text-slate-500"
              } px-3 py-1`}
            >
              Benefits/Results
            </button>
            <button
              onClick={() => setActiveTab("Tab8")}
              className={`${
                activeTab === "Tab8"
                  ? "border-b-2 scale-105 border-black text-black"
                  : "border-black text-slate-500"
              } px-3 py-1`}
            >
              Faq Section
            </button>
            <button
              onClick={() => setActiveTab("Tab9")}
              className={`${
                activeTab === "Tab9"
                  ? "border-b-2 scale-105 border-black text-black"
                  : "border-black text-slate-500"
              } px-3 py-1`}
            >
              IndustryOverview
            </button>
          </>
        </div>
      </div>
      <div
        className={`tab-content ${activeTab === "Tab1" ? "block" : "hidden"}`}
      >
        <IndustryHeroSection setActiveTab={setActiveTab} blogData={blogData} />
      </div>

      <>
        <div
          className={`tab-content ${activeTab === "Tab2" ? "block" : "hidden"}`}
        >
          <IndustryWhy4steps blogData={blogData} setActiveTab={setActiveTab} />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab3" ? "block" : "hidden"}`}
        >
          <IndustrySuccessStories
            blogData={blogData}
            setActiveTab={setActiveTab}
          />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab4" ? "block" : "hidden"}`}
        >
          <IndustrySolutions blogData={blogData} setActiveTab={setActiveTab} />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab5" ? "block" : "hidden"}`}
        >
          <IndustryProducts blogData={blogData} setActiveTab={setActiveTab} />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab6" ? "block" : "hidden"}`}
        >
          <IndusServices blogData={blogData} setActiveTab={setActiveTab} />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab7" ? "block" : "hidden"}`}
        >
          <IndusBenefits blogData={blogData} setActiveTab={setActiveTab} />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab8" ? "block" : "hidden"}`}
        >
          <IndusFaq blogData={blogData} setActiveTab={setActiveTab} />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab9" ? "block" : "hidden"}`}
        >
          <IndustryOverview blogData={blogData} setActiveTab={setActiveTab} />
        </div>
      </>
    </AdminLayout>
  );
}
