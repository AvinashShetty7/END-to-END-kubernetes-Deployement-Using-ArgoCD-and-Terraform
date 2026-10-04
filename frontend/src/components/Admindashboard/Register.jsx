import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee", // default role
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        `/api/user/register`,
        formData,
        { withCredentials: true }
      );

      setMessage("✅ User created successfully!");
      setFormData({ name: "", email: "", password: "", role: "employee" });
    } catch (error) {
      if (error.status === 401) {
        navigate("/");
      }
      if (error.response) {
        // Server responded with a non-2xx status
        setMessage(`❌ ${error.response.data.message || "Server error"}`);
      } else if (error.request) {
        // Request made but no response
        setMessage("❌ No response from server");
      } else {
        // Something else went wrong
        setMessage("❌ Something went wrong");
      }
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex justify-center items-center px-4 py-8 sm:py-12 lg:py-16 ml-0 sm:ml-0">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full max-w-md lg:max-w-lg border border-slate-200"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-100 to-slate-100 rounded-xl mb-4">
            <span className="text-2xl sm:text-3xl">👑</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-700 to-slate-700 bg-clip-text text-transparent mb-2">
            Add New User
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">Register a new team member to the system</p>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`mb-6 p-4 sm:p-5 rounded-lg border-l-4 animate-slideDown ${
              message.startsWith("✅")
                ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                : "bg-red-50 border-red-500 text-red-700"
            }`}
          >
            <p className="font-semibold text-sm sm:text-base flex items-center gap-2">
              {message.startsWith("✅") ? (
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              {message}
            </p>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4 sm:space-y-5">
          {/* Full Name */}
          <div className="group">
            <label className="block mb-2 font-semibold text-slate-700 text-sm transition-colors group-focus-within:text-blue-600">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:border-blue-500 transition-all duration-200 bg-slate-50 focus:bg-white hover:border-slate-400 text-sm sm:text-base placeholder:text-slate-400"
              required
            />
          </div>

          {/* Email Address */}
          <div className="group">
            <label className="block mb-2 font-semibold text-slate-700 text-sm transition-colors group-focus-within:text-blue-600">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:border-blue-500 transition-all duration-200 bg-slate-50 focus:bg-white hover:border-slate-400 text-sm sm:text-base placeholder:text-slate-400"
              required
            />
          </div>

          {/* Password */}
          <div className="group">
            <label className="block mb-2 font-semibold text-slate-700 text-sm transition-colors group-focus-within:text-blue-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:border-blue-500 transition-all duration-200 bg-slate-50 focus:bg-white hover:border-slate-400 text-sm sm:text-base placeholder:text-slate-400"
              required
            />
          </div>

          {/* Role Selection */}
          <div className="group">
            <label className="block mb-2 font-semibold text-slate-700 text-sm transition-colors group-focus-within:text-blue-600">
              User Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:border-blue-500 transition-all duration-200 hover:border-slate-400 cursor-pointer text-sm sm:text-base appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23636363' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '16px 12px',
                backgroundRepeat: 'no-repeat',
                paddingRight: '2.5rem'
              }}
            >
              <option value="employee">👤 Employee</option>
              <option value="technician">🔧 Technician</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-8 sm:mt-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2.5 sm:py-3 lg:py-3.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 text-sm sm:text-base"
        >
          Create User
        </button>

        {/* Footer Info */}
        <p className="text-center text-xs sm:text-sm text-slate-500 mt-6 pt-6 border-t border-slate-200">
          New users will receive email verification
        </p>
      </form>
    </div>
  );
}
