import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const fetchallScreenshotData = async (id) => {
  const data = await fetch(`/api/casestudy/visuals?id=${id}`, {
    method: "GET",
  });
  return await data.json();
};

function Visuals({ setActiveTab, casestudyData }) {
  const [entries, setEntries] = useState([]);
  const [image, setImage] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileData(file || null);
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (casestudyData?.length > 0) {
      fetchallScreenshotData(casestudyData?.[0]?._id).then((res) => {
        setEntries(res?.data);
      });
    }
  }, [casestudyData]);

  const resetFormFields = () => {
    setTitle("");
    setDescription("");
    setImage(null);
    setFileData(null);
  };

  const handleAddEntry = async () => {
    try {
      if (fileData && title && description) {
        const formData = new FormData();
        formData.append("file", fileData);
        formData.append("title", title);
        formData.append("description", description);
        if (casestudyData.length > 0) {
          formData.append("casestudy", casestudyData?.[0]?._id || null);
        }
        const data = await fetch(`/api/casestudy/visuals`, {
          method: "POST",
          body: formData,
        });
        if (data?.ok) {
          alert("Data saved successfully");
          resetFormFields(); 
          if (casestudyData?.length > 0) {
            fetchallScreenshotData(casestudyData?.[0]?._id).then((res) => {
              setEntries(res?.data);
            });
          }
        } else {
          alert("Data has not saved");
        }
      } else {
        alert("Please fill all fields before adding.");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDeleteEntry = async (id) => {
    const data = await fetch(`/api/casestudy/visuals?id=${id}`, {
      method: "DELETE",
    });
    if (data?.ok) {
      alert("Item successfully deleted");
      if (casestudyData?.length > 0) {
        fetchallScreenshotData(casestudyData?.[0]?._id).then((res) => {
          setEntries(res?.data);
        });
      }
    } else {
      alert("Something went wrong while deleting the item");
    }
  };

  const handleSubmitAll = () => {
    setActiveTab("Tab6");
  };

  return (
    <>
      <div className="mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-6">Image Upload with Listing</h2>

        {/* Add New Entry Form */}
        <div className="mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full py-2 text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          {image && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Preview
              </label>
              <Image
                src={image}
                alt="Preview"
                className="h-48 object-cover border border-gray-300 rounded-md"
                height={200}
                width={200}
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={3}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 p-2"
            />
          </div>

          <button
            onClick={handleAddEntry}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add Entry
          </button>
        </div>

        {/* Listing Entries - Removed Description Column */}
        <div>
          <h3 className="text-lg font-bold mb-4">Entries</h3>
          {entries?.length === 0 ? (
            <p className="text-sm text-gray-500">No entries added yet.</p>
          ) : (
            <table className="w-full border border-gray-300 text-sm text-gray-700">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Image</th>
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries?.map((entry, index) => (
                  <tr key={index} className="text-center">
                    <td className="p-2 border">
                      <Image
                        src={entry.path}
                        alt={entry.title}
                        className="w-20 h-20 object-cover"
                        height={100}
                        width={100}
                      />
                    </td>
                    <td className="p-2 border">{entry.title}</td>
                    <td className="p-2 border">
                      <button
                        onClick={() => handleDeleteEntry(entry?._id)}
                        className="text-red-500 hover:underline"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Submit All Button */}
        <div className="mt-6 max-2xl">
          <button
            onClick={handleSubmitAll}
            className="bg-gray-900 w-full text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default Visuals;
