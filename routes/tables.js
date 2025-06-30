import { Router } from "express";
import { createTable, deleteTableByID, getAllTables, getAvailablesLocations, updateTableByID } from "../controllers/tableController.js";
import { checkAdminOrOwner } from "../middleware/checkAutorizations.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const tableRouter = Router()

tableRouter.get('/tables', getAllTables)
tableRouter.post('/availableLocation',getAvailablesLocations)
tableRouter.post('/table',verifyAdmin, checkAdminOrOwner, createTable)
tableRouter.delete('/table/:id',verifyAdmin, checkAdminOrOwner, deleteTableByID)
tableRouter.put('/table/:id',verifyAdmin, checkAdminOrOwner,updateTableByID)
export default tableRouter
