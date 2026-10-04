import { Link } from 'react-router-dom'
import React, { useState, useEffect } from "react";


export default function Techsidebar() {

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-800 via-blue-700 to-blue-900 text-white p-6 sm:p-7 space-y-8 shadow-2xl border-r border-blue-600 sticky top-0 h-screen overflow-y-auto">
        {/* Header */}
        <div className="pb-6 border-b border-blue-600/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-100" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight leading-tight">Technician</h1>
              <p className="text-xs text-blue-200 font-medium">Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <ul className="space-y-3">
          {/* Tickets Link */}
          <li>
            <Link
              to="tickets"
              className="group w-full text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 transition-all duration-200 flex items-center gap-3 hover:translate-x-1"
            >
              <svg className="w-5 h-5 text-blue-200 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 012-2h6a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                <path d="M16 4a2 2 0 012-2h-2.5A2.5 2.5 0 0013 4v14a2 2 0 002 2h2.5a2 2 0 002-2V4z" />
              </svg>
              <span className="font-semibold text-sm text-blue-50 group-hover:text-white transition-colors duration-200">
                My Tickets
              </span>
              <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </li>
        </ul>

        {/* Footer */}
        <div className="pt-6 border-t border-blue-600/30 mt-auto">
          <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/10">
            <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="9" fill="currentColor" />
            </svg>
            <div>
              <p className="text-xs font-bold text-blue-50">Status</p>
              <p className="text-xs text-emerald-300">Ready to Work</p>
            </div>
          </div>
          <p className="text-xs text-blue-200 font-medium mt-4">Tech Portal v1.0</p>
          <p className="text-xs text-blue-300/60 mt-1">© 2024 OpsDesk</p>
        </div>
      </div>

      {/* Main Content Area - Placeholder for content */}
      <div className="flex-1"></div>
    </div>
  )
}




// // import React from 'react'
// import { Link } from 'react-router-dom'
// import React, { useState, useEffect } from "react";


// export default function Techsidebar() {

//   return (
    
//           <div  className="min-h-screen flex bg-gray-100">
//           {/* Sidebar */}
//           <div className="w-64 bg-blue-800 text-white p-5 space-y-5">
//             <h1 className="text-2xl font-bold">Technician Dashboard</h1>
//             <ul className="space-y-2">
//               <li>
//                 <Link
//                   to="tickets"
//                   className={`w-full text-left p-2 rounded-md `}
//                 >
//                   Tickets
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
    
 
    
//   )
// }
