import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/navigation";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
const fetchAllSuccessStories = async (id) => {
  const res = await fetch(`/api/technology/solution1?id=${id}`, {
    method: "GET",
  });
  return await res.json();
};

const TechnologySolutions = ({ setActiveTab, blogData }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [currentItems, setCurrentItems] = useState([]);
  const [heading, setHeading] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editorHtmlDescription, setEditorHtmlDescription] = useState("");
  const [mainEditorHtmlDescription, setMainEditorHtmlDescription] = useState("");
  const [editorData, setEditorData] = useState([]); // Store editor data as an array of objects
  const [isUpdating, setIsUpdating] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [solutionItem, setSolutionItem] = useState([]);
  const [itineraryDayWise, setItineraryDayWise] = useState({
    content: "",
  }); // To track the item being edited
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 2; // Number of items per page

  const router = useRouter();

  useEffect(() => {
    fetchAllSuccessStories(blogData?._id).then((res) => {
      setCurrentItems(res?.data || []);
      const data = res?.data?.map((item) => item?._id);
      // console.log("res---- item-----> ", data);
      setSolutionItem(data || []);
    });
    if(blogData){
      setHeading(blogData?.solution?.heading||"");
      setMainEditorHtmlDescription(blogData?.solution?.mainEditorHtmlDescription||"")
    }
  }, [blogData]);

  // Handle file input change
  function handleChange(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  }
  const addItem = () => {
    if (!itineraryDayWise?.content) {
      return;
    }
    if (editingIndex !== null) {
      const updatedArray = [...editorData];
      updatedArray[editingIndex] = itineraryDayWise;
      setEditorData(updatedArray);
      setEditingIndex(null);
    } else {
      setEditorData((prev) => [...prev, itineraryDayWise]);
    }
    setItineraryDayWise({ content: "" });
    setEditorHtmlDescription("");
  };
  const editItem = (index) => {
    setEditingIndex(index);
    setItineraryDayWise(editorData[index]);
    setEditorHtmlDescription(editorData[index]?.content);
  };

  const removeItem = (index) => {
    const updatedArray = editorData?.filter((_, i) => i !== index);
    setEditorData(updatedArray);
  };

  const handleEditorChange = (html) => {
    setEditorHtmlDescription(html);
    setItineraryDayWise((prevState) => ({
      ...prevState,
      content: html,
    }));
  };
  const handleEditorChange1 = (html) => {
    setMainEditorHtmlDescription(html);
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      ["link"],
    ],
  };

  // Handle image upload or update
  async function handleUpload() {
    if (!file && !isUpdating) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    if (!file && !title && !editorHtmlDescription && !link) {
      alert("Please upload file and write title");
      return;
    }

    if (file && title) {
      formData.append("file", file);
      formData.append("title", title);
      formData.append("link", link);
      formData.append("editorHtmlDescription", JSON.stringify(editorData));
      formData.append("technology", blogData?._id);
    }
    try {
      const url = isUpdating
        ? `/api/technology/solution1/${editItemId}`
        : `/api/technology/solution1`;
      const method = isUpdating ? "PUT" : "POST";
      const res = await fetch(url, { method, body: formData });
      if (res?.ok) {
        fetchAllSuccessStories(blogData?._id).then((res) => {
          setCurrentItems(res?.data || []);
          const data = res?.data?.map((item) => item?._id);
          // console.log("res---- item-----> ", data);
          setSolutionItem(data || []);
        });
        setIsUpdating(false);
        setEditorData([]);
        setTitle("");
        setLink("");
        setPreview(null);
        alert(
          `File ${
            blogData?.success?.length > 0 ? "updated" : "uploaded"
          } successfully`
        );
      } else {
        alert(
          `File ${blogData?.success?.length > 0 ? "update" : "upload"} failed`
        );
      }
    } catch (error) {
      console.error(
        `Error ${
          blogData?.success?.length > 0 ? "updating" : "uploading"
        } file:`,
        error
      );
    }
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItemsToShow = currentItems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(currentItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const cancelEdit = () => {
    setEditItemId(null);
    setEditorData([]);
    setTitle("");
    setLink("");
    setPreview(null);
    setIsUpdating(false);
  };

  const edit1Item = (item) => {
    // console.log("item of list item is here ---->  ", item);
    setEditItemId(item?._id);
    setEditorData(item?.editorHtmlDescription);
    setTitle(item?.title);
    setLink(item?.link);
    setPreview(item?.path);
    setIsUpdating(true);
  };

  const deleteItem=async (id)=>{
    const res=await fetch(`/api/technology/solution1?id=${id}`,{method:"DELETE"});
    if(res?.ok){
      fetchAllSuccessStories(blogData?._id).then((res) => {
        setCurrentItems(res?.data || []);
        const data = res?.data?.map((item) => item?._id);
        // console.log("res---- item-----> ", data);
        setSolutionItem(data || []);
      });
      alert("item is successfully deleted");

    }
    else{
      alert("item is something went wrong");
    }
  }

  // console.log("blog data is here ----> ",blogData)

  const handleSave=async ()=>{
    const data={heading,mainEditorHtmlDescription,solutionItem};
   const res=await fetch(`/api/technology/solution1/solution?technology=${blogData?._id}`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
   })

   if(res?.ok){
    setActiveTab("Tab5")
    alert(blogData?._id?"solution Data updated successfully":"solution Data saved successfully");
   }
   else{
    alert("something went wrong on frontend side");
   }
  }


  return (
    <>
      <div className="p-4 mb-5 rounded-md bg-white shadow-[0_0px_10px_-3px_rgba(0,0,0,0.3)] border-l-2 border-teal-600">
        <p className="text-base font-semibold mb-2">
          Technology Solutions we deliver
        </p>
        <div className="p-4">
          <div className="flex flex-col md:gap-10 gap-5 xl:pl-5">
            <div>
              <label htmlFor="heading" className="font-semibold">
                Heading
              </label>
              <input
                className="py-0.5 mb-2 w-full border rounded h-8 px-2 focus:border-primary outline-none"
                type="text"
                id="heading"
                value={heading}
                placeholder="Enter Heading Here"
                onChange={(e) => setHeading(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="heading" className="font-semibold">
                Description
              </label>
              <QuillNoSSRWrapper
                className="rounded h-48 mb-16"
                theme="snow"
                value={mainEditorHtmlDescription}
                onChange={handleEditorChange1}
                placeholder="Enter Your Description"
                modules={modules}
              />
            </div>

            <div className="border py-3 px-4">
              <h1 className=" text-xl font-semibold">create solution Item</h1>
              <div className="flex flex-col md:flex-row  my-7">
                <input
                  type="file"
                  className="mb-4 ml-3"
                  onChange={handleChange}
                />
                <div className="mx-auto md:mx-0 lg:mx-5">
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
              <div className="my-5">
                <div>
                  <label htmlFor="title" className="font-semibold">
                    Title
                  </label>
                  <input
                    className="py-0.5 mb-2 w-full border rounded h-8 px-2 focus:border-primary outline-none"
                    type="text"
                    id="title"
                    value={title}
                    placeholder="Enter Title Here"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="link" className="font-semibold">
                    Link
                  </label>
                  <input
                    className="py-0.5 mb-2 w-full border rounded h-8 px-2 focus:border-primary outline-none"
                    type="text"
                    id="link"
                    value={link}
                    placeholder="Enter Link Here"
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <h3 className="font-semibold mb-2">Industry Summary</h3>
                  <QuillNoSSRWrapper
                    className="rounded h-48 mb-16"
                    theme="snow"
                    value={editorHtmlDescription}
                    onChange={handleEditorChange}
                    placeholder="Enter Your Description"
                    modules={modules}
                  />
                  <button
                    className="bg-black text-white px-3 my-9 md:my-1 py-2 rounded"
                    onClick={addItem}
                  >
                    {editingIndex !== null ? "Update Des" : "Add Des"}
                  </button>
                  <div className="border mt-2">
                    {editorData.map((item, index) => (
                      <div
                        key={item?.id}
                        className="my-4 w-full flex justify-between"
                      >
                        <div className="flex">
                          <p className="pl-2 pr-1">{index + 1}.</p>
                          <p
                            dangerouslySetInnerHTML={{ __html: item?.content }}
                          ></p>
                        </div>
                        <div className="flex gap-3 mr-4">
                          <button
                            className="text-blue-500"
                            onClick={() => editItem(index)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            className="text-red-500"
                            onClick={() => removeItem(index)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex md:flex-row flex-col md:gap-5 gap-3 mb-5">
                <button
                  className="bg-black text-white px-3 py-2 w-full rounded"
                  onClick={handleUpload}
                >
                  {editItemId ? "Update" : "Add"}
                </button>
                {isUpdating && (
                  <button
                    className="bg-gray-500 text-white px-3 py-2 w-full rounded"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                )}
              </div>

              {/* List of items */}
              <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 py-2 px-4 md:px-8 md:text-start">
                        Image
                      </th>
                      <th className="border border-gray-300 py-2 px-4">
                        Title
                      </th>
                      <th className="border border-gray-300 py-2 px-4">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItemsToShow.map((item) => (
                      <tr key={item._id} className="border-b">
                        <td className="py-2 px-4">
                          <Image
                            className="w-40 h-16 object-cover rounded"
                            src={item?.path || "/logo.png"}
                            alt="Item Image"
                            width={150}
                            height={100}
                          />
                        </td>
                        <td className="py-4 px-4 text-start border-x capitalize">
                          {item?.title}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button onClick={() => edit1Item(item)}>
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="text-blue-500 cursor-pointer mx-2"
                            />
                          </button>
                          <button onClick={() => deleteItem(item._id)}>
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-red-500 cursor-pointer"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-5 gap-3">
                <button
                  onClick={prevPage}
                  className="px-4 py-2 bg-gray-300 rounded"
                  disabled={currentPage === 1}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>

                {Array.from(
                  { length: Math.ceil(currentItems.length / itemsPerPage) },
                  (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => paginate(index + 1)}
                      className={`px-4 py-2 rounded ${
                        currentPage === index + 1
                          ? "bg-primary text-white"
                          : "bg-gray-300"
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                )}

                <button
                  onClick={nextPage}
                  className="px-4 py-2 bg-gray-300 rounded"
                  disabled={
                    currentPage ===
                    Math.ceil(currentItems.length / itemsPerPage)
                  }
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
            <button onClick={handleSave} className="bg-black text-white px-3 py-2 w-full rounded">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TechnologySolutions;
