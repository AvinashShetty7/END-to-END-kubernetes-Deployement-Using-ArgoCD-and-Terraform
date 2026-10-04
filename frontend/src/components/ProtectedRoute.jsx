import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children, allowedRole }) {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/user/validlogin", { withCredentials: true });
        if (res.data.user.role === allowedRole) setAuthorized(true);
        else setAuthorized(false);
      } catch {
        setAuthorized(false);
      }
    };
    verifyUser();
  }, [allowedRole]);

  if (authorized === null) return <div>Loading...</div>;
  return authorized ? children : <Navigate to="" />;
}
