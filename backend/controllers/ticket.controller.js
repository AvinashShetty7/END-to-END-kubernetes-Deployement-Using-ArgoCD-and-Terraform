import Ticket from "../models/ticketModel.js";


const createTicket = async (req, res) => {
  try {
    const { title, description, status, priority, assignedTo } = req.body;

    const newTicket = await Ticket.create({
      title,
      description,
      status,
      priority,
      createdBy: req.user.id,
      assignedTo,
    });

    res.status(201).json({
      message: "Ticket created successfully",
      ticket: newTicket,
    });
  } catch (error) {
    console.error("Error creating ticket:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("createdBy", "name email role")
      .populate("assignedTo", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(
      tickets.map((t) => ({
        ...t.toObject(),
        createdBy: t.createdBy || { email: "Deleted User" },
      }))
    );
  } catch (error) {
    console.error("Error fetching tickets:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTechTickets = async (req, res) => {
  try {
    
    const tickets = await Ticket.find({ assignedTo: req.user.id })
      .populate("createdBy", "name email role")
      .populate("assignedTo", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(
      tickets.map((t) => ({
        ...t.toObject(),
        createdBy: t.createdBy || { email: "Deleted User" },
      }))
    );
  } catch (error) {
    console.error("Error fetching tickets:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getempTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user.id })
      .populate("createdBy", "name email role")
      .populate("assignedTo", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(
      tickets.map((t) => ({
        ...t.toObject(),
        createdBy: t.createdBy || { email: "Deleted User" },
      }))
    );
  } catch (error) {
    console.error("Error fetching tickets:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
/**
 * @desc    Update a ticket by ID
 * @route   PUT /tickets/:id
 * @access  Public (or Protected)
 */
const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedTicket = await Ticket.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedTicket)
      return res.status(404).json({ message: "Ticket not found" });

    res.status(200).json({
      message: "Ticket updated successfully",
      ticket: updatedTicket,
    });
  } catch (error) {
    console.error("Error updating ticket:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Delete a ticket by ID
 * @route   DELETE /tickets/:id
 * @access  Public (or Protected)
 */
const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTicket = await Ticket.findByIdAndDelete(id);
    if (!deletedTicket)
      return res.status(404).json({ message: "Ticket not found" });
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Error deleting ticket:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {
  createTicket,
  updateTicket,
  deleteTicket,
  getAllTickets,
  getTechTickets,
  getempTickets,
};
