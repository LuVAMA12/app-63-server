import { Router } from "express";
import { addItemsInOrder, createOrder, deleteOrderByID, getAllOrders, getOrderByID } from "../controllers/orderController.js";
import checkAdminOrOwner from "../middleware/checkAdminOrOwner.js";
import verifyUser from "../middleware/verifyUser.js";

const orderRouter = Router()

orderRouter.get('/orders', verifyUser, checkAdminOrOwner, getAllOrders)
orderRouter.get('/order/:id', verifyUser, checkAdminOrOwner, getOrderByID)
orderRouter.post('/order', createOrder)
orderRouter.post('/addItems/:id', addItemsInOrder) 
orderRouter.delete('/order/:id', verifyUser, checkAdminOrOwner, deleteOrderByID) 

export default orderRouter