import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

const TimeSlot = sequelize.define("TimeSlot", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    startTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
});

export default sequelize.models.TimeSlot;
