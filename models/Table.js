import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

const Table = sequelize.define("Table", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    capacity: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
    },
    numberTable: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default sequelize.models.Table;
