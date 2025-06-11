import jwt from "jsonwebtoken"
import { getAdminByID, getAllAdmins } from "../controllers/adminController.js"
import { createAdmin } from "../controllers/authController.js"
import checkOwner from "../middleware/checkOwner.js"
import verifyAdmin from "../middleware/verifyUser.js"
import { Router } from "express"

const adminRouter = Router()

adminRouter.get('/admins',verifyAdmin, checkOwner, getAllAdmins)
adminRouter.get('/profile', verifyAdmin, getAdminByID)

export default adminRouter