import { Router } from "express";
import { getAllTimeSlots } from "../controllers/timeSlotController";

const timeSlotRouter = Router()

timeSlotRouter.get('slots', getAllTimeSlots)