import { Router } from "express";
import { createReservation, deleteReservationByID, getAllReservations, getReservationByID, updateReservationByID } from "../controllers/reservationController.js";
import { checkAdminOrOwner } from "../middleware/checkAutorizations.js";
import verifyAdmin from "../middleware/verifyAdmin.js";
import { requireAtLeastOneField, validateFields } from "../middleware/verifyFields.js";

const reservationRouter = Router()

reservationRouter.get("/reservations", verifyAdmin, checkAdminOrOwner, getAllReservations)
reservationRouter.get("/reservations/:id",verifyAdmin, checkAdminOrOwner, getReservationByID)
reservationRouter.post("/addReservation", validateFields(["timeSlotId", "numberOfPeople", "date"]), createReservation)
reservationRouter.delete("/reservations/:id",verifyAdmin, checkAdminOrOwner, deleteReservationByID)
reservationRouter.patch("/reservations/:id",verifyAdmin, checkAdminOrOwner, requireAtLeastOneField(["timeSlotId", "tableId", "numberOfPeople", "firstName",  "lastName", "email", "phone",]), updateReservationByID)

export default reservationRouter