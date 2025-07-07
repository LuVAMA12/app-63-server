import { Router } from "express"

import { deleteAdminByID, getAdminByID, getAllAdmins, updateAdminByID, updateRoleByID } from "../controllers/adminController.js"
import { checkAdminOrOwner, checkAuthorisedDelete, checkAuthorisedUpdate, checkOwner } from "../middleware/checkAutorizations.js"
import verifyAdmin from "../middleware/verifyAdmin.js"
import { requireAtLeastOneField, validateFields } from "../middleware/verifyFields.js"


const adminRouter = Router()

adminRouter.get("/admins",verifyAdmin, checkOwner, getAllAdmins)
adminRouter.get("/profile", verifyAdmin, checkAdminOrOwner, getAdminByID)
adminRouter.delete("/deleteAccount/:id", verifyAdmin, checkAdminOrOwner, checkAuthorisedDelete, deleteAdminByID)
adminRouter.patch("/updateAccount/:id", verifyAdmin, checkAdminOrOwner, checkAuthorisedUpdate, requireAtLeastOneField(["firstName", "lastName", "email", "password" ]), updateAdminByID)
adminRouter.patch("/role/:id", verifyAdmin, checkOwner, checkAuthorisedUpdate, validateFields(['role']), updateRoleByID)


export default adminRouter