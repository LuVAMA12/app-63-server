import { Router } from "express";
import { createTable, deleteTableByID, getAllTables, getAvailableCapacitiesByDate, getAvailablesLocations, updateTableByID } from "../controllers/tableController.js";
import { checkAdminOrOwner } from "../middleware/checkAutorizations.js";
import verifyAdmin from "../middleware/verifyAdmin.js";
import { requireAtLeastOneField, validateFields } from "../middleware/verifyFields.js";

const tableRouter = Router()

tableRouter.get("/tables", getAllTables)
tableRouter.post("/addTable",verifyAdmin, checkAdminOrOwner, validateFields(["capacity", "numberTable", "location"]), createTable)
tableRouter.post("/availablesLocations", validateFields(["date", "timeSlotId", "numberOfPeople"]),getAvailablesLocations)
tableRouter.post("/tables/capacities", validateFields(["date", "timeSlotId"]),getAvailableCapacitiesByDate)
tableRouter.delete("/tables/:id",verifyAdmin, checkAdminOrOwner, deleteTableByID)
tableRouter.patch("/tables/:id",verifyAdmin, checkAdminOrOwner,requireAtLeastOneField(["capacity", "numberTable", "location"]), updateTableByID)
export default tableRouter
