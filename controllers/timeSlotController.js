import { Op } from "sequelize";
import { sequelize } from "../database/db.js";
import Reservation from "../models/Reservation.js";
import Table from "../models/Table.js";
import TimeSlot from "../models/TimeSlot.js";

export const getAllTimeSlots = async (req, res) => {
  try {
    //We search all created slots and return them
    const slots = await TimeSlot.findAll();
    if (!slots) return res.status(404).json("Reservation not found");
    return res.status(200).json(slots);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const createTimeSlot = async (req, res) => {
  const { startTime, endTime } = req.body;
  try {
    const slot = await TimeSlot.findOne({
      where: {
        startTime,
        endTime,
      },
    });
    if (slot) return res.status(404).json("the time slot already exist");
    const newSlot = await TimeSlot.create({
      startTime,
      endTime,
    });
    return res
      .status(201)
      .json({ message: "time slot has been created", newSlot });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const deleteSlotByID = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteSlot = await TimeSlot.destroy({
      where: {
        id,
      },
    });
    if (!deleteSlot) return res.status(404).json("Slot not found");
    return res.status(200).json("Slot has been deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};
export const updateSlotByID = async (req, res) => {
  const { id } = req.params;
  const { startTime, endTime } = req.body;

  try {
    const slot = await TimeSlot.findByPk(id);
    if (!slot) return res.status(404).json("Slot not found");

    const updatedSlot = await slot.update({
      startTime: startTime ?? slot.startTime,
      endTime: endTime ?? slot.endTime,
    });

    return res.status(202).json(updatedSlot);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
};

export const getAvailablesTimeSlots = async (req, res) => {
  const { date } = req.body;

  try {
    
    //we count number of tables
    const totalTables = await Table.count();

    //we want reserved time slots
    const fullyReservedSlotIds = await Reservation.findAll({
        // We compare the count of table with count of timeslots on a defined date. 
        attributes: ["timeSlotId"],
        where: { date },
        group: ["timeSlotId"],
        having: sequelize.literal(`COUNT(tableId) = ${totalTables}`),
        raw: true,
        // If the numbers are differents, sequelize return the time slot id.
    });

    const reservedSlotIds = fullyReservedSlotIds.map((reservedSlot) => reservedSlot.timeSlotId);

    const availableSlots = await TimeSlot.findAll({
      where: {
        id: {
          [Op.notIn]: reservedSlotIds,
        }
      },
      order: [["startTime", "ASC"]],
    });
    if (availableSlots.length === 0) return res.status(200).json([]);
    return res.status(200).json(availableSlots);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};
