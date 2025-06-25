import TimeSlot from "../models/TimeSlot.js";

export const getAllTimeSlots = async (req, res) => {
    try {
        //We search all created slots and return them
        const slots = await TimeSlot.findAll();
        if (!slots) return res.status(404).json("Reservation not found");
        return res.status(200).json(slots);
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    }
    };

export const createTimeSlot = async (req, res) => {
    const { date, time } = req.body;
    try {
        const slot = await TimeSlot.findOne({
        where: {
            date,
            time,
        },
        });
        if (slot) return res.status(404).json("the time slot already exist");
        const newSlot = await TimeSlot.create({
        date,
        time,
        });
        return res
        .status(201)
        .json({ message: "time slot has been created", newSlot });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    }
};

export const deleteSlotByID = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteSlot = await TimeSlot.destroy({
        where: {
            id,
        },
        });
        if (!deleteSlot) return res.status(404).json("Slot not found");
        return res.status(200).json("Slot has been deleted");
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    }
};

export const updateSlotByID = async (req, res) => {
    const { id } = req.params;
    const { date, time } = req.body;
    try {
        const slot = await TimeSlot.findOne({
        where: {
            id,
        },
        });
        if (!slot) return res.status(404).json(" Slot not found");

        const updatedSlot = await slot.update({
        date: date || slot.date,
        time: time || slot.time,
        });
        const saveSlot = await slot.save();

        return res.status(202).json(saveSlot);
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    }
};
