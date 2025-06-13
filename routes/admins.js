import jwt from "jsonwebtoken"
import { getAdminByID, getAllAdmins, updateAdminByID } from "../controllers/adminController.js"
import { createAdmin } from "../controllers/authController.js"
import verifyAdmin from "../middleware/verifyUser.js"
import { Router } from "express"
import { checkAccountOwner, checkOwner } from "../middleware/checkAutorizations.js"

const adminRouter = Router()

adminRouter.get('/admins',verifyAdmin, checkOwner, getAllAdmins)
adminRouter.get('/profile', verifyAdmin, getAdminByID)
adminRouter.put('/admin', verifyAdmin, updateAdminByID)


export default adminRouter