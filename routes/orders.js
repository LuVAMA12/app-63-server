import { Router } from "express";
import { createOrder, deleteOrderByID, getAllOrders, getOrderByID, updateOrderById } from "../controllers/orderController.js";
import { checkAdminOrOwner } from "../middleware/checkAutorizations.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const orderRouter = Router()

orderRouter.get('/orders', verifyAdmin, checkAdminOrOwner, getAllOrders)
orderRouter.get('/order/:id', verifyAdmin, checkAdminOrOwner, getOrderByID)
orderRouter.post('/addOrder', createOrder)
orderRouter.put('/order/:id', verifyAdmin, checkAdminOrOwner, updateOrderById) 
orderRouter.delete('/order/:id', verifyAdmin, checkAdminOrOwner, deleteOrderByID) 

export default orderRouter