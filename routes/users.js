import { Router } from "express";
import { deleteUserByID, getAllUsers, getUserByID, updateUserByID } from "../controllers/userController.js";
import checkAdminOrOwner from "../middleware/checkAdminOrOwner.js";
import { checkAuthorisedDelete, checkAuthorisedUpdate } from "../middleware/checkAuthorisedShares.js";
import verifyUser from "../middleware/verifyUser.js";


const userRouter = Router()

// We define the paths to get our methods 
userRouter.get('/users', verifyUser, checkAdminOrOwner, getAllUsers)
userRouter.get('/user/:id', verifyUser, checkAdminOrOwner, getUserByID)
userRouter.delete('/user/:id',verifyUser, checkAdminOrOwner, checkAuthorisedDelete, deleteUserByID )
userRouter.put('/user/:id', verifyUser, checkAdminOrOwner, checkAuthorisedUpdate, updateUserByID)

export default userRouter