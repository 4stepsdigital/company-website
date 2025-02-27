import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const ContactForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (isModalOpen) {
      // Disable background scrolling
      document.body.classList.add("overflow-hidden");
    } else {
      // Enable background scrolling
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  const [formData, setFormData] = useState({
    description: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    countryCode: "+91",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.description)
      errors.description = "Please enter a description.";
    if (!formData.name) errors.name = "Please enter your name.";
    if (!formData.company) errors.company = "Please enter your company name.";
    if (!formData.email) {
      errors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formData.phone) {
      errors.phone = "Please enter your phone number.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number.";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Form Data Submitted:", formData);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed  inset-0  bg-black   mt-20 z-[20]   bg-opacity-50 flex justify-center items-center">
          <div className=" bg-white  max-w-3xl w-full rounded-lg p-6 shadow-lg relative animate-fade-in">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black transition-colors"
              aria-label="Close"
              onClick={() => setIsModalOpen(false)}
            >
              <FontAwesomeIcon icon={faXmarkCircle} className="text-3xl" />
            </button>
            {/* Modal Content */}
            <div className="container mx-auto   bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                  Lets Discuss Your Needs!
                </h2>
                <p className="text-sm md:text-base text-gray-600 mt-2">
                  Have questions, want to discuss your project, or learn more
                  about our expertise? Fill out the form below!
                </p>
              </div>

              <form className="space-y-6 p-3" onSubmit={handleSubmit}>
                <div>
                  <textarea
                    placeholder="Kindly describe your request"
                    id="description"
                    rows="4"
                    value={formData?.description}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      {errors?.description}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Company"
                      id="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.company && (
                      <p className="text-red-500 text-sm">{errors.company}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Work Email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                  <div className="flex">
                    <select
                      id="countryCode"
                      value={formData.countryCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          countryCode: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-l-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>+91</option>
                      <option>+92</option>
                      {/* Add more country codes */}
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-r-lg w-full py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="00000 00000"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors?.phone}</p>
                  )}
                </div>
                <div className="text-center">
                  <button
                    className="bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 "
                    type="submit"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactForm;
