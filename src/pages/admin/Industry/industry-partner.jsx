// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRightLong, faCube, faTrash } from "@fortawesome/free-solid-svg-icons";
// import AdminLayout from "@/Component/admin/AdminLayout";

// export default function IconManagement() {
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [title, setTitle] = useState("");
//   const [alt, setAlt] = useState("");
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [selectedImageId, setSelectedImageId] = useState(null);
//   const [imageData, setImageData] = useState([]);

// //   Function to fetch existing image
//   async function fetchImage() {
//     try {
//       const res = await fetch("/api/industry/partner");
//       const data = await res.json();
//       setImageData(data?.data || []);
//     } catch (error) {
//       console.error("Error fetching image:", error);
//     }
//   }

// //   Fetch existing image on component mount
//   useEffect(() => {
//     fetchImage();
//   }, []);

//   // Function to handle file input change
//   function handleChange(e) {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setPreview(URL.createObjectURL(selectedFile));
//   }

//   // Function to handle image upload or update
//   async function handleUpload() {
//     if (!file && !isUpdating) {
//       alert("Please select a file to upload.");
//       return;
//     }

//     const formData = new FormData();
//     if (file) {
//       formData.append("file", file);
//     }
//     formData.append("title", title);
//     formData.append("alt", alt);
//     if (selectedImageId) {
//       formData.append("id", selectedImageId);
//     }

//     try {
//       const res = await fetch("/api/industry/partner", {
//         method: "POST",
//         body: formData,
//       });
//       if (res.ok) {
//         setFile(null);
//         setPreview(null);
//         setTitle("");
//         setAlt("");
//         setIsUpdating(false);
//         setSelectedImageId(null);
//         alert(`File uploaded successfully`);
//         fetchImage();
//       } else {
//         alert(`File upload failed`);
//       }
//     } catch (error) {
//       console.error(`Error uploading file:`, error);
//       alert(`File uploading failed`);
//     }
//   }

//   // Function to handle image removal
//   async function handleRemove(selectedImageId) {
//     try {
//       const res = await fetch(`/api/industry/partner?id=${selectedImageId}`, {
//         method: "DELETE",
//       });

//       if (res.ok) {
//         const data = imageData?.filter((item) => item?._id !== selectedImageId);
//         setImageData(data);
//         alert("Image removed successfully");
//         // Reset state after successful removal
//       } else {
//         alert("Failed to remove image");
//       }
//     } catch (error) {
//       console.error("Error removing image:", error);
//       alert("Failed to remove image");
//     }
//   }
//   // console.log("preview the image", preview);
//   return (
//     <AdminLayout>
//         <div className="flex items-center gap-5 text-primary xl:mb-10 mb-7 xl:mt-5">
//           <FontAwesomeIcon icon={faCube} className="text-2xl" />
//           <p className="md:text-[28px] text-xl text-black">Partner Management</p>
//           <FontAwesomeIcon
//             icon={faArrowRightLong}
//             className=" text-teal-700 text-xl"
//           />
//         </div>
//         <div className="md:my-10 my-7 bg-white px-5 py-4 rounded-md">
//           <p className="md:text-[20px] text-base font-semibold">
//             4Steps Main Website
//           </p>
//           <div>
//             <div className="flex md:flex-row flex-col md:gap-10 gap-5 md:my-10 my-5  items-center xl:pl-5 ">
//               <div>
//               <input type="file" className="mb-4" onChange={handleChange} />
//               <p className="mt-28 flex"><sup className="text-red-600 text-xl">*</sup><span>upload h=25px and w=35px icons</span></p>
//               </div>
//               <div>
//                 {preview && (
//                   <Image
//                     className="md:w-36 w-auto h-auto shadow-md mb-4"
//                     src={preview}
//                     alt="Preview"
//                     width={150}
//                     height={200}
//                   />
//                 )}
//                 <div>
//                   <p>Name of Icon</p>
//                   <input
//                     className="border px-2 py-0.5 mb-2 w-full md:w-auto rounded focus:border-primary outline-none"
//                     type="text"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <p>Alt</p>
//                   <input
//                     className="border px-2 py-0.5 w-full md:w-auto rounded focus:border-primary outline-none"
//                     type="text"
//                     value={alt}
//                     onChange={(e) => setAlt(e.target.value)}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="flex md:flex-row flex-col md:gap-5 gap-3">
//               <button
//                 className="bg-black text-white px-3 py-2 w-full md:w-auto rounded"
//                 onClick={handleUpload}
//               >
//                 Upload Image
//               </button>
//             </div>
//           </div>
//           <div className="mt-10">
//             <table className="w-full border-collapse border border-gray-300 text-center text-para">
//               <thead >
//                 <tr className="border-b bg-black text-white">
//                   <th className="border border-gray-300 font-normal px-3 py-1 text-xs uppercase tracking-wider">Icon</th>
//                   <th className="border border-gray-300 font-normal px-3 py-1 text-xs uppercase tracking-wider">Name</th>
//                   <th className="border border-gray-300 font-normal px-3 py-1 text-xs uppercase tracking-wider">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-gray-100">
//                 {imageData?.map((item) => (
//                   <tr key={item?._id} className="border-b">
//                     <td className="flex justify-center items-center px-2 py-2 overflow-hidden border-gray-300">
//                       <Image
//                         className=" shadow-md"
//                         src={item?.path}
//                         alt="Preview"
//                         width={120}
//                         height={120}
//                       />
//                     </td>
//                     <td className="border-l border-r px-2 py-2 capitalize overflow-hidden border-gray-300">
//                       <p className="text-para font-semibold capitalize">{item?.title}</p>
//                     </td>
//                     <td className="  px-2 py-2 overflow-hidden border-gray-300">
//                       <FontAwesomeIcon
//                         icon={faTrash}
//                         onClick={() => handleRemove(item?._id)}
//                         className="font1 hover:text-primary cursor-pointer"
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//           </div>
//         </div>
//         </AdminLayout>
//   );
// }
import React from "react";

const IndustryPartners = () => {
  return (
    <div>
      <h5>welcome to industry Partners..........</h5>
    </div>
  );
};

export default IndustryPartners;
