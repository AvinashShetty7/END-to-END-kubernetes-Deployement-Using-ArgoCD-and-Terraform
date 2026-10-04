
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// const checkauth = (req, res, next) => {
//   try {
//     const tokenid = req.cookies?.tokenid;    

//     if (!tokenid) {
//       // No token fou
      
//       return res.status(401).json({ message: "Unauthorized: No token provided" });
//     }

//     // Verify token
//     const user = jwt.verify(tokenid, process.env.JWT_SECRET);

//     // Attach user info to request
//     req.user = user;
//     next();
//   } catch (err) {
//     console.error("JWT verification failed:", err.message);
//     return res.status(403).json({ message: "Invalid or expired token" });
//   }
// };

// export { checkauth };




import { getuser } from "../utils/jwtauth.js";
const checkauth = (req, res, next) => {

  const tokenid = req.cookies?.tokenid;
  console.log(tokenid);

  if (tokenid) {
    const user = getuser(tokenid);
    console.log(user.id);
    req.user = user;
    next();
  } else {
    next();
  }
};
export { checkauth };