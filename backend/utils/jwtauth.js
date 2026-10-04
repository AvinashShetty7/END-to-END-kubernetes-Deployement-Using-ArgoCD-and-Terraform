import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;

function setuser(user) {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn: "1d" } // expires in 1 day
  );
}

function getuser(token) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.error("Invalid or expired token:", err.message);
    return null;
  }
}

export { setuser, getuser };




// import jwt from "jsonwebtoken"
// const secret="iamgodgodisgreat"

// function setuser(user){
//     return jwt.sign({
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }, secret);
// }

// function getuser(token){
//     return jwt.verify(token,secret)
// }

// export {setuser,getuser}