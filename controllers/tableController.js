import { Op } from "sequelize";
import Reservation from "../models/Reservation.js";
import Table from "../models/Table.js";

export const getAllTables = async (req, res) => {
  try {
    const tables = await Table.findAll();
    if (!tables) return res.status(404).json("Table not found");
    return res.status(200).json(tables);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const createTable = async (req, res) => {
  const { capacity, numberTable, location } = req.body;
  try {
    const newTable = await Table.create({
      capacity,
      numberTable,
      location,
    });
    if (!newTable) {
      return res.status(404).json("Table cannot be created");
    }
    return res
      .status(201)
      .json({ message: "Table has been created", newTable });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const deleteTableByID = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTable = await Table.destroy({
      where: {
        id,
      },
    });
    if (!deleteTable) return res.status(404).json("Table not found");
    return res.status(200).json("Table has been deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const updateTableByID = async (req, res) => {
  const { id } = req.params;
  const { capacity, numberTable, location } = req.body;
  try {
    const reservedTable = await Reservation({
      where: {
        tableId: id,
      },
    });
    if (!table) return res.status(404).json(" Table already reserved");

    const table = await Table.findOne({
      where: {
        id,
      },
    });
    if (!table) return res.status(404).json(" Table not found");

    const updatedTable = await table.update({
      capacity: capacity || table.capacity,
      numberTable: numberTable || table.numberTable,
      location: location || table.location,
    });
    const saveTable = await table.save();

    return res.status(202).json(saveTable);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const getAvailablesLocations = async (req, res) => {
    const { date, timeSlotId, numberOfPeople } = req.body;

    if (!date || !timeSlotId || !numberOfPeople) {
        return res
        .status(400)
        .json({ error: "date, timeSlotId and numberOfPeople are required" });
    }

    try {
        //we find the tables reserved for this date and time slot
        const reservedTables = await Reservation.findAll({
        attributes: ["tableId"],
        where: {
            date,
            timeSlotId,
        },
        raw: true,
        });

        const reservedTableIds = reservedTables.map((r) => r.tableId);

        // we compare the reserved with all tables and return the available ones
        const availableTables = await Table.findAll({
        attributes: ["location"],
        where: {
            id: {
            [Op.notIn]: reservedTableIds.length ? reservedTableIds : [0],
            },
            //we verify if the tables have capacities
            capacity: {
            [Op.gte]: numberOfPeople,
            },
        },
        order: [["location", "ASC"]],
        });
        const locations = availableTables.map((t) => t.location);

        return res.status(200).json(locations);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
};

export const searchAvailableTable = async ({ timeSlotId, location, numberOfPeople }) => {
    try {
        const reserved = await Reservation.findAll({
        where: {
            timeSlotId,
        },
        attributes: ["tableId"],
        });

        const reservedTableIds = reserved.map((table) => table.tableId);

        const availableTable = await Table.findOne({
        where: {
            location,
            capacity: {
            [Op.gte]: numberOfPeople,
            },
            id: {
            [Op.notIn]: reservedTableIds,
            },
        },
        order: [["capacity", "ASC"]],
        });
        if (!availableTable) {
        return null;
        }

        return availableTable.id;
    } catch (error) {
        console.log(error);
    }
};
