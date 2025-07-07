import { Router } from "express";
import { createOrder, deleteOrderByID, getAllOrders, getOrderByID, updateOrderById } from "../controllers/orderController.js";
import { checkAdminOrOwner } from "../middleware/checkAutorizations.js";
import verifyAdmin from "../middleware/verifyAdmin.js";
import { requireAtLeastOneField, validateFields } from "../middleware/verifyFields.js";

const orderRouter = Router()

orderRouter.get("/orders", verifyAdmin, checkAdminOrOwner, getAllOrders)
orderRouter.get("/orders/:id", verifyAdmin, checkAdminOrOwner, getOrderByID)
orderRouter.post("/addOrder", validateFields(["firstName", "lastName", "email", "phone", "items"]), createOrder)
orderRouter.patch("/orders/:id", verifyAdmin, checkAdminOrOwner, requireAtLeastOneField(["firstName", "lastName", "email", "phone", "items"]), updateOrderById) 
orderRouter.delete("/orders/:id", verifyAdmin, checkAdminOrOwner, deleteOrderByID) 

export default orderRouter