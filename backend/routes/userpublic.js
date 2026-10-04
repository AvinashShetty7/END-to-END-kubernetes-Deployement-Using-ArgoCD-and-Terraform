import express from 'express'
import { handleLogin,handlevalidlogin} from '../controllers/user.controller.js'

const router = express.Router()


router.post("/login",handleLogin)
router.get("/validlogin",handlevalidlogin)


export default router; 