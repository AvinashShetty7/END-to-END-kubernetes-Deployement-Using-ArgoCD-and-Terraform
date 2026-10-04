import React from 'react'
import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-800 via-blue-700 to-blue-900 text-white p-6 sm:p-7 space-y-8 shadow-2xl border-r border-blue-600 sticky top-0 h-screen overflow-y-auto">
        {/* Header */}
        <div className="pb-6 border-b border-blue-600/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-100" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight leading-tight">Admin</h1>
              <p className="text-xs text-blue-200 font-medium">Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <ul className="space-y-3">
          {/* Register Users */}
          <li>
            <Link
              to="register"
              className="group w-full text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 transition-all duration-200 flex items-center gap-3 hover:translate-x-1"
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-200">➕</span>
              <span className="font-semibold text-sm text-blue-50 group-hover:text-white transition-colors duration-200">
                Register Users
              </span>
              <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </li>

          {/* Edit User Info */}
          <li>
            <Link
              to="edituser"
              className="group w-full text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 transition-all duration-200 flex items-center gap-3 hover:translate-x-1"
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-200">✏️</span>
              <span className="font-semibold text-sm text-blue-50 group-hover:text-white transition-colors duration-200">
                Edit User Info
              </span>
              <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </li>

          {/* View Tickets */}
          <li>
            <Link
              to="viewtickets"
              className="group w-full text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 transition-all duration-200 flex items-center gap-3 hover:translate-x-1"
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-200">🎟️</span>
              <span className="font-semibold text-sm text-blue-50 group-hover:text-white transition-colors duration-200">
                View Tickets
              </span>
              <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </li>
        </ul>

        {/* Footer */}
        <div className="pt-6 border-t border-blue-600/30 mt-auto">
          <p className="text-xs text-blue-200 font-medium">Admin Portal v1.0</p>
          <p className="text-xs text-blue-300/60 mt-1">© 2024 OpsDesk</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8"></div>
    </div>
  )
}

// import React from 'react'
// import {Link} from "react-router-dom"

// export default function Sidebar() {
//   return (
    
//       <div  className="min-h-screen flex bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-blue-800 text-white p-5 space-y-5">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <ul className="space-y-2 ">
//           <li className="mt-6 mb-6">
//             <Link
//               to="register"
//               // onClick={() => setActiveTab("register")}
//               className={`w-full text-left p-2 rounded-md `}
//             >
//               ➕ Register Users
//             </Link>
//           </li>
//           <li className="mt-6 mb-6">
//             <Link
//             to="edituser"
//               // onClick={() => setActiveTab("editUsers")}
//               className={`w-full text-left p-2 rounded-md `}
//             >
//               ✏️ Edit User Info
//             </Link>
//           </li>
//           <li className="mt-6 mb-6">
//             <Link
//             to="viewtickets"
//               // onClick={() => setActiveTab("tickets")}
//               className={`w-full text-left p-2 rounded-md `}
//             >
//               🎟️ View Tickets
//             </Link>
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       {/* <div className="flex-1 p-8">{renderSection()}</div> */}
//     </div>
    
//   )
// }
