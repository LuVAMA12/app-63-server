import { Router } from "express";
import { getAllUsers, getUserByID, updateUserByID } from "../controllers/userController.js";
import verifyUser from "../middleware/verifyUser.js";
import { checkAdminOrOwner } from "../middleware/checkAutorizations.js";


const userRouter = Router()

// We define the paths to get our methods 
userRouter.get('/users', verifyUser, checkAdminOrOwner, getAllUsers)
userRouter.get('/user/:id', verifyUser, checkAdminOrOwner, getUserByID)
userRouter.put('/user/:id', verifyUser, checkAdminOrOwner,  updateUserByID)

export default userRouter