import Item from "../models/Item.js"
import Order from "../models/Order.js"
import OrderItem from "../models/OrderItem.js"
import User from "../models/User.js"

export const getAllOrders = async (req, res) => {
    try {
        const orders =  await Order.findAll({
            include : [{
                model: Item,
                through: { attributes: ['quantity']}
            }]  
        })
        if(orders.length < 1) return res.status(404).json('No orders found yet')
        return res.status(200).json(orders)

        
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal server error')
    }
}

export const getOrderByID = async (req, res) => {
    const {id} = req.params
    try {
        const order = await Order.findOne({
            where: {
                id
            },
            include : [{
                model: Item,
                through: { attributes: ['quantity']}
            }] 
        })
        if(!order) return res.status(404).json('Order not found')
        return res.status(200).json(order)

        
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal server error')
    }
}

export const createOrder = async (req, res) => {
    const {firstName, lastName, email, phone} = req.body
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
        const newOrder = await Order.create({ UserId: user });
            if(!newOrder) {
                return res.status(400).json('Order cannot be created')
            }
            return  res.status(201).json(newOrder)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal server error')
    }
} 

export const addItemsInOrder = async (req, res) => {
    const {id} = req.params
    const {items} = req.body
    try {
        const order = await Order.findByPk(id, {
            include : [{
                model: Item,
                through: { attributes: []}
            }]  
        })

        if(!order) return res.status(404).json('Order not found')

        const itemQuantites = items.reduce((acc, itemId) => {
            acc[itemId] = (acc[itemId] || 0) + 1;
            return acc;
        }, {});
        
        console.log(itemQuantites);  
        
        const addItems = Object.entries(itemQuantites).map(async ([itemId, quantity]) => {
        const existingItem = await OrderItem.findOne({
            where: {
                OrderId: id,
                ItemId: itemId
            }
        });

        if (existingItem) {
            await existingItem.increment('quantity', { by: quantity });
        } else {
            await order.addItem(itemId)
        }
    });

    await Promise.all(addItems);
        
        return res.status(200).json({message : 'Items have been added to the order'})
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal server error')
    }
}

export const deleteOrderByID = async (req, res) => {
    const {id} = req.params
    try {
        const deleteOrder = await Order.destroy({
            where: {
                id
            }
        })
        if(!deleteOrder) return res.status(404).json('Order not found')
            return res.status(200).json('Order has been deleted')

    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal server error')
    }
}