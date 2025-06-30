import Item from "../models/Item.js";

export const getAllItems = async (req, res) => {
    try {
        //We search all created items and return them
        const items = await Item.findAll();
        if (!items) return res.status(404).json("Items not found");

        return res.status(200).json(items);
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    }
};

export const getItemByID = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Item.findOne({
        where: {
            id,
        },
        });
        if (!item) return res.status(404).json("Item not found ");
        return res.status(200).json(item);
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    }
};

export const createItem = async (req, res) => {
    // We get the form data in the req.body
    const { title, description, price, category } = req.body;
    try {
        // We create a new Item with the form data
        const newItem = await Item.create({
        title,
        description,
        image: req.file
            ? "public/images/" + req.file.filename
            : "public/images/default-image.png",
        price,
        category,
        });
        if (!newItem) {
        return res.status(404).json("Item cannot be created");
        }
        //We return the confirmation and the new created item
        return res
        .status(201)
        .json({ message: "Item has been created", createItem });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    }
};

export const deleteItemByID = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteItem = await Item.destroy({
        where: {
            id,
        },
        });
        if (!deleteItem) return res.status(404).json("Item not found");
        return res.status(200).json("Item has been deleted");
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    }
};

export const updateItemByID = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, category, quantity } = req.body;
    try {
        const item = await Item.findOne({
        where: {
            id,
        },
        attributes: { exclude: ["password", "forgotten_password"] },
        });
        if (!item) return res.status(404).json(" Item not found");

        const updatedItem = await item.update({
        title: title || item.title,
        description: description || item.description,
        price: price || item.price,
        category: category || item.category,
        quantity: quantity || item.quantity,
        image: req.file ? "public/images/" + req.file.filename : item.image,
        });
        const saveItem = await item.save();

        return res.status(202).json(saveItem);
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    }
};
