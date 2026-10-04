import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateTicket() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    // Validate form
    if (!formData.title.trim() || !formData.description.trim()) {
      setMessage("❌ Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    // Send to backend API
    try {
      const res = await axios.post(
        `/api/ticket/createticket`,
        formData,
        { withCredentials: true },
      );

      if (res.status === 200 || res.status === 201) {
        setMessage("✅ Ticket created successfully!");
        setFormData({ title: "", description: "", priority: "Low" });
        
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/employee");
        }, 2000);
      }
    } catch (error) {
      if (error.status === 401) {
        navigate("/");
      } else if (error.response?.data?.message) {
        setMessage(`❌ ${error.response.data.message}`);
      } else {
        setMessage("❌ Failed to create ticket. Please try again.");
      }
      console.error("Error creating ticket:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 px-4 py-8 sm:py-12 lg:py-16 flex items-center justify-center">
      <div className="w-full max-w-md lg:max-w-lg">
        <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-slate-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-slate-100 rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 sm:w-9 sm:h-9 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-700 to-slate-700 bg-clip-text text-transparent mb-2">
              Create New Ticket
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">Describe your issue and we'll help you resolve it</p>
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
              <p className="text-sm sm:text-base font-semibold flex items-center gap-2">
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Title Field */}
            <div className="group">
              <label className="block mb-2 font-semibold text-slate-700 text-sm transition-colors group-focus-within:text-blue-600">
                Ticket Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Brief summary of your issue"
                className="w-full px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:border-blue-500 transition-all duration-200 bg-slate-50 focus:bg-white hover:border-slate-400 text-sm sm:text-base placeholder:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                required
                disabled={isSubmitting}
              />
              <p className="text-xs text-slate-500 mt-1">Maximum 100 characters</p>
            </div>

            {/* Description Field */}
            <div className="group">
              <label className="block mb-2 font-semibold text-slate-700 text-sm transition-colors group-focus-within:text-blue-600">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide detailed information about your issue..."
                rows="5"
                className="w-full px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:border-blue-500 transition-all duration-200 bg-slate-50 focus:bg-white hover:border-slate-400 text-sm sm:text-base placeholder:text-slate-400 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                required
                disabled={isSubmitting}
              />
              <p className="text-xs text-slate-500 mt-1">Be specific and detailed for faster resolution</p>
            </div>

            {/* Priority Field */}
            <div className="group">
              <label className="block mb-2 font-semibold text-slate-700 text-sm transition-colors group-focus-within:text-blue-600">
                Priority Level
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:border-blue-500 transition-all duration-200 hover:border-slate-400 cursor-pointer text-sm sm:text-base appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23636363' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '16px 12px',
                  backgroundRepeat: 'no-repeat',
                  paddingRight: '2.5rem'
                }}
                disabled={isSubmitting}
              >
                <option value="Low">🟢 Low - General inquiry</option>
                <option value="Medium">🟡 Medium - Important issue</option>
                <option value="High">🔴 High - Urgent issue</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-8 sm:mt-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2.5 sm:py-3 lg:py-3.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                  </svg>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Create Ticket</span>
                </>
              )}
            </button>

            {/* Helper Text */}
            <p className="text-xs sm:text-sm text-slate-500 text-center">
              Your ticket will be assigned to our support team shortly
            </p>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-6 p-4 sm:p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-900 text-sm mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Tips for Better Support
          </h3>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Be specific about your issue</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Include error messages if applicable</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Set appropriate priority level</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}


