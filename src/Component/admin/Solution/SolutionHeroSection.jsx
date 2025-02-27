import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "react-quill/dist/quill.snow.css";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const SolutionHeroSection = ({ setActiveTab, blogData }) => {
  const [listSolution, setListSolution] = useState([]);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [solutionName, setSolutionName] = useState("");
  const [description, setDescription] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [editorHtmlDescription, setEditorHtmlDescription] = useState("");
  const [solutionType, setSolutionType] = useState("");

  const router = useRouter();

  // Fetching solutions
  const GetSolution = async () => {
    try {
      const response = await fetch("/api/solution/masterS");
      const data = await response.json();
      setListSolution(data.data);
    } catch (error) {
      console.error("Error fetching solutions:", error);
    }
  };

  useEffect(() => {
    GetSolution();
  }, []);

  useEffect(() => {
    setTitle(blogData?.title || "");
    setSolutionName(blogData?.solutionName || "");
    setDescription(blogData?.description || "");
    setPreview(blogData?.path || "");
    // setEditorHtmlDescription(blogData?.contentsummary || "");
    setSolutionType(blogData?.solutionType || "");
  }, [blogData]);

  // Handle file input change
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  // const modules = {
  //   toolbar: [
  //     [{ header: "1" }, { header: "2" }],
  //     ["bold", "italic", "underline", "strike", "blockquote"],
  //     [
  //       { list: "ordered" },
  //       { list: "bullet" },
  //       { indent: "-1" },
  //       { indent: "+1" },
  //     ],
  //     ["link"],
  //   ],
  // };

  // Handle upload or update
  const handleUpload = async () => {
    if (!file && !isUpdating) {
      alert("Please select a file to upload.");
      return;
    }

    if (!file && !title && !solutionName && !description) {
      alert("Please provide all required fields.");
      return;
    }
    // alert("hi")
    const formData = new FormData();
    formData.append("file", file);
    formData.append("solutionName", solutionName);
    formData.append("title", title);
    formData.append("description", description);
    // formData.append("contentsummary", editorHtmlDescription);
    formData.append("solutionType", solutionType);

    try {
      const res = await fetch(
        `/api/solution/${blogData ? blogData?._id : "solutionHero"}`,
        {
          method: blogData ? "PUT" : "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("Upload Response:", data);

      if (res.ok) {
        alert(`File ${blogData ? "updated" : "uploaded"} successfully`);
        router.push(`/admin/solution/solution/${data?.data?._id}`);
        setActiveTab("Tab2");
      } else {
        alert(`File ${blogData ? "update" : "upload"} failed`);
      }
    } catch (error) {
      console.error(
        `Error ${blogData ? "updating" : "uploading"} file:`,
        error
      );
    }
  };

  return (
    <div className="p-4 mb-5 rounded-md bg-white shadow-[0_0px_10px_-3px_rgba(0,0,0,0.3)] border-l-2 border-teal-600">
      <p className="text-base font-semibold mb-2">
        Solution Hero Section Detail
      </p>
      <div className="p-4">
        <div className="flex xl:flex-row flex-col md:gap-10 gap-5 items-center xl:pl-5">
          <div className="flex flex-1 my-7">
            <input type="file" className="mb-4 ml-3" onChange={handleChange} />
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
              <label htmlFor="solutionType" className="font-semibold">
                Solution Type
              </label>
              <select
                id="solutionType"
                className="py-0.5 capitalize mb-2 w-full border rounded h-8 px-2 focus:border-primary outline-none"
                value={solutionType} // Bind the state variable to the select element
                onChange={(e) => setSolutionType(e.target.value)} // Update state when value changes
              >
                <option value="">Select Solution Type</option>
                {listSolution?.map((item, index) => (
                  <option key={index} value={item?._id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="solutionName" className="font-semibold">
                Solution Name
              </label>
              <input
                id="solutionName"
                className="py-0.5 mb-2 w-full border rounded h-8 px-2 focus:border-primary outline-none"
                type="text"
                value={solutionName}
                placeholder="Enter Solution Name Here"
                onChange={(e) => setSolutionName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="title" className="font-semibold">
                Title
              </label>
              <input
                id="title"
                className="py-0.5 mb-2 w-full border rounded h-8 px-2 focus:border-primary outline-none"
                type="text"
                value={title}
                placeholder="Enter Title Here"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description" className="font-semibold">
                Title Description
              </label>
              <textarea
                id="description"
                className="mt-1 mb-2 w-full border rounded h-28 px-2 focus:border-primary outline-none py-1"
                placeholder="Enter Description Here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        {/* <div className="w-full">
          <h3 className="font-semibold mb-2">Solution Summary</h3>
          <QuillNoSSRWrapper
            className="rounded h-48 mb-16"
            theme="snow"
            value={editorHtmlDescription}
            onChange={setEditorHtmlDescription}
            placeholder="Enter Your Answer"
            modules={modules}
          />
        </div> */}
        <div className="flex md:flex-row flex-col md:gap-5 gap-3">
          <button
            className="bg-black text-white px-3 py-2 w-full md:w-full rounded"
            onClick={handleUpload}
          >
            {blogData ? "Update" : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolutionHeroSection;
