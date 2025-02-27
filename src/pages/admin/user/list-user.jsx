import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import AdminLayout from "@/Component/admin/AdminLayout";
import { useAppContext } from "@/Component/Context/context";
import { useRouter } from "next/router";

const ListingUser = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/user/user");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);
  const handleEdit = (id) => {
    router.push(`/admin/user/${id}`);
  };
  const handleDelete = async (id) => {
    // Send DELETE request with userId as a query parameter
    const response = await fetch(`/api/user/user?userId=${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setUsers(users.filter((user) => user._id !== id));
      alert("user delete succefully");
    } else {
      console.error("Failed to delete user");
    }
  };

  return (
    <AdminLayout>
      <div className="overflow-x-auto p-6 bg-gray-50 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 ">
          User List
        </h2>
        <div className="rounded-lg border border-gray-300 shadow-md max-h-96 overflow-y-auto">
          <table className="min-w-full table-auto bg-white border-collapse">
            {/* Table Header */}
            <thead className="bg-gray-800 text-white border-b-2 border-gray-300">
              <tr>
                <th className="py-4 px-6 text-left font-semibold uppercase text-sm tracking-wide border-gray-300">
                  Image
                </th>
                <th className="py-4 px-6 text-left font-semibold uppercase text-sm tracking-wide border-gray-300">
                  Name
                </th>
                <th className="py-4 px-6 text-left font-semibold uppercase text-sm tracking-wide border-gray-300">
                  Role
                </th>
                <th className="py-4 px-6 text-left font-semibold uppercase text-sm tracking-wide border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-200 transition-colors"
                  >
                    {/* Image */}
                    <td className="py-4 px-6 border-t border-gray-300">
                      {user.image && (
                        <Image
                          src={user.image.path}
                          alt={user.alt || user.name}
                          width={50}
                          height={50}
                          className="w-20 h-20 rounded object-cover border border-gray-300"
                        />
                      )}
                    </td>

                    {/* Name */}
                    <td className="py-4 px-6 border-t border-gray-300 font-medium text-gray-700">
                      {user.name}
                    </td>

                    {/* Role */}
                    <td className="py-4 px-6 border-t border-gray-300 text-gray-600">
                      {user.role}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 border-t border-gray-300 flex space-x-3">
                      <button
                        onClick={() => handleEdit(user._id)}
                        className="p-2 bg-blue-500 hover:bg-blue-600  text-white rounded-full shadow transition duration-150"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow transition duration-150"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-6 text-center text-gray-500 text-lg border-t border-gray-300"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ListingUser;
