import { Router } from "express";
import { getAllUsers, getUserByID } from "../controllers/userController.js";
import { checkAdminOrOwner } from "../middleware/checkAutorizations.js";
import verifyAdmin from "../middleware/verifyAdmin.js";


const userRouter = Router()

userRouter.get('/users', verifyAdmin, checkAdminOrOwner, getAllUsers)
userRouter.get('/user/:id', verifyAdmin, checkAdminOrOwner, getUserByID)

export default userRouter