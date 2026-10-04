import express from 'express'
import { createTicket,deleteTicket,updateTicket,getAllTickets,getTechTickets,getempTickets } from '../controllers/ticket.controller.js'

const router = express.Router()


router.post("/createticket",createTicket)
router.get("/getallticket",getAllTickets)
router.put("/updateticket/:id",updateTicket)
router.delete("/deleteticket/:id",deleteTicket)
router.get("/gettechticket",getTechTickets)
router.get("/getempticket",getempTickets)




export default router;