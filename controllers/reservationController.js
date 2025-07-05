import Reservation from "../models/Reservation.js";
import Table from "../models/Table.js";
import TimeSlot from "../models/TimeSlot.js";
import User from "../models/User.js";
import { searchAvailableTable } from "./tableController.js";
import { createOrFindUser } from "./userController.js";

export const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll({
        include: [
            {
            model: User,
            attributes: ["firstName", "lastName", "email", "phone"],
            },
            {
            model: Table,
            attributes: ["numberTable", "location", "capacity"],
            },
            {
            model: TimeSlot,
            attributes: ["startTime", "endTime"],
            },
        ],
        order: [["createdAt", "DESC"]],
        });
        if (!reservations) return res.status(404).json("Reservation not found");
        return res.status(200).json(reservations);
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    }
};
export const getReservationByID = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await Reservation.findByPk(id, {
        include: [
            {
            model: User,
            attributes: ["firstName", "lastName", "email", "phone"],
            },
            {
            model: Table,
            attributes: ["numberTable", "location", "capacity"],
            },
            {
            model: TimeSlot,
            attributes: ["startTime", "endTime"],
            },
        ],
        });
        if (!reservation) return res.status(404).json("Reservation not found");
        return res.status(200).json(reservation);
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    }
};

export const createReservation = async (req, res) => {
    const { timeSlotId, numberOfPeople, date } = req.body;
    try {
        //get the user"s informations, search if it"s already exist, create a new if not, return user.id
        const userId = await createOrFindUser(req.body);
        //verify if user exist, otherwise he"s return a error message
        if (!userId) {
        return res.status(400).json("User cannot be created");
        }
        const tableId = await searchAvailableTable(req.body);

        if (!tableId) {
        return res.status(400).json("No table available");
        }

        const reservation = await Reservation.findOne({
        where: {
            timeSlotId,
            tableId,
        },
        });
        if (reservation) return res.status(404).json("reservation already taken");
        let newReservation = await Reservation.create({
        userId,
        timeSlotId,
        tableId,
        numberOfPeople,
        date,
        });
        if (!newReservation) {
        return res.status(404).json("Reservation cannot be created");
        }
        newReservation = newReservation.id;
        return res
        .status(201)
        .json({ message: "Reservation has been created", newReservation });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    }
};

export const deleteReservationByID = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteReservation = await Reservation.destroy({
        where: {
            id,
        },
        });
        if (!deleteReservation)
        return res.status(404).json("Reservation not found");
        return res.status(200).json("Reservation has been deleted");
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    }
};

export const updateReservationByID = async (req, res) => {
    const { id } = req.params;
    const {
        timeSlotId,
        tableId,
        numberOfPeople,
        firstName,
        lastName,
        email,
        phone,
    } = req.body;
    try {
        const reservation = await Reservation.findOne({
        where: {
            id,
        },
        include: [{ model: User }],
        });
        if (!reservation) return res.status(404).json(" Reservation not found");

        const reservationUpdate = await reservation.update({
        timeSlotId: timeSlotId ?? reservation.timeSlotId,
        tableId: tableId ?? reservation.tableId,
        numberOfPeople: numberOfPeople ?? reservation.numberOfPeople,
        });

        const user = reservation.User;
        if (user) {
        await user.update({
            firstName: firstName ?? user.firstName,
            lastName: lastName ?? user.lastName,
            email: email ?? user.email,
            phone: phone ?? user.phone,
        });
        }

        const updatedReservation = await Reservation.findOne({
        where: { id },
        include: [{ model: User }],
        });

        return res.status(202).json({ message: "Reservation has been updated"}, updatedReservation);
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    }
};
