const User = require('../models/user');
const Order = require('../models/order');
const Partner = require('../models/partner');
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'bankingapp.ba5@gmail.com',
        pass: process.env.EMAIL_PASS
    }
});

exports.createOrder = async (req, res) => {
    const orderData = req.body;
    try {
        const user = await User.findById(req.body.userId)
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const newOrder = new Order(orderData);

        if (newOrder.isOrderIDVerified && newOrder.paymentStatus) {
            await Partner.updateOne({ _id: newOrder.partnerId }, { $inc: { ordersPlaced: 1 } });
        }

        await newOrder.save();

        const emailHTML = `
            <div style="padding: 8px; background-color: lightgreen; border-radius: 5px;">
                <h1 style="color: blue;">Order Confirmation</h1>
                <p style="color: blue;">Thank you for your order with HungerHalt. Your order ID is: ${req.body.uniqueOrderId}</p>
                <p>This is an automated email, please do not reply.</p>
            </div>
        `;

        let mailOptions = {
            from: 'bankingapp.ba5@gmail.com',
            to: user.email,
            subject: 'Order Confirmation',
            html: emailHTML
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            res.status(201).json({ message: 'Email sent successfully!' });
        });

        res.status(201).json({ message: "Order placed successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        if (!orders) {
            return res.status(404).json({ message: 'No orders found!' })
        }

        res.status(200).json({ message: 'Orders Data', orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrdersByPartner = async (req, res) => {
    const { partnerId } = req.params;
    try {
        const partner = await Partner.findById(partnerId)
            .populate({
                path: 'userId',
                model: 'User',
                select: 'name'
            });
        if (!partner) {
            return res.status(404).json({ message: 'Partner not found!' })
        }

        const orders = await Order.find({ partnerId: { $in: partnerId } })
            .populate({
                path: 'userId',
                model: 'User',
                select: 'name'
            }).sort({ createdAt: -1 })

        if (!orders) {
            return res.status(404).json({ message: 'No orders found!' })
        }

        return res.status(201).json({ message: 'Orders Data', orders, partner });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateOrder = async (req, res) => {
    const orderId = req.params.orderId;
    const partnerId = req.body.partnerId;
    try {
        const order = await Order.findOne({ uniqueOrderId: orderId });
        if (!order) {
            return res.status(404).json({ message: "Order not found!" });
        }

        order.isOrderIDVerified = true;
        order.paymentStatus = true;

        await Partner.updateOne({ _id: partnerId }, { $inc: { ordersPlaced: 1 } });

        const updatedOrder = await order.save();

        return res.status(200).json({ message: "Order updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};