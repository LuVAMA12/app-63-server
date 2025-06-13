import { Router } from "express";
import verifyUser from "../middleware/verifyUser.js";
import { createAdmin, createOwner, loginAdmin } from "../controllers/authController.js";
import { checkOwner } from "../middleware/checkAutorizations.js";

const authRouter = Router()

// We define the paths to get our methods
authRouter.post('/register',verifyUser, checkOwner, createAdmin)
authRouter.post('/login', loginAdmin)

export default authRouter