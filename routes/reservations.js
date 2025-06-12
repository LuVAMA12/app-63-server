import { Router } from "express";
import { createReservation, deleteReservationByID, getAllReservations, updateReservationByID } from "../controllers/reservationController.js";
import checkAdminOrOwner from "../middleware/checkAdminOrOwner.js";
import verifyUser from "../middleware/verifyUser.js";

const reservationRouter = Router()

reservationRouter.get('/reservations', verifyUser, checkAdminOrOwner, getAllReservations)
reservationRouter.post('/addReservation',verifyUser, checkAdminOrOwner, createReservation)
reservationRouter.delete('/reservation/:id',verifyUser, checkAdminOrOwner, deleteReservationByID)
reservationRouter.put('/reservation/:id',verifyUser, checkAdminOrOwner,updateReservationByID)

export default reservationRouter