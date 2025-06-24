import { Router } from "express";
import { createReservation, deleteReservationByID, getAllReservations, getReservationByID, updateReservationByID } from "../controllers/reservationController.js";
import { checkAdminOrOwner } from "../middleware/checkAutorizations.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const reservationRouter = Router()

reservationRouter.get('/reservations', verifyAdmin, checkAdminOrOwner, getAllReservations)
reservationRouter.get('/reservation/:id',verifyAdmin, checkAdminOrOwner, getReservationByID)
reservationRouter.post('/addReservation', createReservation)
reservationRouter.delete('/reservation/:id',verifyAdmin, checkAdminOrOwner, deleteReservationByID)
reservationRouter.put('/reservation/:id',verifyAdmin, checkAdminOrOwner,updateReservationByID)

export default reservationRouter