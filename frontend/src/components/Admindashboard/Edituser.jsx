import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import EditUserModal from './EditUserModal';
import { useNavigate } from 'react-router-dom';


export default function Edituser() {
  const navigate = useNavigate()
  // Fetch all users except admin
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch all users except admin
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/user/fetchuser`, { withCredentials: true });
        setUsers(res.data);
      } catch (err) {
        if (err.status === 401) {
          navigate("/")
        }
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);


  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null); // Reset selected user
  };


  const handleUpdate = () => {
    // Re-fetch users after update
    axios
      .get(`/api/user/fetchuser`, { withCredentials: true })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching updated users:", err));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/user/deleteuser/${id}`, { withCredentials: true });
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 ml-0 sm:ml-0">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-700 to-slate-700 bg-clip-text text-transparent mb-2">
            Edit User Information
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">Manage user credentials and roles</p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-16 sm:py-24">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-blue-600"></div>
              <p className="text-slate-600 text-sm sm:text-base font-medium">Loading users...</p>
            </div>
          </div>
        ) : (
          /* Table Container */
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            {/* Table Wrapper with horizontal scroll on mobile */}
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Table Header */}
                <thead className="bg-gradient-to-r from-blue-700 to-blue-800 text-white sticky top-0">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold">
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                        </svg>
                        Name
                      </span>
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold">
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        Email
                      </span>
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold hidden sm:table-cell">
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Password
                      </span>
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold">
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.5 1.5H3a1.5 1.5 0 00-1.5 1.5v14a1.5 1.5 0 001.5 1.5h10a1.5 1.5 0 001.5-1.5V5m-4 4l2 2m0 0l2-2m-2 2v6" />
                        </svg>
                        Role
                      </span>
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-bold">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-slate-200">
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={user._id} className="hover:bg-slate-50 transition-colors duration-200 even:bg-slate-50/50">
                        {/* Name */}
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm font-semibold text-slate-900">
                          {user.name}
                        </td>

                        {/* Email */}
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-slate-700">
                          <span className="truncate block">{user.email}</span>
                        </td>

                        {/* Password - Hidden on mobile */}
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-slate-600 hidden sm:table-cell">
                          <code className="bg-slate-100 px-2 py-1 rounded text-xs font-mono">
                            {'•'.repeat(8)}
                          </code>
                        </td>

                        {/* Role */}
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm">
                          <span className={`inline-flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap ${
                            user.role === 'employee'
                              ? 'bg-blue-100 text-blue-700'
                              : user.role === 'technician'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-center">
                          <div className="flex gap-2 sm:gap-3 justify-center flex-wrap">
                            <button
                              onClick={() => handleEdit(user)}
                              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                            >
                              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                            >
                              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              <span className="hidden sm:inline">Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-8 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 6a3 3 0 11-6 0 3 3 0 016 0zM6 20h12a6 6 0 016-6H0a6 6 0 016 6z" />
                            </svg>
                          </div>
                          <p className="text-slate-700 text-base sm:text-lg font-semibold">No users found</p>
                          <p className="text-slate-500 text-xs sm:text-sm">Start by adding new users</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        <EditUserModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  )
}

