import { Router } from "express"
import { getAdminByID, getAllAdmins, updateAdminByID } from "../controllers/adminController.js"
import { checkOwner } from "../middleware/checkAutorizations.js"
import verifyAdmin from "../middleware/verifyAdmin.js"

const adminRouter = Router()

adminRouter.get('/admins',verifyAdmin, checkOwner, getAllAdmins)
adminRouter.get('/profile', verifyAdmin, getAdminByID)
adminRouter.put('/admin', verifyAdmin, updateAdminByID)


export default adminRouter