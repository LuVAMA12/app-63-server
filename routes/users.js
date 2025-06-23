import { Router } from "express";
import { getAllUsers, getUserByID, updateUserByID } from "../controllers/userController.js";
import { checkAdminOrOwner } from "../middleware/checkAutorizations.js";
import verifyAdmin from "../middleware/verifyAdmin.js";


const userRouter = Router()

// We define the paths to get our methods 
userRouter.get('/users', verifyAdmin, checkAdminOrOwner, getAllUsers)
userRouter.get('/user/:id', verifyAdmin, checkAdminOrOwner, getUserByID)
userRouter.put('/user/:id', verifyAdmin, checkAdminOrOwner,  updateUserByID)

export default userRouter