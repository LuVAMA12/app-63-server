import 'dotenv/config'
import express from "express"
import connectDB from './database/db.js'
import { defineAssociation } from './models/associations.js'
import authRouter from './routes/auth.js'
import itemRouter from './routes/items.js'
import orderRouter from './routes/orders.js'
import tableRouter from './routes/tables.js'
import timeSlotRouter from './routes/timeSlots.js'
import userRouter from './routes/users.js'

const PORT = process.env.PORT || 4001

//We create a express server
const app = express()

// We make json and form data readable and accessible  
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//We turn the files in the public/images folder into static files
app.use('/images', express.static('public/images'))


// We define the routes that can use in this server
app.use('/api', userRouter, authRouter, itemRouter, orderRouter, tableRouter, timeSlotRouter)

// We connect the server to the db 
connectDB() 

defineAssociation()
// await sequelize.sync({ alter: true });

//  we start the server
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`)
})