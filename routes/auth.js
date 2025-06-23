import { Router } from "express";
import { createAdmin, loginAdmin } from "../controllers/authController.js";
import { checkOwner } from "../middleware/checkAutorizations.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const authRouter = Router()

// We define the paths to get our methods
authRouter.post('/register',verifyAdmin, checkOwner, createAdmin)
authRouter.post('/login', loginAdmin)

export default authRouter