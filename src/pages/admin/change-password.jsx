import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "@/Component/admin/AdminLayout";
import { ToastContainer, toast } from "react-toastify";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    username: "",
    currentPassword: "",
    newPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle password visibility
  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res?.ok) {
      toast.success("Password Changed Successfully");
    } else {
      toast.error("Failed to change password");
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
            Change Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                placeholder="Enter your username"
              />
            </div>

            {/* Current Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.current ? "text" : "password"}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none pr-10"
                  placeholder="Enter current password"
                />
                <FontAwesomeIcon
                  icon={showPassword.current ? faEyeSlash : faEye}
                  className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                  onClick={() => togglePassword("current")}
                />
              </div>
            </div>

            {/* New Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.new ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none pr-10"
                  placeholder="Enter new password"
                />
                <FontAwesomeIcon
                  icon={showPassword.new ? faEyeSlash : faEye}
                  className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                  onClick={() => togglePassword("new")}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg text-lg font-medium hover:bg-blue-600 transition-all"
            >
              Update Password
            </button>
          </form>
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
