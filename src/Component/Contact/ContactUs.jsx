// import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import {
//   FaUser,
//   FaEnvelope,
//   FaPhoneAlt,
//   FaRegCommentDots,
// } from "react-icons/fa";

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     number: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (
//       !formData?.name ||
//       !formData?.email ||
//       !formData?.number ||
//       !formData?.message
//     ) {
//       return alert("all fields is required !!!");
//     }
//     const newformData = {
//       Last_Name: formData?.name,
//       Email: formData?.email,
//       Phone: formData?.number,
//       Description: formData?.message,
//     };
//     const res = await fetch("/api/zoho", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newformData),
//     });
//     if (res?.ok) {
//       alert("data is sent to zoho lead successfully");
//       // toast.success("data sent to zoho lead successfully");
//     } else {
//       alert("something went wrong");
//       // toast.error("something went wrong.");
//     }
//   };

//   const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.910862140821!2d77.51411137505966!3d28.48223097574713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ceb07a0270cf1%3A0xef3dde7c7ebbe43e!2sFour%20Steps%20Digital%20Consulting%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1723887840924!5m2!1sen!2sin`;

//   return (
//     <div className="bg-white">
//       <div className="container-wrapper">
//         <div className="mx-auto py-10">
//           <h4 className="text-[22px] md:text-3xl font-semibold text-heading mb-6 text-center">
//             Get in Touch (Contact Us)
//           </h4>
//           <div className="overflow-hidden">
//             <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
//               {/* Contact Information */}
//               <div className="p-6 md:p-8">
//                 <p className="text-gray-800 text-base md:text-lg mb-4 leading-relaxed">
//                   T-3 A-1113, Nx Byte, Nx one plot No. - 17, sector - Tech zone
//                   IV, Greater Noida West
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <div>
//                     <p className="text-gray-800 font-semibold">Email Us:</p>
//                     <a
//                       href="mailto:info@4stepsdigital.com"
//                       className="hover:underline text-blue-800 transition"
//                     >
//                       info@4stepsdigital.com
//                     </a>
//                   </div>
//                   <div>
//                     <p className="text-gray-800 font-semibold">Call Us:</p>
//                     <a
//                       href="tel:+919065879989"
//                       className="hover:underline text-blue-800 transition"
//                     >
//                       +91-9065879989
//                     </a>
//                   </div>
//                 </div>
//                 <div className="mt-6">
//                   <iframe
//                     className="w-full h-64 rounded-lg"
//                     src={mapSrc}
//                     allowFullScreen
//                     loading="lazy"
//                     title="Google Maps"
//                   ></iframe>
//                 </div>
//               </div>

//               {/* Contact Form */}
//               <div className="py-6 px-4 md:p-8">
//                 <form className="space-y-6" onSubmit={handleSubmit}>
//                   <div className="relative">
//                     <FaUser className="absolute left-3 top-4 text-heading" />
//                     <input
//                       type="text"
//                       name="name"
//                       placeholder="Enter Your Name"
//                       required
//                       value={formData.name}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-sm"
//                     />
//                   </div>
//                   <div className="relative">
//                     <FaEnvelope className="absolute left-3 top-4 text-heading" />
//                     <input
//                       type="email"
//                       name="email"
//                       placeholder="Enter Your Email"
//                       required
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-sm"
//                     />
//                   </div>
//                   <div className="relative">
//                     <FaPhoneAlt className="absolute left-3 top-4 text-heading" />
//                     <input
//                       type="tel"
//                       name="number"
//                       placeholder="Enter Your Phone Number"
//                       required
//                       value={formData.number}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-sm"
//                     />
//                   </div>
//                   <div className="relative">
//                     <FaRegCommentDots className="absolute left-3 top-4 text-heading" />
//                     <textarea
//                       name="message"
//                       placeholder="Your Message..."
//                       rows="4"
//                       required
//                       value={formData.message}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-sm resize-none"
//                     ></textarea>
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full py-3 text-white bg-heading rounded-lg shadow-md hover:scale-95 transform transition-all"
//                   >
//                     Send Message ✉
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer
//         position="top-right"
//         autoClose={4000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={false}
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//     </div>
//   );
// };

// export default ContactUs;

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaRegCommentDots,
} from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const validateForm = () => {
    const { name, email, number, message } = formData;

    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!name || !email || !number || !message) {
      toast.error("All fields are required!");
      return false;
    }

    if (!nameRegex.test(name)) {
      toast.warning(
        "Name must contain only letters and spaces (2-50 characters)"
      );
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.warning("Please enter a valid email");
      return false;
    }

    if (!phoneRegex.test(number)) {
      toast.warning("Please enter a valid Number");
      return false;
    }

    if (message.length < 10) {
      toast.error("Message should be at least 10 characters");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newformData = {
      Last_Name: formData.name,
      Email: formData.email,
      Phone: formData.number,
      Description: formData.message,
    };

    try {
      const res = await fetch("/api/zoho", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newformData),
      });

      if (res.ok) {
        toast.success("Data sent successfully");
        setFormData({ name: "", email: "", number: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again later");
      }
    } catch (error) {
      toast.error("Failed to send data");
    }
  };

  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.910862140821!2d77.51411137505966!3d28.48223097574713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ceb07a0270cf1%3A0xef3dde7c7ebbe43e!2sFour%20Steps%20Digital%20Consulting%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1723887840924!5m2!1sen!2sin";

  return (
    <div className="bg-white">
      <div className="container-wrapper">
        <div className="mx-auto py-10">
          <h4 className="text-[22px] md:text-3xl font-semibold text-heading mb-6 text-center">
            Get in Touch (Contact Us)
          </h4>
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
              {/* Contact Information */}
              <div className="p-6 md:p-8">
                <p className="text-gray-800 text-base md:text-lg mb-4 leading-relaxed">
                  T-3 A-1113, Nx Byte, Nx one plot No. - 17, sector - Tech zone
                  IV, Greater Noida West
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div>
                    <p className="text-gray-800 font-semibold">Email Us:</p>
                    <a
                      href="mailto:info@4stepsdigital.com"
                      className="hover:underline text-blue-800 transition"
                    >
                      info@4stepsdigital.com
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold">Call Us:</p>
                    <a
                      href="tel:+919065879989"
                      className="hover:underline text-blue-800 transition"
                    >
                      +91-9065879989
                    </a>
                  </div>
                </div>
                <div className="mt-6">
                  <iframe
                    className="w-full h-64 rounded-lg"
                    src={mapSrc}
                    allowFullScreen
                    loading="lazy"
                    title="Google Maps"
                  ></iframe>
                </div>
              </div>

              {/* Contact Form */}
              <div className="py-6 px-4 md:p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-4 text-heading" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Your Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-sm"
                    />
                  </div>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-4 text-heading" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Your Email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-sm"
                    />
                  </div>
                  <div className="relative">
                    <FaPhoneAlt className="absolute left-3 top-4 text-heading" />
                    <input
                      type="tel"
                      name="number"
                      placeholder="Enter Your Phone Number"
                      required
                      value={formData.number}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-sm"
                    />
                  </div>
                  <div className="relative">
                    <FaRegCommentDots className="absolute left-3 top-4 text-heading" />
                    <textarea
                      name="message"
                      placeholder="Your Message..."
                      rows="4"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-sm resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 text-white bg-heading rounded-lg shadow-md hover:scale-95 transform transition-all"
                  >
                    Send Message ✉
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default ContactUs;
