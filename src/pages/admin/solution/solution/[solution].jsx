import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/Component/admin/AdminLayout";
import SolutionHeroSection from "@/Component/admin/Solution/SolutionHeroSection";
import SolutionSuccessStories from "@/Component/admin/Solution/SolutionSuccessStories";
import SolutionSolutions from "@/Component/admin/Solution/SolutionSolutions";
import SolutionProducts from "@/Component/admin/Solution/SolutionProducts";
import SolutionServices from "@/Component/admin/Solution/SolutionServices";
import SolutionBenefits from "@/Component/admin/Solution/SolutionBenefits";
import SolutionFaq from "@/Component/admin/Solution/SolutionFaq";
import SolutionWhy4steps from "@/Component/admin/Solution/SolutionWhy4steps";
import SolutionOverview from "@/Component/admin/Solution/SolutionOverview";
const postDataAccordingId = async (id) => {
  return await (await fetch(`/api/solution/${id}`, { method: "GET" })).json();
};
export default function CreateWebinar() {
  const router = useRouter();
  const { solution } = router?.query;
  // console.log("solution -------- ",solution)
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
    if (solution) {
      postDataAccordingId(solution).then((res) => {
        setBlogData(res?.data || null);
      });
    }
  }, [solution]);
  return (
    <AdminLayout>
      <div className="flex items-center gap-5 text-primary pb-3">
        <p className="md:text-[28px] text-2xl text-black">Create Solution</p>
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
              Solutions we deliver
            </button>
            <button
              onClick={() => setActiveTab("Tab5")}
              className={`${
                activeTab === "Tab5"
                  ? "border-b-2 scale-105 border-black text-black"
                  : "border-black text-slate-500"
              } px-3 py-1`}
            >
              our Technology
            </button>
            <button
              onClick={() => setActiveTab("Tab6")}
              className={`${
                activeTab === "Tab6"
                  ? "border-b-2 scale-105 border-black text-black"
                  : "border-black text-slate-500"
              } px-3 py-1`}
            >
              Related Services
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
              OverView Section
            </button>
          </>
        </div>
      </div>
      <div
        className={`tab-content ${activeTab === "Tab1" ? "block" : "hidden"}`}
      >
        <SolutionHeroSection setActiveTab={setActiveTab} blogData={blogData} />
      </div>

      <>
        <div
          className={`tab-content ${activeTab === "Tab2" ? "block" : "hidden"}`}
        >
          <SolutionWhy4steps blogData={blogData} setActiveTab={setActiveTab} />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab3" ? "block" : "hidden"}`}
        >
          <SolutionSuccessStories
            blogData={blogData}
            setActiveTab={setActiveTab}
          />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab4" ? "block" : "hidden"}`}
        >
          <SolutionSolutions blogData={blogData} setActiveTab={setActiveTab} />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab5" ? "block" : "hidden"}`}
        >
          <SolutionProducts blogData={blogData} setActiveTab={setActiveTab} />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab6" ? "block" : "hidden"}`}
        >
          <SolutionServices blogData={blogData} setActiveTab={setActiveTab} />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab7" ? "block" : "hidden"}`}
        >
          <SolutionBenefits blogData={blogData} setActiveTab={setActiveTab} />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab8" ? "block" : "hidden"}`}
        >
          <SolutionFaq blogData={blogData} setActiveTab={setActiveTab} />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab9" ? "block" : "hidden"}`}
        >
          <SolutionOverview blogData={blogData} setActiveTab={setActiveTab} />
        </div>
      </>
    </AdminLayout>
  );
}
