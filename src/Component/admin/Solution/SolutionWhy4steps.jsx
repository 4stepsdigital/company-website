import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { FaEdit, FaTrash } from "react-icons/fa"; // FontAwesome icons
import MultipleSelectCheckmarks from "../CheckMarkSelect";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const SolutionWhy4steps = ({ blogData, setActiveTab }) => {
  const [aboutEditorHtml, setAboutEditorHtml] = useState("");
  const [heading, setHeading] = useState("");
  const [partnersData, setPartnersData] = useState([]);
  const [SelectedPartnersData, setSelectedPartnersData] = useState([]);
  const [overviewData, setOverviewData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (blogData) {
      setHeading(blogData?.Why4StepS?.heading || "");
      setOverviewData(blogData?.Why4StepS?.overviewData || []);
      setSelectedPartnersData(blogData?.Why4StepS?.partnersData || []);
    }
  }, [blogData]);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { list: "square" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
    ],
  };

  const handleAboutEditorChange = (html) => {
    setAboutEditorHtml(html);
  };

  async function fetchImage() {
    try {
      const res = await fetch("/api/industry/partner");
      const data = await res.json();
      setPartnersData(data?.data || []);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  }

  useEffect(() => {
    fetchImage();
  }, []);

  const handleCategory = (category) => {
    setSelectedPartnersData(category);
  };

  const handleAdd = () => {
    if (!aboutEditorHtml.trim()) return; // Do not add empty content
    if (editIndex !== null) {
      // Update existing item
      setOverviewData((prevData) =>
        prevData.map((item, index) =>
          index === editIndex ? { ...item, content: aboutEditorHtml } : item
        )
      );
      setEditIndex(null);
    } else {
      // Add new item
      setOverviewData((prevData) => [
        ...prevData,
        { id: Date.now(), content: aboutEditorHtml },
      ]);
    }
    setAboutEditorHtml(""); // Clear editor after adding or updating
  };

  const handleEdit = (index) => {
    setEditIndex(index); // Set the index for editing
    setAboutEditorHtml(overviewData[index].content); // Load content into the editor
  };

  const handleDelete = (id) => {
    setOverviewData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleSaveData = async () => {
    const data = {
      solution: blogData?._id,
      heading,
      SelectedPartnersData,
      overviewData,
    };
    const res = await fetch(`/api/solution/why4step`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res?.ok) {
      alert(
        blogData?.Why4StepS
          ? "Data updated successfully"
          : "Data added successfully"
      );
      setActiveTab("Tab3");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <p className="text-base font-semibold">Why 4Steps</p>
      <div className="bg-white p-5 rounded-md flex flex-col gap-4">
        <div>
          <label
            htmlFor="heading"
            className="block text-sm font-semibold text-gray-700"
          >
            Heading
          </label>
          <input
            type="text"
            id="heading"
            className="w-full outline-none border py-2 rounded-md px-3 mt-1"
            onChange={(e) => setHeading(e.target.value)}
            value={heading}
          />
        </div>

        <div className="my-4">
          <label
            htmlFor="reliablePartners"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Reliable Partners:
          </label>
          <MultipleSelectCheckmarks
            packageCategories={partnersData}
            onSelectedCategoryIdsChange={handleCategory}
            selectedCategories1={SelectedPartnersData}
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Overview</p>
          <div className="w-full h-44 mb-4">
            <QuillNoSSRWrapper
              className="rounded-md"
              theme="snow"
              value={aboutEditorHtml}
              onChange={handleAboutEditorChange}
              modules={modules}
            />
          </div>

          <button
            className="bg-black text-white w-24 rounded-md py-2"
            onClick={handleAdd}
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>

          <div className="mt-5">
            <p className="font-semibold text-gray-700">All Points:</p>
            <ul className="space-y-3 mt-2">
              {overviewData.map((item, index) => (
                <li
                  key={item.id}
                  className="flex justify-between items-start p-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm"
                >
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-600 font-medium">{index + 1}</p>
                    <div
                      className="flex-grow text-sm text-gray-700"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    ></div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEdit(index)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          type="submit"
          className="bg-black text-white w-full rounded-md py-2 mt-4"
          onClick={handleSaveData}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SolutionWhy4steps;
