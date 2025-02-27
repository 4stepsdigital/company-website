import Image from "next/image";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faCube,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "@/Component/admin/AdminLayout";
import { ToastContainer, toast } from "react-toastify";

export default function IconManagement() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [alt, setAlt] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [imageData, setImageData] = useState([]);

  //   Function to fetch existing image
  async function fetchImage() {
    try {
      const res = await fetch("/api/industry/partner");
      const data = await res.json();
      setImageData(data?.data || []);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  }

  //   Fetch existing image on component mount
  useEffect(() => {
    fetchImage();
  }, []);

  // Function to handle file input change
  function handleChange(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  }

  // Function to handle image upload or update
  async function handleUpload() {
    if (!file && !isUpdating) {
      // alert("Please select a file to upload.");
      toast.warning("Please select a file to upload.");

      return;
    }

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("title", title);
    formData.append("alt", alt);
    if (selectedImageId) {
      formData.append("id", selectedImageId);
    }

    try {
      const res = await fetch("/api/industry/partner", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setFile(null);
        setPreview(null);
        setTitle("");
        setAlt("");
        setIsUpdating(false);
        setSelectedImageId(null);
        alert(`File uploaded successfully`);
        fetchImage();
      } else {
        alert(`File upload failed`);
        
      }
    } catch (error) {
      console.error(`Error uploading file:`, error);
      alert(`File uploading failed`);
    }
  }

  // Function to handle image removal
  async function handleRemove(selectedImageId) {
    try {
      const res = await fetch(`/api/industry/partner?id=${selectedImageId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const data = imageData?.filter((item) => item?._id !== selectedImageId);
        setImageData(data);
        alert("Image removed successfully");
        // Reset state after successful removal
      } else {
        alert("Failed to remove image");
      }
    } catch (error) {
      console.error("Error removing image:", error);
      alert("Failed to remove image");
    }
  }
  // console.log("preview the image", preview);
  return (
    <AdminLayout>
      <div className="flex items-center gap-5 text-primary xl:mb-10 mb-7 xl:mt-5">
        <FontAwesomeIcon icon={faCube} className="text-2xl" />
        <p className="md:text-[28px] text-xl text-black">Managements Partner</p>
        <FontAwesomeIcon
          icon={faArrowRightLong}
          className=" text-teal-700 text-xl"
        />
      </div>
      <div className="md:my-10 my-7 bg-white px-5 py-4 rounded-md">
        <p className="md:text-[20px] text-base font-semibold">
          4Steps Main Website (Listed All the Partner here)
        </p>

        <div className="p-6 bg-white shadow-md rounded-lg">
          <div className="flex flex-col md:flex-row md:gap-10 gap-5 items-center">
            {/* File Upload Section */}
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Icon
              </label>
              <input
                type="file"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mt-2">
                <span className="text-red-600 text-sm">*</span> Upload icons
                with a height of 25px and width of 35px.
              </p>
            </div>

            {/* Preview and Input Fields */}
            <div className="w-full md:w-auto flex flex-col items-start">
              {preview && (
                <div className="mb-4">
                  <Image
                    className="rounded shadow-md"
                    src={preview}
                    alt="Preview"
                    width={150}
                    height={200}
                  />
                </div>
              )}
              {/* Name of Icon */}
              <div className="w-full md:w-auto mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name of Icon
                </label>
                <input
                  className="border border-gray-300 rounded px-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              {/* Alt Text */}
              <div className="w-full md:w-auto">
                <label className="block text-sm font-medium text-gray-700">
                  Alt Text
                </label>
                <input
                  className="border border-gray-300 rounded px-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  type="text"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Upload Button */}
          <div className="mt-6 flex justify-center md:justify-start">
            <button
              className="bg-primary text-white px-6 py-2 rounded shadow hover:bg-primary-dark transition duration-200 w-full md:w-auto"
              onClick={handleUpload}
            >
              Upload Image
            </button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-lg border border-gray-300 shadow-md">
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full table-auto border-collapse text-center">
              {/* Table Header */}
              <thead className="bg-gray-800 text-white sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                    Icon
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody className="bg-gray-50 divide-y divide-gray-200">
                {imageData?.map((item, index) => (
                  <tr
                    key={item?._id || index}
                    className="hover:bg-gray-100 transition duration-200"
                  >
                    {/* Icon */}
                    <td className="px-6 py-4">
                      <Image
                        className="rounded  object-contain h-28 w-28 shadow"
                        src={item?.path}
                        alt="Preview"
                        width={80}
                        height={80}
                      />
                    </td>
                    {/* Name */}
                    <td className="px-6 py-4 text-sm font-medium text-gray-700 capitalize">
                      {item?.title || "N/A"}
                    </td>
                    {/* Action */}
                    <td className="px-6 py-4">
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => handleRemove(item?._id)}
                        className="text-red-500 hover:text-red-700 cursor-pointer text-lg transition duration-200"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AdminLayout>
  );
}
