import Item from "./Item.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import Reservation from "./Reservation.js";
import Table from "./Table.js";
import TimeSlot from "./TimeSlot.js";
import User from "./User.js";

export const defineAssociation = async () => {

    await User.hasMany(Order,{ foreignKey: 'userId'})
    await Order.belongsTo(User,{ foreignKey: 'userId'})

    await Item.belongsToMany(Order, { through: OrderItem, foreignKey: 'ItemId' });
    await Order.belongsToMany(Item, { through: OrderItem, foreignKey: 'OrderId' });

    await User.hasMany(Reservation,{ foreignKey: 'userId'})
    await Reservation.belongsTo(User,{ foreignKey: 'userId'})
    await TimeSlot.hasMany(Reservation, {target: 'timeSlotId'})
    await Reservation.belongsTo(TimeSlot, {target: 'timeSlotId'})
    await Table.hasMany(Reservation, {target: 'tableId'})
    await Reservation.belongsTo(Table, {target: 'tableId'})
}

// await sequelize.sync({ alter: true });
