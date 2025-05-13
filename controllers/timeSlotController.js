import TimeSlot from "../models/TimeSlot.js"

export const getAllTimeSlots = async(req, res) => {
     try {
            //We search all created slots and return them
            const slots = await TimeSlot.findAll()
            if(slots.length < 1) return res.status(404).json('No slots found yet')
            return res.status(200).json(slots)
        } catch (error) {
            console.log(error)
            return res.status(500).json('Internal server error')
        }
}