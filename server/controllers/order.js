const Order = require('../models/order');
const Partner = require('../models/partner');

exports.createOrder = async (req, res) => {
    const orderData = req.body;
    try {
        const newOrder = new Order(orderData);

        if (newOrder.isOrderIDVerified && newOrder.paymentStatus) {
            await Partner.updateOne({ _id: newOrder.partnerId }, { $inc: { ordersPlaced: 1 } });
        }

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json({ message: 'Orders Data', orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrdersByPartner = async (req, res) => {
    const { partnerId } = req.params;
    try {
        const partner = await Partner.findById(partnerId);
        if (!partner) {
            return res.status(404).json({ message: 'Partner not found!' })
        }

        const orders = await Order.find({ partnerId: partnerId });
        return res.status(201).json({ message: 'Orders Data', orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateOrder = async (req, res) => {
    const orderId = req.params.orderId;
    const updates = req.body;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found!" });
        }

        if (order.isOrderIDVerified && order.paymentStatus) {
            await Partner.updateOne({ _id: order.partnerId }, { $inc: { ordersPlaced: 1 } });
        }

        for (const key in updates) {
            if (key !== 'postId') {
                order[key] = updates[key];
            }
        }

        if (updates.postId) {
            order.postId.push(updates.postId);
        }

        const updatedOrder = await order.save();

        return res.status(200).json({ message: "Order updated successfully!", updatedOrder });
    } catch (error) {
        res.status(500).json({ error: "Error: " + error.message });
    }
};