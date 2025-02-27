import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faCube } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const  IndustryHeroSection=({ setActiveTab, blogData })=> {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [industryName, setIndustryName] = useState("");
  const [description, setDescription] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [editorHtmlDescription, setEditorHtmlDescription] = useState("");

 
  const router = useRouter();
  useEffect(() => {
    setTitle(blogData?.title || "");
    setIndustryName(blogData?.industryName || "");
    setDescription(blogData?.description || "");
    setPreview(blogData?.path || "");
    setEditorHtmlDescription(blogData?.contentsummary || "");
  }, [blogData]);
  // Function to handle file input change
  function handleChange(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  }

 




  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
    ],
  };
  // Function to handle image upload or update
  async function handleUpload() {
    if (!file && !isUpdating) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    if (!file && !title && !selectTopic && !selectDepartment && !selectIndustry && !selectTools) {
      alert("Please upload file and  write title");
      return;
    }

    if (file && title) {
      formData.append("file", file);
      formData.append("industryName", industryName);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("contentsummary", editorHtmlDescription);
    }
    try {
      const res = await fetch(
        `/api/industry/${blogData ? blogData?._id : "industry-hero"}`,
        {
          method: blogData ? "PUT" : "POST",
          body: formData,
        }
      );
      const data1 = await res.json();
      // console.log("data1--->",data1?.data?._id)
      if (res?.ok) {
        router.push("/admin/Industry/industry/" + data1?.data?._id);
        setActiveTab("Tab2");
        alert(`File ${blogData ? "updated" : "uploaded"} successfully`);
      } else {
        alert(`File ${blogData ? "update" : "upload"} failed`);
      }
    } catch (error) {
      console.error(
        `Error ${blogData ? "updating" : "uploading"} file:`,
        error
      );
    }
  }
  return (
    <>
      <div className="p-4 mb-5 rounded-md bg-white shadow-[0_0px_10px_-3px_rgba(0,0,0,0.3)]  border-l-2 border-teal-600">
        <p className="text-base font-semibold mb-2">Industry Hero Section Detail</p>
        <div className="p-4">
          <div className="flex xl:flex-row flex-col md:gap-10 gap-5 items-center xl:pl-5">
            <div className=" flex flex-1 my-7">
              <input
                type="file"
                className="mb-4 ml-3"
                onChange={handleChange}
              />
              <div>
                {preview && (
                  <Image
                    className="md:w-36 w-auto h-auto shadow-md mb-4"
                    src={preview}
                    alt="Preview"
                    width={150}
                    height={200}
                  />
                )}
              </div>
            </div>
            <div className="flex-1 my-5">
            <div>
                <label htmlFor="title" className=" font-semibold">
                  Industry Name
                </label>
                <input
                  className="py-0.5 mb-2 w-full  border rounded h-8 px-2 focus:border-primary outline-none"
                  type="text"
                  id="industryName"
                  value={industryName}
                  placeholder="Enter Industry Here"
                  onChange={(e) => setIndustryName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="title" className=" font-semibold">
                  Title
                </label>
                <input
                  className="py-0.5 mb-2 w-full  border rounded h-8 px-2 focus:border-primary outline-none"
                  type="text"
                  id="title"
                  value={title}
                  placeholder="Enter Title Here"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="textarea" className=" font-semibold">
                Title Description
                </label>
                <textarea
                  name=""
                  id="textarea"
                  className="mt-1 mb-2 w-full border rounded h-28 px-2 focus:border-primary outline-none py-1"
                  placeholder="Enter Description Here"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="w-full">
            <h3 className=" font-semibold mb-2">Industry Summary</h3>
            <QuillNoSSRWrapper
              className="rounded h-48 mb-16"
              theme="snow"
              value={editorHtmlDescription}
              onChange={setEditorHtmlDescription}
              placeholder="Enter Your Answer"
              modules={modules}
            />
          </div>
          <div className="flex md:flex-row flex-col md:gap-5 gap-3">
            <button
              className=" bg-black text-white px-3 py-2 w-full md:w-auto rounded"
              onClick={handleUpload}
            >
              {blogData ? "Update " : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default  IndustryHeroSection
