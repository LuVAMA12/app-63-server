import { Router } from "express";
import { createItem, deleteItemByID, getAllItems, getItemByID, updateItemByID } from "../controllers/itemController.js";
import { checkAdminOrOwner } from "../middleware/checkAutorizations.js";
import { upload } from "../middleware/uploadFile.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const itemRouter = Router()

itemRouter.get('/items', getAllItems)
itemRouter.get('/item/:id', getItemByID)
itemRouter.post('/addItem',verifyAdmin, checkAdminOrOwner, upload.single('image'),createItem)
itemRouter.delete('/item/:id',verifyAdmin, checkAdminOrOwner, deleteItemByID)
itemRouter.put('/item/:id',verifyAdmin, checkAdminOrOwner, upload.single('image'),updateItemByID)


export default itemRouter