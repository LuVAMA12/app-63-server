import { Op } from "sequelize";
import { sequelize } from "../database/db.js";
import Reservation from "../models/Reservation.js";
import Table from "../models/Table.js";

export const getAllTables = async (req, res) => {
  try {
    const tables = await Table.findAll({
      order: [["createdAt", "DESC"]]});
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
    const reservedTable = await Reservation.findOne({
      where: {
        tableId: id,
      },
    });
    if (!reservedTable)
      return res
        .status(404)
        .json("Unauthorized change: Table already reserved");

    const table = await Table.findByPk(id);
    if (!table) return res.status(404).json(" Table not found");

    const updatedTable = await table.update({
      capacity: capacity ?? table.capacity,
      numberTable: numberTable ?? table.numberTable,
      location: location ?? table.location,
    });

    return res.status(202).json(updatedTable);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};
export const getMaxCapacityByDate = async (req, res) => {
  const { date, timeSlotId } = req.body;

  try {
    //we find the tables reserved for this date and time slot
    const reservedTables = await Reservation.findAll({
      attributes: ["tableId"],
      where: {
        //all conditions must be fulfilled
        [Op.and]: [
          // we compare the values
          sequelize.where(
            // we search in date "column" and transfom in DATE type
            sequelize.fn("DATE", sequelize.col("date")),
            date
          ),
        ],
        timeSlotId,
      },
      raw: true,
    });
    const reservedTableIds = reservedTables.map((r) => r.tableId);
    // we compare table with the reserved ones and return the availables ones
    const availableTables = await Table.findAll({
      where: {
        id: {
          [Op.notIn]: reservedTableIds.length ? reservedTableIds : [1],
        },
      },
      raw: true,
    });

    // we search the max capacity for this date and time slot
   const maxCapacity = Math.max(...availableTables.map(t => t.capacity));

    return res.status(200).json(maxCapacity);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
};

export const getAvailablesLocations = async (req, res) => {
  const { date, timeSlotId, numberOfPeople } = req.body;

  try {
    //we find the tables reserved for this date and time slot
    const reservedTables = await Reservation.findAll({
      attributes: ["tableId"],
      where: {
        [Op.and]: [
          sequelize.where(sequelize.fn("DATE", sequelize.col("date")), date),
        ],
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
          [Op.notIn]: reservedTableIds.length ? reservedTableIds : [1],
        },
        //we verify if the tables have capacities
        capacity: {
          [Op.gte]: numberOfPeople,
        },
      },
      group: [["location", "ASC"]],
    });
    const locations = availableTables.map((t) => t.location);

    return res.status(200).json(locations);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
};

export const searchAvailableTable = async ({
  timeSlotId,
  location,
  numberOfPeople,
  date,
}) => {
  try {
    const reserved = await Reservation.findAll({
      where: {
        [Op.and]: [
          sequelize.where(sequelize.fn("DATE", sequelize.col("date")), date),
        ],
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
