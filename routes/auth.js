import { Router } from "express";
import { createAdmin, loginAdmin } from "../controllers/authController.js";
import { checkOwner } from "../middleware/checkAutorizations.js";
import verifyAdmin from "../middleware/verifyAdmin.js";
import { validateFields } from "../middleware/verifyFields.js";

const authRouter = Router()

// We define the paths to get our methods
authRouter.post('/register',verifyAdmin, checkOwner, validateFields(['firstName', 'lastName', 'email','password']), createAdmin)
authRouter.post('/login', validateFields(['email', 'password']), loginAdmin)

export default authRouter