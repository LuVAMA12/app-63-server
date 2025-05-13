import Item from "./Item.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import User from "./User.js";

export const defineAssociation = async () => {

    await User.hasMany(Order,{ foreignKey: 'UserId'})
    await Order.belongsTo(User,{ foreignKey: 'UserId'})

    await Item.belongsToMany(Order, { through: OrderItem, foreignKey: 'ItemId' });
    await Order.belongsToMany(Item, { through: OrderItem, foreignKey: 'OrderId' });
}

// await OrderItem.sync({ alter: true });
