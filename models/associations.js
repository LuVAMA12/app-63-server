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
    await TimeSlot.hasMany(Reservation, {foreignKey: 'timeSlotId'})
    await Reservation.belongsTo(TimeSlot, {foreignKey: 'timeSlotId'})
    await Table.hasMany(Reservation, {foreignKey: 'tableId'})
    await Reservation.belongsTo(Table, {foreignKey: 'tableId'})
}

// await sequelize.sync({ alter: true });
