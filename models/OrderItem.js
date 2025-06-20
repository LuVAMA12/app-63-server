import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

const OrderItem = sequelize.define(
    'OrderItem',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        OrderId: {
            type: DataTypes.UUID,
            references: {
                model: 'Orders',
                key: 'id'
            }
        },
        ItemId: {
            type: DataTypes.UUID,
            references: {
                model: 'Items',
                key: 'id'
            }
        }
        
    },
)
 

export default sequelize.models.OrderItem

