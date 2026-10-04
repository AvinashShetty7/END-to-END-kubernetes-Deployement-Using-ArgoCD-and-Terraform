import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const [profilename, setprofilename] = useState("");
  // const [setLoading] = useState(false);

  useEffect(() => {
    const checkValidUser = async () => {
      try {
        const res = await axios.get(
          `/api/userpublic/validlogin`,
          { withCredentials: true }
        );
        setprofilename(res.data.user.name);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        // setLoading(false);
      }
    };
    checkValidUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `/api/user/logout`,
        {},
        { withCredentials: true }
      );
      console.log("Logout success");
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 text-white shadow-lg px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex justify-between items-center sticky top-0 z-50 border-b border-blue-600">
      {/* Logo Section */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-lg sm:text-xl font-bold">🎫</span>
        </div>
        <h1 className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight">
          OpsDesk
        </h1>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
        {/* User Profile */}
        <div className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-100" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span className="text-xs sm:text-sm font-semibold text-blue-50 truncate max-w-xs">
            {profilename || "User"}
          </span>
        </div>

        {/* Mobile User Name */}
        <div className="sm:hidden flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
          <svg className="w-3.5 h-3.5 text-blue-100 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-semibold text-blue-50 truncate max-w-20">
            {profilename ? profilename.split(" ")[0] : "User"}
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xs sm:text-sm px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 border border-red-600 hover:border-red-700 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="hidden sm:inline">Logout</span>
          <span className="sm:hidden">Exit</span>
        </button>
      </div>
    </nav>
  );
}

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useEffect,useState } from "react";

// export default function Navbar({ user }) {
//   const navigate = useNavigate();
//   const [profilename,setprofilename]=useState("");

//     useEffect(() => {
//       const checkValidUser = async () => {
//         try {
//           const res = await axios.get(
//             `${import.meta.env.VITE_API_URL}/api/userpublic/validlogin`,
//             { withCredentials: true }
//           );
//           setprofilename(res.data.user.name)
//         } catch (err) {
//           console.error("Error:", err);
//         } finally {
//           setLoading(false);
//         }
//       };
//       checkValidUser();
//     }, []);


//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/user/logout`,
//         {},
//         { withCredentials: true }
//       );
//       console.log("Logout success");
//       navigate("");
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   return (
//     <nav className="bg-blue-700 text-white shadow-md px-6 py-3 flex justify-between items-center">
//       <h1 className="text-xl font-semibold">🎫 OpsDesk</h1>

//       <div className="flex items-center gap-4">
//         <span className="font-medium">{profilename || "User"}</span>
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md transition"
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }
