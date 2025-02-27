import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

// Dynamically import QuillNoSSRWrapper (to avoid SSR issues in Next.js)
const QuillNoSSRWrapper = dynamic(() => import("react-quill"), { ssr: false });

const SerBenifits = ({ blogData, setActiveTab }) => {
  const [heading, setHeading] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editorHtmlDescription, setEditorHtmlDescription] = useState(""); // For React Quill content
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (blogData) {
      setHeading(blogData?.benefit?.heading || "");
      setEditorHtmlDescription(blogData?.benefit?.description || "");
      setItems(blogData?.benefit?.items || []);
    }
  }, [blogData]);

  // Quill modules
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link"],
      [{ align: [] }],
      ["image"],
      ["blockquote"],
    ],
  };

  // Add new item or save edited item
  const handleAddOrEditItem = () => {
    if (!title || !description) {
      alert("Please fill out both title and description");
      return;
    }

    if (editIndex !== null) {
      // Editing existing item
      const updatedItems = [...items];
      updatedItems[editIndex] = { title, description };
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      // Adding a new item
      setItems([...items, { title, description }]);
    }

    setTitle("");
    setDescription("");
  };

  // Delete item
  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  // Edit item
  const handleEditItem = (index) => {
    setTitle(items[index].title);
    setDescription(items[index].description);
    setEditIndex(index);
  };

  // Save all data
  const handleSave = async () => {
    if (!heading || !editorHtmlDescription) {
      alert("Please provide both heading and rich description");
      return;
    }

    // Save heading + rich description (together as one unit)
    const data = {
      heading,
      description: editorHtmlDescription, // Save Quill content here
      items: items.map((item) => ({
        title: item.title,
        description: item.description,
      })),
      service: blogData?._id,
    };

    const res = await fetch(`/api/service/benefits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res?.ok) {
      alert(
        blogData?.benefit
          ? "Data updated successfully!"
          : "Data saved successfully!"
      );
      setHeading("");
      setEditorHtmlDescription(""); // Reset Quill content
      setItems([]);
      setActiveTab("Tab8");
    } else {
      alert("something went wrong");
    }
  };

  return (
    <>
      <div className="mx-auto px-3 p-3 bg-white shadow-lg rounded-lg">
        <p className="text-base font-semibold">Results And Benefits</p>
        <div className="mx-auto p-4 bg-white">
          {/* Heading Input */}
          <div className="mb-6">
            <label
              htmlFor="heading"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Heading
            </label>
            <input
              type="text"
              id="heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter heading"
            />
          </div>

          {/* React Quill Editor for Rich Description (after Heading) */}
          <div className="mb-6">
            <label
              htmlFor="editor"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Rich Description
            </label>
            <QuillNoSSRWrapper
              className="rounded h-48 mb-16"
              theme="snow"
              value={editorHtmlDescription}
              onChange={setEditorHtmlDescription}
              placeholder="Enter your rich description"
              modules={modules}
            />
          </div>

          {/* Title Input */}
          <div className="border p-4">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter title"
              />
            </div>

            {/* Description Input */}
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter description"
                rows="4"
              ></textarea>
            </div>

            {/* Add or Save Button */}
            <button
              onClick={handleAddOrEditItem}
              className="w-full bg-gray-600 text-white py-2 rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            >
              {editIndex !== null ? "Save Changes" : "Add Item"}
            </button>

            {/* Items List */}
            <table className="w-full border border-gray-300 rounded-md shadow-sm bg-white">
              <thead className="bg-gray-500">
                <tr>
                  <th className="text-left px-4 py-2 border-l border-r border-b border-gray-300 text-white">
                    Title
                  </th>
                  <th className="text-left px-4 py-2 border-l border-r border-b border-gray-300 text-white">
                    Description
                  </th>
                  <th className="px-4 py-2 border-b border-gray-300 text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b border-l border-r border-gray-300 text-gray-800">
                      {item.title}
                    </td>
                    <td className="px-4 py-2 border-b border-l border-r border-gray-300 text-gray-600">
                      {item.description}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 text-center">
                      <button
                        onClick={() => handleEditItem(index)}
                        className="text-blue-600 hover:underline mr-2"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(index)}
                        className="text-red-600 hover:underline"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Save All Button */}
          <button
            onClick={handleSave}
            className="w-full mt-4 bg-primary text-white py-2 rounded-md shadow-md hover:bg-orange-600"
          >
            Save List
          </button>
        </div>
      </div>
    </>
  );
};

export default SerBenifits;
