import express from 'express'
import {handleregister,handlefetchallusers,handledeleteuser,handleupdateuser,handlelogout,handlefetchtechnicians} from '../controllers/user.controller.js'

const router = express.Router()


router.post("/register",handleregister)
router.get("/fetchuser",handlefetchallusers)
router.delete("/deleteuser/:id",handledeleteuser)
router.put("/updateuser/:id",handleupdateuser)
router.post("/logout",handlelogout)
router.get("/fetchtechnicians",handlefetchtechnicians)






export default router; 