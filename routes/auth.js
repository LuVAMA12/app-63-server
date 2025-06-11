import { Router } from "express";
import checkOwner from "../middleware/checkOwner.js";
import verifyUser from "../middleware/verifyUser.js";
import { createAdmin, createOwner, loginAdmin } from "../controllers/authController.js";

const authRouter = Router()

// We define the paths to get our methods
authRouter.post('/register',verifyUser, checkOwner, createAdmin)
authRouter.post('/login', loginAdmin)

export default authRouter