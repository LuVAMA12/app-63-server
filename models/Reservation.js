import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

const Reservation = sequelize.define("Reservation", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        references: {
        model: "Users",
        key: "id",
        },
    },
    timeSlotId: {
        type: DataTypes.UUID,
        references: {
        model: "TimeSlots",
        key: "id",
        },
    },
    tableId: {
        type: DataTypes.UUID,
        references: {
        model: "Tables",
        key: "id",
        },
    },
    numberOfPeople: {
        type: DataTypes.TINYINT(2),
        allowNull: false,
    },
      date : {
            type: DataTypes.DATE,
            allowNull: false
        },
    status: {
        type: DataTypes.ENUM,
        values: ["reserved", "awaiting", "confirmed"],
        defaultValue: "reserved",
        allowNull: false,
    },
});

export default sequelize.models.Reservation;
