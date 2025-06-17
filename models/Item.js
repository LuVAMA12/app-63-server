import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

const Item = sequelize.define(
    'Item',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title : {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }
)

// await Item.sync({ alter: true });
export default sequelize.models.Item


