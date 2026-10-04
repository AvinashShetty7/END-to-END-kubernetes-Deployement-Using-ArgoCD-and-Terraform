import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TechTickets() {
  const navigate = useNavigate()
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, [filter]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/ticket/gettechticket`,
        { withCredentials: true }
      );
      setTickets(res.data);
      console.log(res.data);
    } catch (err) {
      if (err.status === 401) {
        navigate("/");
      }
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      await axios.put(
        `/api/ticket/updateticket/${ticketId}`,
        { status: newStatus },
        { withCredentials: true }
      );

      // Update UI instantly without refetching
      setTickets((prevTickets) =>
        prevTickets.map((t) =>
          t._id === ticketId ? { ...t, status: newStatus } : t
        )
      );
    } catch (err) {
      console.error("Error updating ticket status:", err);
      alert("Failed to update status");
    }
  };

  const filteredTickets =
    filter === "all"
      ? tickets
      : tickets.filter((t) => t.status.toLowerCase() === filter);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-amber-100 text-amber-700 border-amber-300";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "resolved":
        return "bg-emerald-100 text-emerald-700 border-emerald-300";
      case "closed":
        return "bg-slate-100 text-slate-700 border-slate-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-300";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "text-red-600 font-bold";
      case "medium":
        return "text-amber-600 font-semibold";
      case "low":
        return "text-emerald-600 font-medium";
      default:
        return "text-slate-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-700 to-slate-700 bg-clip-text text-transparent mb-2 text-center sm:text-left">
            My Assigned Tickets
          </h1>
          <p className="text-slate-600 text-sm sm:text-base text-center sm:text-left">
            View and manage your assigned support tickets
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center sm:justify-start gap-2 sm:gap-3 mb-8 sm:mb-10 flex-wrap">
          {["all", "open", "in-progress", "resolved", "closed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 border ${
                filter === status
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg border-blue-700 hover:shadow-xl"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:shadow-md"
              }`}
            >
              {status === "all" ? "All Tickets" : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-16 sm:py-24">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-blue-600"></div>
              <p className="text-slate-600 text-sm sm:text-base font-medium">Loading tickets...</p>
            </div>
          </div>
        ) : (
          /* Tickets Grid */
          <>
            {filteredTickets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {filteredTickets.map((ticket) => (
                  <div
                    key={ticket._id}
                    className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 hover:border-blue-300 transition-all duration-300 flex flex-col group"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start gap-3 mb-4">
                      <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200 flex-1">
                        {ticket.title}
                      </h2>
                      <span
                        className={`text-xs sm:text-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-bold whitespace-nowrap flex-shrink-0 border ${getStatusColor(ticket.status)}`}
                      >
                        {ticket.status}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 text-xs sm:text-sm mb-4 line-clamp-3">
                      {ticket.description}
                    </p>

                    {/* Ticket Details */}
                    <div className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6 pb-4 sm:pb-5 border-b border-slate-100 flex-grow">
                      {/* Ticket ID */}
                      <div className="flex gap-2 text-xs sm:text-sm">
                        <span className="font-semibold text-slate-700 min-w-fit">ID:</span>
                        <span className="text-slate-600 truncate font-mono text-xs">{ticket._id.slice(0, 8)}...</span>
                      </div>

                      {/* Priority */}
                      <div className="flex gap-2 text-xs sm:text-sm">
                        <span className="font-semibold text-slate-700 min-w-fit">Priority:</span>
                        <span className={getPriorityColor(ticket.priority)}>
                          {ticket.priority || "N/A"}
                        </span>
                      </div>

                      {/* Created By */}
                      <div className="flex gap-2 text-xs sm:text-sm">
                        <span className="font-semibold text-slate-700 min-w-fit">By:</span>
                        <span className="text-slate-600 truncate">{ticket.createdBy.email || "N/A"}</span>
                      </div>

                      {/* Created Date */}
                      <div className="flex gap-2 text-xs sm:text-sm">
                        <span className="font-semibold text-slate-700 min-w-fit">Date:</span>
                        <span className="text-slate-600">{ticket.createdAt
                          ? new Date(ticket.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })
                          : "N/A"}</span>
                      </div>

                      {/* Assigned To */}
                      <div className="flex gap-2 text-xs sm:text-sm">
                        <span className="font-semibold text-slate-700 min-w-fit">You</span>
                        <span className="text-slate-600 font-medium">
                          {ticket.assignedTo ? ticket.assignedTo.name : "Unassigned"}
                        </span>
                      </div>
                    </div>

                    {/* Status Update Section */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center pt-4 border-t border-slate-100">
                      <label className="text-xs sm:text-sm font-semibold text-slate-700 whitespace-nowrap">
                        Update Status:
                      </label>
                      <select
                        value={ticket.status}
                        onChange={(e) =>
                          handleStatusChange(ticket._id, e.target.value)
                        }
                        className="flex-1 border border-slate-300 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23636363' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e")`,
                          backgroundPosition: 'right 0.5rem center',
                          backgroundSize: '14px 10px',
                          backgroundRepeat: 'no-repeat',
                          paddingRight: '2rem'
                        }}
                      >
                        {["open", "in-progress", "resolved"].map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-16 sm:py-24">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-center text-slate-700 text-base sm:text-lg font-semibold mb-1">
                  No tickets found
                </p>
                <p className="text-center text-slate-500 text-xs sm:text-sm max-w-xs">
                  You don't have any {filter !== "all" ? filter : ""} tickets assigned at the moment
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}



// import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// export default function TechTickets() {
//   const navigate=useNavigate()
//   const [tickets, setTickets] = useState([]);
//   const [filter, setFilter] = useState("all");

//   useEffect(() => {
//     fetchTickets();
//   }, [filter]);

//   const fetchTickets = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/ticket/gettechticket`,
//         { withCredentials: true }
//       );
//       setTickets(res.data);
//       console.log(res.data);
//     } catch (err) {
//       if (err.status === 401) {
//         navigate("/");
//       }
//       console.error("Error fetching tickets:", err);
//     }
//   };

//   const handleStatusChange = async (ticketId, newStatus) => {
//     try {
//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/ticket/updateticket/${ticketId}`,
//         { status: newStatus },
//         { withCredentials: true }
//       );

//       // Update UI instantly without refetching
//       setTickets((prevTickets) =>
//         prevTickets.map((t) =>
//           t._id === ticketId ? { ...t, status: newStatus } : t
//         )
//       );
//     } catch (err) {
//       console.error("Error updating ticket status:", err);
//       alert("Failed to update status");
//     }
//   };

//   const filteredTickets =
//     filter === "all"
//       ? tickets
//       : tickets.filter((t) => t.status.toLowerCase() === filter);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6 text-center">Tickets</h1>
//       <div className="flex justify-center gap-3 mb-8 flex-wrap">
//         {["all", "open", "in-progress", "resolved", "closed"].map((status) => (
//           <button
//             key={status}
//             onClick={() => setFilter(status)}
//             className={`px-4 py-2 rounded-lg transition-all duration-200 ${
//               filter === status
//                 ? "bg-blue-600 text-white shadow"
//                 : "bg-gray-300 hover:bg-gray-400"
//             }`}
//           >
//             {status.charAt(0).toUpperCase() + status.slice(1)}
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredTickets.length > 0 ? (
//           filteredTickets.map((ticket) => (
//             <div
//               key={ticket._id}
//               className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
//             >
//               <div className="flex justify-between items-center mb-3">
//                 <h2 className="text-lg font-semibold text-gray-800">
//                   {ticket.title}
//                 </h2>

//                 <span
//                   className={`text-xs px-3 py-1 rounded-full font-medium ${
//                     ticket.status === "open"
//                       ? "bg-yellow-200 text-yellow-800"
//                       : ticket.status === "in-progress"
//                       ? "bg-blue-200 text-blue-800"
//                       : "bg-green-200 text-green-800"
//                   }`}
//                 >
//                   {ticket.status}
//                 </span>
//               </div>

//               <p className="text-gray-700 text-sm mb-3 line-clamp-3">
//                 {ticket.description}
//               </p>

//               <div className="text-sm text-gray-600 space-y-1 mb-4">
//                 <p>
//                   <strong>Ticket ID:</strong> {ticket._id}
//                 </p>
//                 <p>
//                   <strong>Priority:</strong> {ticket.priority || "N/A"}
//                 </p>
//                 <p>
//                   <strong>createdby:</strong> {ticket.createdBy.email || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Created On:</strong>{" "}
//                   {ticket.createdAt
//                     ? new Date(ticket.createdAt).toLocaleString()
//                     : "N/A"}
//                 </p>
//                 <p>
//                   <strong>Technician:</strong>{" "}
//                   {ticket.assignedTo ? ticket.assignedTo.name : "Unassigned"}
//                 </p>
//               </div>

//               <div className="flex justify-between items-center mt-3">
//                 <label className="text-sm font-medium text-gray-700">
//                   Update Status:
//                 </label>
//                 <select
//                   value={ticket.status}
//                   onChange={(e) =>
//                     handleStatusChange(ticket._id, e.target.value)
//                   }
//                   className="ml-2 border border-gray-300 rounded-md px-2 py-1 text-sm"
//                 >
//                   {["open", "in-progress", "resolved"].map((status) => (
//                     <option key={status} value={status}>
//                       {status.charAt(0).toUpperCase() + status.slice(1)}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500 col-span-full">
//             No tickets found.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
