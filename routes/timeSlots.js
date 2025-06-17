import { Router } from "express";
import { createTimeSlot, deleteSlotByID, getAllTimeSlots, updateSlotByID } from "../controllers/timeSlotController.js";
import verifyUser from "../middleware/verifyUser.js";
import { checkAdminOrOwner } from "../middleware/checkAutorizations.js";

const timeSlotRouter = Router()

timeSlotRouter.get('/slots', getAllTimeSlots)
timeSlotRouter.post('/addSlot', verifyUser, checkAdminOrOwner, createTimeSlot)
timeSlotRouter.delete('/slot/:id',verifyUser, checkAdminOrOwner, deleteSlotByID )
timeSlotRouter.put('/slot/:id',verifyUser, checkAdminOrOwner, updateSlotByID)
export default timeSlotRouter