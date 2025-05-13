import { Router } from "express";
import { createItem, deleteItemByID, getAllItems, getItemByID, updateItemByID } from "../controllers/itemController.js";
import checkAdminOrOwner from "../middleware/checkAdminOrOwner.js";
import { upload } from "../middleware/uploadFile.js";
import verifyUser from "../middleware/verifyUser.js";

const itemRouter = Router()

itemRouter.get('/items', getAllItems)
itemRouter.get('/item/:id', getItemByID)
itemRouter.post('/item',verifyUser, checkAdminOrOwner, upload.single('image'),createItem)
itemRouter.delete('/item/:id',verifyUser, checkAdminOrOwner, deleteItemByID)
itemRouter.put('/item/:id',verifyUser, checkAdminOrOwner, upload.single('image'),updateItemByID)


export default itemRouter