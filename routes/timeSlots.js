import { Router } from "express";
import { getAllTimeSlots } from "../controllers/timeSlotController.js";

const timeSlotRouter = Router()

timeSlotRouter.get('slots', getAllTimeSlots)

export default timeSlotRouter