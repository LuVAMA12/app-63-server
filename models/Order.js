import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

const Order = sequelize.define(
    'Order',
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
        }
    }
)



// await Order.sync({alter: true});
export default sequelize.models.Order


