import Item from "../models/Item.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import User from "../models/User.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName", "email", "phone"],
        },
        {
          model: Item,
          through: { attributes: ["quantity"] },
        },
      ],
      order: [["createdAt", "DESC"], [Item, OrderItem, "quantity", "DESC"]],
    });
    if (!orders) return res.status(404).json("Order not found");
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const getOrderByID = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName", "email", "phone"],
        },
        {
          model: Item,
          through: { attributes: ["quantity"] },
        },
      ],
    });
    if (!order) return res.status(404).json("Order not found");
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const createOrder = async (req, res) => {
  const { firstName, lastName, email, phone, items } = req.body;
  try {
    // we verify items
    if (!items || items.length === 0) {
      return res.status(404).json("No items found");
    }

    // we found or create user
    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({ firstName, lastName, email, phone });
    }

    //we create the order
    const newOrder = await Order.create({ userId: user.id });
    if (!newOrder) {
      return res.status(400).json("Order cannot be created");
    }

    if (items && items.length > 0) {
      await addItemsToOrder(newOrder, items);
    }
    // we return the updated order with items and quantities
    const orderWithItems = await Order.findByPk(newOrder.id, {
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName", "email", "phone"],
        },
        {
          model: Item,
          through: {
            attributes: ["quantity"],
          },
        },
      ],
    });

    return res
      .status(201)
      .json({ message: "Order has been created", order: orderWithItems });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const updateOrderById = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phone, items } = req.body;

  try {
    const order = await Order.findByPk(id, {
      include: [User, Item],
    });
    if (!order) return res.status(404).json({ message: "Order not found" });

    const user = await User.findByPk(order.userId);
    if (user) {
       await user.update({
        firstName: firstName ?? user.firstName,
        lastName: lastName ?? user.lastName,
        email: email ?? user.email,
        phone: phone ?? user.phone,
      });
    }

    if (Array.isArray(items) && items.length > 0) {
      await order.setItems([]);
      await addItemsToOrder(order, items);
    }

     const updatedOrder = await Order.findByPk(id, {
      include: [
        {
          model: Item,
          through: { attributes: ["quantity"] },
        },
        {
          model: User,
          attributes: ["firstName", "lastName", "email", "phone"],
        },
      ],
    });

    return res
      .status(200)
      .json({ message: "Order has been updated", updatedOrder });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const deleteOrderByID = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteOrder = await Order.destroy({
      where: {
        id,
      },
    });
    if (!deleteOrder) return res.status(404).json("Order not found");
    return res.status(200).json("Order has been deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const addItemsToOrder = async (order, items) => {
  if (!order || !Array.isArray(items)) return;

  // we count quantities of each item
  const itemQuantities = items.reduce((acc, itemId) => {
    acc[itemId] = (acc[itemId] || 0) + 1;
    return acc;
  }, {});

  // we add items in order with quantities
  await Promise.all(
    Object.entries(itemQuantities).map(([itemId, quantity]) =>
      order.addItem(itemId, { through: { quantity } })
    )
  );
};
