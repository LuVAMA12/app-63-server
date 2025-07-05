import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    status: {
        type: DataTypes.ENUM,
        values: ["pending", "ready", "collected"],
        defaultValue: "pending",
        allowNull: false,
    },
    orderNumber: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    userId: {
        type: DataTypes.UUID,
        references: {
        model: "Users",
        key: "id",
        },
    },
});

export default sequelize.models.Order;
