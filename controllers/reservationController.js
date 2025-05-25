import Reservation from "../models/Reservation.js"
import User from "../models/User.js"


export const getAllReservations = async (req, res) => {
   try {
         const reservations = await Reservation.findAll()
         if(reservations.length < 1) return res.status(404).json('No Reservation found yet')
         return res.status(200).json(reservations)
     } catch (error) {
         console.log(error)
         return res.status(500).json('Internal server error')
     }
}

export const createReservation =  async (req, res) => {
    const {firstName, lastName, email, phone, timeSlotId, tableId } = req.body
    try { 
         let user = await User.findOne({
                    where: {
                        email
                    }
                })

        if(user) {
             user = user.id
        } else {
            const newUser = await User.create({
                firstName,
                lastName,
                email,
                phone
            })
            if(!newUser) {
                return res.status(400).json('User cannot be created')
            }
             user = newUser.id
        }
        console.log(user)
        const reservation = await Reservation.findOne({
                where: {
                        timeSlotId, 
                        tableId
                    }
                })
                if(reservation) return res.status(404).json('reservation already taken')
        let newReservation = await Reservation.create({
           userId: user, 
           timeSlotId, 
           tableId
        })
        if(!newReservation) {
            return res.status(404).json('Reservation cannot be created')
        }
        newReservation = newReservation.id
        console.log(newReservation)
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
   const {userId, timeSlotId, tableId }= req.body
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
        tableId: tableId || reservation.tableId
      })
      const saveReservation = await Reservation.save()
      
      return res.status(202).json(saveReservation)
   } catch (error) {
      console.log(error)
      return res.status(500).json('Internal server error')
   }
 }
