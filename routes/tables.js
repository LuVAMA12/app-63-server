import { Router } from "express";
import { createTable, deleteTableByID, getAllTables, updateTableByID } from "../controllers/tableController.js";
import verifyUser from "../middleware/verifyUser.js";
import { checkAdminOrOwner } from "../middleware/checkAutorizations.js";

const tableRouter = Router()

tableRouter.get('/tables', getAllTables)
tableRouter.post('/table',verifyUser, checkAdminOrOwner, createTable)
tableRouter.delete('/table/:id',verifyUser, checkAdminOrOwner, deleteTableByID)
tableRouter.put('/table/:id',verifyUser, checkAdminOrOwner,updateTableByID)
export default tableRouter
