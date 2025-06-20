import { DataTypes } from "sequelize"
import { sequelize } from "../database/db.js"

 const Admin = sequelize.define(
    'Admin', 
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
        password: {
            type: DataTypes.STRING,
        },
        role: {
          type: DataTypes.ENUM,
          values:['admin','owner'],
          defaultValue: 'admin', 
          allowNull: false
        },
        forgotten_password: {
            type: DataTypes.BOOLEAN
        }
    }
 )

export default sequelize.models.Admin