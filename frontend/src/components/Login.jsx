import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // for redirecting

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const checkValidUser = async () => {
      try {
        const res = await axios.get(
          `/api/userpublic/validlogin`,
          { withCredentials: true }
        );
        if (res.data.user.role == "unauthorized") {
          console.log("invalid user");
        } else {
          const validuser = res.data.user.role;

          if (validuser === "admin") navigate("/admin");
          else if (validuser === "technician") navigate("/technician");
          else if (validuser === "employee") navigate("/employee");
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    checkValidUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const res = await axios.post(
        `/api/userpublic/login`,
        formData,
        { withCredentials: true } 
      );

      // If backend returns a token + user data
      if (res.status === 200) {
        // const { token, user } = res.data;
        const { user } = res.data;
        setMessage("✅ Login successful!");

        if (user.role === "admin") {
          navigate("/admin");
        } else if (user.role === "technician") {
          navigate("/technician");
        } else {
          navigate("/employee");
        }
      }
    } catch (error) {
      if (error.response) {
        setMessage(
          `❌ ${error.response.data.message || "Invalid credentials"}`
        );
      } else {
        setMessage("❌ Server not responding");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-slate-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
              <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
          </div>
          <p className="text-slate-600 text-sm sm:text-base font-semibold">Verifying your session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md lg:max-w-lg">
        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-slate-200"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-slate-100 rounded-2xl mb-4 shadow-lg">
              <span className="text-3xl sm:text-4xl">🔐</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-700 to-slate-700 bg-clip-text text-transparent mb-2">
              Welcome Back zeno_company
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">Sign in to your account to continue</p>
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

          {/* Form Fields */}
          <div className="space-y-4 sm:space-y-5">
            {/* Email Field */}
            <div className="group">
              <label className="block mb-2 font-semibold text-slate-700 text-sm transition-colors group-focus-within:text-blue-600">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:border-blue-500 transition-all duration-200 bg-slate-50 focus:bg-white hover:border-slate-400 text-sm sm:text-base placeholder:text-slate-400"
                  required
                  disabled={isSubmitting}
                />
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="block mb-2 font-semibold text-slate-700 text-sm transition-colors group-focus-within:text-blue-600">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:border-blue-500 transition-all duration-200 bg-slate-50 focus:bg-white hover:border-slate-400 text-sm sm:text-base placeholder:text-slate-400"
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex="-1"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M15.171 13.576l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414M9.822 9.822a1 1 0 001.414-1.414" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
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
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Sign In</span>
              </>
            )}
          </button>

          {/* Footer Info */}
          <p className="text-center text-xs sm:text-sm text-slate-500 mt-6 pt-6 border-t border-slate-200">
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              Contact admin
            </a>
          </p>
        </form>

        {/* Security Badge */}
        <div className="text-center mt-6 flex items-center justify-center gap-2 text-slate-500 text-xs sm:text-sm">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>Secure SSL Connection</span>
        </div>
      </div>
    </div>
  );
}


// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // for redirecting

// export default function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkValidUser = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/userpublic/validlogin`,
//           { withCredentials: true }
//         );
//         if (res.data.user.role == "unauthorized") {
//           console.log("invlaid user");
//         } else {
//           const validuser = res.data.user.role;

//           if (validuser === "admin") navigate("/admin");
//           else if (validuser === "technician") navigate("/technician");
//           else if (validuser === "employee") navigate("/employee");
//         }
//       } catch (err) {
//         console.error("Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkValidUser();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/userpublic/login`,
//         formData,
//         { withCredentials: true }
//       );

//       // If backend returns a token + user data
//       if (res.status === 200) {
//         // const { token, user } = res.data;
//         const { user } = res.data;
//         setMessage("✅ Login successful!");

//         if (user.role === "admin") {
//           navigate("/admin");
//         } else if (user.role === "technician") {
//           navigate("/technician");
//         } else {                                                                                                        
//           navigate("/employee");
//         }
//       }
//     } catch (error) {
//       if (error.response) {
//         setMessage(
//           `❌ ${error.response.data.message || "Invalid credentials"}`
//         );
//       } else {
//         setMessage("❌ Server not responding");
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <p className="text-gray-600 text-lg font-semibold animate-pulse"></p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-5"
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-800">
//           🔐 Login
//         </h2>

//         {message && (
//           <p
//             className={`text-center font-medium ${
//               message.startsWith("✅") ? "text-green-600" : "text-red-500"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         <input
//           type="email"
//           name="email"
//           placeholder="Email Address"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }
