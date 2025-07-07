import { Router } from "express";
import { createTimeSlot, deleteSlotByID, getAllTimeSlots, getAvailablesTimeSlots, updateSlotByID } from "../controllers/timeSlotController.js";
import { checkAdminOrOwner } from "../middleware/checkAutorizations.js";
import verifyAdmin from "../middleware/verifyAdmin.js";
import { requireAtLeastOneField, validateFields } from "../middleware/verifyFields.js";

const timeSlotRouter = Router()

timeSlotRouter.get("/slots", getAllTimeSlots)
timeSlotRouter.post("/availablesSlots", validateFields(["date"]) ,getAvailablesTimeSlots)
timeSlotRouter.post("/addSlot", verifyAdmin, checkAdminOrOwner, validateFields(["startTime", "endTime"]) ,createTimeSlot)
timeSlotRouter.delete("/slots/:id",verifyAdmin, checkAdminOrOwner, deleteSlotByID )
timeSlotRouter.patch("/slots/:id",verifyAdmin, checkAdminOrOwner, requireAtLeastOneField(["startTime", "endTime"]), updateSlotByID)
export default timeSlotRouter