import { Router } from "express";
import { createAdmin, createUser, loginAdmin } from "../controllers/authController.js";
import checkOwner from "../middleware/checkOwner.js";
import verifyUser from "../middleware/verifyUser.js";

const authRouter = Router()

// We define the paths to get our methods 
authRouter.post('/register', createUser)
authRouter.post('/registerAdmin',verifyUser, checkOwner, createAdmin)
authRouter.post('/login', loginAdmin)

export default authRouter