import { Router } from "express"

import { deleteAdminByID, getAdminByID, getAllAdmins, updateAdminByID, updateRoleByID } from "../controllers/adminController.js"
import { checkAdminOrOwner, checkAuthorisedDelete, checkAuthorisedUpdate, checkOwner } from "../middleware/checkAutorizations.js"
import verifyAdmin from "../middleware/verifyAdmin.js"


const adminRouter = Router()

adminRouter.get('/admins',verifyAdmin, checkOwner, getAllAdmins)
adminRouter.get('/profile', verifyAdmin, checkAdminOrOwner, getAdminByID)
adminRouter.delete('deleteAccount/:id', verifyAdmin, checkAdminOrOwner, checkAuthorisedDelete, deleteAdminByID)
adminRouter.put('updateAccount/:id', verifyAdmin, checkAdminOrOwner, checkAuthorisedUpdate, updateAdminByID)
adminRouter.put('/role/:id', verifyAdmin, checkOwner, checkAuthorisedUpdate, updateRoleByID)


export default adminRouter