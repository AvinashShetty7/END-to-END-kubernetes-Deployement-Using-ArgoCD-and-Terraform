
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: 
  { 
    type: String, 
    enum: ["Open", "In Progress", "Resolved", "Closed"],
    default: "Open" 
  },
  priority: 
  { 
    type: String, 
    enum: ["Low", "Medium", "High"],
    default: "Medium" 
  },
  createdBy: 
  { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "User",
     required:"true"
 },
  assignedTo: 
  { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "User"
 }
}, { timestamps: true });

export default mongoose.model("Ticket", ticketSchema);
