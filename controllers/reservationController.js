import Reservation from "../models/Reservation.js"
import Table from "../models/Table.js"
import TimeSlot from "../models/TimeSlot.js"
import User from "../models/User.js"
import { searchAvailableTable } from "./tableController.js"
import { createOrFindUser } from "./userController.js"


export const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll({
            include : [{
                model: User,
                attributes: ['firstName','lastName','email','phone']
            },
            {
                model: Table,
                attributes: ['numberTable','location','capacity']
            },
            {
                model: TimeSlot,
                attributes: ['date','time']
            }],
            order: [['createdAt', 'DESC']],
            
        })
        if(reservations.length < 1) return res.status(404).json('No Reservation found yet')
            return res.status(200).json(reservations)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal server error')
    }
}
export const getReservationByID = async (req, res) => {
    const {id} = req.params
    try {
        const reservation = await Reservation.findByPk(id,{
             include : [{
                model: User,
                attributes: ['firstName','lastName','email','phone']
            },
            {
                model: Table,
                attributes: ['numberTable','location','capacity']
            },
            {
                model: TimeSlot,
                attributes: ['date','time']
            }],
        })
        if(!reservation) return res.status(404).json('Reservation not found')
        return res.status(200).json(reservation)  
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal server error')
    }
}

export const createReservation =  async (req, res) => {
    const {timeSlotId} = req.body;
    try { 
        //get the user's informations, search if it's already exist, create a new if not, return user.id
        const userId = await createOrFindUser(req.body)
        //verify if user exist, otherwise he's return a error message
        if (!userId) {
            return res.status(400).json("User cannot be created");
        }
        const tableId = await searchAvailableTable(req.body)
        
        if (!tableId) {
            return res.status(400).json("No table available");
        }
        
        const reservation = await Reservation.findOne({
            where: {
                timeSlotId, 
                tableId
            }
        })
        if(reservation) return res.status(404).json('reservation already taken')
            let newReservation = await Reservation.create({
            userId, 
            timeSlotId, 
            tableId,
            numberOfPeople
        })
        if(!newReservation) {
            return res.status(404).json('Reservation cannot be created')
        }
        newReservation = newReservation.id
        return  res.status(201).json({message: 'Reservation has been created', newReservation})
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal server error')
    }
}

export const deleteReservationByID = async (req, res) => {
    const {id} = req.params
    try {
        const deleteReservation = await Reservation.destroy({
            where: {
                id
            }
        })
        if(!deleteReservation) return res.status(404).json('Reservation not found')
            return res.status(200).json('Reservation has been deleted')
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal server error')
    }
}

export const updateReservationByID = async (req, res) => {
    const {id} = req.params
    const {userId, timeSlotId, tableId, numberOfPeople }= req.body
    try {
        
        const reservation = await Reservation.findOne({
            where : {
                id
            }
        })
        if(!reservation) return res.status(404).json(' Reservation not found')
            
        
        const updatedReservation = await reservation.update({
            userId: userId || reservation.userId,
            timeSlotId: timeSlotId || reservation.timeSlotId,
            tableId: tableId || reservation.tableId,
            numberOfPeople: numberOfPeople || reservation.numberOfPeople
        })
        const saveReservation = await Reservation.save()
        
        return res.status(202).json(saveReservation)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal server error')
    }
}
