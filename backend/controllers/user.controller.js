import User from "../models/userModel.js"
import bcrypt from "bcryptjs";
import {setuser,getuser} from "../utils/jwtauth.js"


const handleregister=async(req,res)=>{
     try {
        const { name, email, password, role } = req.body;

        // 1️⃣ Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 2️⃣ Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 3️⃣ Create new user
        const newUser = await User.create({
            name,
            email,
            password, // will be hashed automatically
            role
        });

        // 4️⃣ Respond with success
        res.status(201).json({
        message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
  } catch (error) {
    console.error("❌ Error in registerUser:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}



//login controller 
 const handleLogin = async (req, res) => {
  console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
  
  try {
    const { email, password } = req.body;
    

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3️⃣ Compare password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    
    const token=setuser(user);

      res.cookie("tokenid",token,{
          httpOnly: true,      // Secure against JS access (XSS)
          secure: false,       // ❌ false for localhost (set true in production HTTPS)
          sameSite: "Lax",     // or "None" if frontend runs on different domain
          maxAge: 24 * 60 * 60 * 1000, // 1 day
      })

    // 4️⃣ If login successful
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


 const handlefetchallusers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }); // exclude admin
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
 }

  const handlefetchtechnicians = async (req, res) => {
  try {
    const technicians = await User.find({ role: "technician" }); 
    res.json(technicians);
  } catch (error) {
    res.status(500).json({ message: "Error fetching technicians", error });
  }
 }

  const handleupdateuser = async (req, res) => {
   try {
    const userId = req.params.id;
    const { name, email, role, password } = req.body;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only provided fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save updated user
    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error while updating user", error });
  }

 }


  const handledeleteuser = async (req, res) => {
      try {
      const userId = req.params.id;

      // Check if user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Delete the user
      await User.findByIdAndDelete(userId);
      res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Error deleting user", error });
    }
 }

   const handlelogout = async (req, res) => {
      res.clearCookie("tokenid", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  return res.status(200).json({ message: "Logged out successfully" });
 }


 //handle valid login

  const handlevalidlogin = async (req, res) => {
      const tokenid=req.cookies?.tokenid;      
      
      if(!tokenid){
        res.json({
        user: {
          role: "unauthorized",
      }
     })
      } else{
       const user=getuser(tokenid)

      if(user){
         res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
      }else{
        console.log("eroror");
      }
    }
 }

export {handleregister,handleLogin,handlefetchallusers,handledeleteuser,handleupdateuser,handlevalidlogin,handlelogout,handlefetchtechnicians};