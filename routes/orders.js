import { Router } from "express";
import { addItemsInOrder, createOrder, deleteOrderByID, getAllOrders, getOrderByID } from "../controllers/orderController.js";
import { checkAdminOrOwner } from "../middleware/checkAutorizations.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const orderRouter = Router()

orderRouter.get('/orders', verifyAdmin, checkAdminOrOwner, getAllOrders)
orderRouter.get('/order/:id', verifyAdmin, checkAdminOrOwner, getOrderByID)
orderRouter.post('/addOrder', createOrder)
orderRouter.post('/addItems/:id', addItemsInOrder) 
orderRouter.delete('/order/:id', verifyAdmin, checkAdminOrOwner, deleteOrderByID) 

export default orderRouter