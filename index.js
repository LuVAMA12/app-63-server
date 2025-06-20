import 'dotenv/config'
import express from "express"
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import connectDB from './database/db.js'
import { defineAssociation } from './models/associations.js'
import authRouter from './routes/auth.js'
import itemRouter from './routes/items.js'
import orderRouter from './routes/orders.js'
import reservationRouter from './routes/reservations.js'
import tableRouter from './routes/tables.js'
import timeSlotRouter from './routes/timeSlots.js'
import userRouter from './routes/users.js'
import adminRouter from './routes/admins.js'
import cors from 'cors'
const PORT = process.env.PORT || 4001

//We create a express server
const app = express()

app.get('/', (req, res) => {
  res.send('🚀 API is running');
});

// We make json and form data readable and accessible  
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
// get the path of current file
const __dirname = dirname(fileURLToPath(import.meta.url));

//We turn the files in the public/images folder into static files
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use('/pdfs', express.static(path.join(__dirname, 'public', 'pdfs')));



// We define the routes that can use in this server
app.use('/api', userRouter, itemRouter, orderRouter, tableRouter, timeSlotRouter, reservationRouter)
app.use('/admin', authRouter, adminRouter)
// We connect the server to the db 
connectDB() 

defineAssociation()

//  we start the server
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`)
})