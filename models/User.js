import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

// we define the columns that will make up our User model
const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: false
        },

    }
) 

export default sequelize.models.User