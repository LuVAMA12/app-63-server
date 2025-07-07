import { Router } from "express";
import { createItem, deleteItemByID, getAllItems, getItemByID, updateItemByID } from "../controllers/itemController.js";
import { checkAdminOrOwner } from "../middleware/checkAutorizations.js";
import { upload } from "../middleware/uploadFile.js";
import verifyAdmin from "../middleware/verifyAdmin.js";
import { requireAtLeastOneField, validateFields } from "../middleware/verifyFields.js";

const itemRouter = Router()

itemRouter.get("/items", getAllItems)
itemRouter.get("/items/:id", getItemByID)
itemRouter.post("/addItem",verifyAdmin, checkAdminOrOwner, validateFields([ "title", "description", "price", "category"]), upload.single("image"),createItem)
itemRouter.delete("/items/:id",verifyAdmin, checkAdminOrOwner, deleteItemByID)
itemRouter.patch("/items/:id",verifyAdmin, checkAdminOrOwner, upload.single("image"), requireAtLeastOneField(["title", "description", "price", "category", "quantity"]), updateItemByID)


export default itemRouter