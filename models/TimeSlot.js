import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

const TimeSlot = sequelize.define(
    'TimeSlot',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        date : {
            type: DataTypes.DATE,
            allowNull: false
        },
        time : {
            type: DataTypes.TIME,
            allowNull: false

        }
    }
)


// await TimeSlot.sync({ force: true });

export default sequelize.models.TimeSlot


