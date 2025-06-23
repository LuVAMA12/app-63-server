import { Router } from "express";
import { createTimeSlot, deleteSlotByID, getAllTimeSlots, updateSlotByID } from "../controllers/timeSlotController.js";
import { checkAdminOrOwner } from "../middleware/checkAutorizations.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const timeSlotRouter = Router()

timeSlotRouter.get('/slots', getAllTimeSlots)
timeSlotRouter.post('/addSlot', verifyAdmin, checkAdminOrOwner, createTimeSlot)
timeSlotRouter.delete('/slot/:id',verifyAdmin, checkAdminOrOwner, deleteSlotByID )
timeSlotRouter.put('/slot/:id',verifyAdmin, checkAdminOrOwner, updateSlotByID)
export default timeSlotRouter