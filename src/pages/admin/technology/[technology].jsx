import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/Component/admin/AdminLayout";
import TechnologyHeroSection from "@/Component/admin/Technology/TechnologyHeroSection";
import TechnologyWhy4steps from "@/Component/admin/Technology/TechnologyWhy4steps";
import TechnologySuccessStories from "@/Component/admin/Technology/TechnologySuccessStories";
import TechnologySolutions from "@/Component/admin/Technology/TechnologySolutions";
import TechnologyProducts from "@/Component/admin/Technology/TechnologyProducts";
import TechnologyServices from "@/Component/admin/Technology/TechnologyServices";
import TechnologyBenefits from "@/Component/admin/Technology/TechnologyBenefits";
import TechnologyFaq from "@/Component/admin/Technology/TechnologyFaq";
import TechnologyOverview from "@/Component/admin/Technology/TechnologyOverview";
const postDataAccordingId = async (id) => {
  return await (await fetch(`/api/technology/${id}`)).json();
};
export default function CreateWebinar() {
  const router = useRouter();
  const { technology } = router?.query;
  const [blogData, setBlogData] = useState(null);
  const [activeTab, setActiveTab] = useState("Tab1");

  console.log("blog data is here ----> ", blogData);
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
    if (technology) {
      postDataAccordingId(technology).then((res) => {
        setBlogData(res?.data || null);

      });
    }
  }, [technology]);
  console.log("blog data is as ",blogData)
  return (
    <AdminLayout>
      <div className="flex items-center gap-5 text-primary pb-3">
        <p className="md:text-[28px] text-2xl text-black">Create Technology</p>
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
              Why 4steps Digital
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
              Related Solutions
            </button>
            <button
              onClick={() => setActiveTab("Tab5")}
              className={`${
                activeTab === "Tab5"
                  ? "border-b-2 scale-105 border-black text-black"
                  : "border-black text-slate-500"
              } px-3 py-1`}
            >
              Industry We serve
            </button>
            <button
              onClick={() => setActiveTab("Tab6")}
              className={`${
                activeTab === "Tab6"
                  ? "border-b-2 scale-105 border-black text-black"
                  : "border-black text-slate-500"
              } px-3 py-1`}
            >
              Related services
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
              TechnologyOverview
            </button>
          </>
        </div>
      </div>
      <div
        className={`tab-content ${activeTab === "Tab1" ? "block" : "hidden"}`}
      >
        <TechnologyHeroSection
          setActiveTab={setActiveTab}
          blogData={blogData}
        />
      </div>

      <>
        <div
          className={`tab-content ${activeTab === "Tab2" ? "block" : "hidden"}`}
        >
          <TechnologyWhy4steps
            blogData={blogData}
            setActiveTab={setActiveTab}
          />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab3" ? "block" : "hidden"}`}
        >
          <TechnologySuccessStories
            blogData={blogData}
            setActiveTab={setActiveTab}
          />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab4" ? "block" : "hidden"}`}
        >
          <TechnologySolutions
            blogData={blogData}
            setActiveTab={setActiveTab}
          />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab5" ? "block" : "hidden"}`}
        >
          <TechnologyProducts blogData={blogData} setActiveTab={setActiveTab} />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab6" ? "block" : "hidden"}`}
        >
          <TechnologyServices blogData={blogData} setActiveTab={setActiveTab} />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab7" ? "block" : "hidden"}`}
        >
          <TechnologyBenefits blogData={blogData} setActiveTab={setActiveTab} />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab8" ? "block" : "hidden"}`}
        >
          <TechnologyFaq blogData={blogData} setActiveTab={setActiveTab} />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab9" ? "block" : "hidden"}`}
        >
          <TechnologyOverview blogData={blogData} setActiveTab={setActiveTab} />
        </div>
      </>
    </AdminLayout>
  );
}
