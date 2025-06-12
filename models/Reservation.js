import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

const Reservation = sequelize.define(
    'Reservation',
    {
         id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        timeSlotId: {
            type: DataTypes.UUID,
            references: {
                model: 'TimeSlots',
                key: 'id'
            }
        },
        tableId: {
            type: DataTypes.UUID,
            references: {
                model: 'Tables',
                key: 'id'
            }
        },
        status: {
            type: DataTypes.ENUM,
            values:['reserved','awaiting','confirmed'],
            defaultValue: 'reserved', 
            allowNull: false
        },
   } 
)

// await Reservation.sync({alter: true});
export default sequelize.models.Reservation
