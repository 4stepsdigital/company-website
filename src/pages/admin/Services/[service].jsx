import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/Component/admin/AdminLayout";
import SerHeroSection from "@/Component/admin/Services/SerHeroSection";
import SerWhy4Steps from "@/Component/admin/Services/SerWhy4Steps";
import SerSuccessStories from "@/Component/admin/Services/SerSuccessStories";
import SerSolution from "@/Component/admin/Services/SerSolution";
import SerProduct from "@/Component/admin/Services/SerProduct";
import SerService from "@/Component/admin/Services/SerService";
import SerBenifits from "@/Component/admin/Services/SerBenifits";
import SerFaq from "@/Component/admin/Services/SerFaq";
import ServiceOverView from "@/Component/admin/Services/ServiceOverView";

const postDataAccordingId = async (id) => {
  return await (await fetch(`/api/service/${id}`, { method: "GET" })).json();
};
export default function CreateWebinar() {
  const router = useRouter();
  const { service } = router?.query;
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
    if (service) {
      postDataAccordingId(service).then((res) => {
        setBlogData(res?.data || null);
      });
    }
  }, [service]);

  return (
    <AdminLayout>
      <div className="flex items-center gap-5 text-primary pb-3">
        <p className="md:text-[28px] text-2xl text-black">Create Service</p>
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
              Technology We use
            </button>
            <button
              onClick={() => setActiveTab("Tab6")}
              className={`${
                activeTab === "Tab6"
                  ? "border-b-2 scale-105 border-black text-black"
                  : "border-black text-slate-500"
              } px-3 py-1`}
            >
              Industry We Serve
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
              Overview of Service
            </button>
          </>
        </div>
      </div>
      <div
        className={`tab-content ${activeTab === "Tab1" ? "block" : "hidden"}`}
      >
        <SerHeroSection setActiveTab={setActiveTab} blogData={blogData} />
      </div>

      <>
        <div
          className={`tab-content ${activeTab === "Tab2" ? "block" : "hidden"}`}
        >
          <SerWhy4Steps blogData={blogData} setActiveTab={setActiveTab} />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab3" ? "block" : "hidden"}`}
        >
          <SerSuccessStories blogData={blogData} setActiveTab={setActiveTab} />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab4" ? "block" : "hidden"}`}
        >
          <SerSolution blogData={blogData} setActiveTab={setActiveTab} />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab5" ? "block" : "hidden"}`}
        >
          <SerProduct blogData={blogData} setActiveTab={setActiveTab} />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab6" ? "block" : "hidden"}`}
        >
          <SerService blogData={blogData} setActiveTab={setActiveTab} />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab7" ? "block" : "hidden"}`}
        >
          <SerBenifits blogData={blogData} setActiveTab={setActiveTab} />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab8" ? "block" : "hidden"}`}
        >
          <SerFaq blogData={blogData} setActiveTab={setActiveTab} />
        </div>
        <div
          className={`tab-content ${activeTab === "Tab9" ? "block" : "hidden"}`}
        >
          <ServiceOverView blogData={blogData} setActiveTab={setActiveTab} />
        </div>
      </>
    </AdminLayout>
  );
}
