import 'dotenv/config';
import { Sequelize } from "sequelize";

const DATABASE = process.env.DATABASE;
const HOST = process.env.HOST;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;


export const sequelize = new Sequelize( DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: 'mysql',
    // logging: false,
}) 
 
const connectDB = async () => {
    

    try {
        await sequelize.authenticate()
        console.log(`✅ Sequelize connected successfully `)
    } catch (error) {
        console.error(`❌ Sequelize connection failed : ${error}`)
        process.exit(1) 
    }

}

export default connectDB 