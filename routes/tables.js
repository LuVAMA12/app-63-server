import { Router } from "express";
import { createTable, deleteTableByID, getAllTables, updateTableByID } from "../controllers/tableController.js";
import { checkAdminOrOwner } from "../middleware/checkAutorizations.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const tableRouter = Router()

tableRouter.get('/tables', getAllTables)
tableRouter.post('/table',verifyAdmin, checkAdminOrOwner, createTable)
tableRouter.delete('/table/:id',verifyAdmin, checkAdminOrOwner, deleteTableByID)
tableRouter.put('/table/:id',verifyAdmin, checkAdminOrOwner,updateTableByID)
export default tableRouter
