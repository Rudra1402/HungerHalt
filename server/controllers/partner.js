const mongoose = require('mongoose');
const Partner = require('../models/partner');

exports.getPartners = async (req, res) => {
    try {
        const partners = await Partner.find()
            .populate({
                path: "userId",
                model: "User",
                select: "name email address"
            });
        res.status(200).json({ message: "All Partners Data", partners });
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};

exports.getPartnerById = async (req, res) => {
    const partnerId = req.params.id;
    try {
        const partner = await Partner.findById(partnerId)
            .populate({
                path: "userId",
                model: "User",
                select: "name email address"
            });
        if (!partner) {
            return res.status(404).json({ message: 'Partner not found' });
        }
        res.status(200).json({ message: "Partner Data", partner });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPartnersByType = async (req, res) => {
    const partnerType = req.params.type;
    try {
        const validPartnerTypes = ['s', 'r', 'd'];
        if (!validPartnerTypes.includes(partnerType)) {
            return res.status(401).json({ message: 'Invalid Partner Type!' });
        }

        const partners = await Partner.find({ partnerType })
            .populate({
                path: "userId",
                model: "User",
                select: "name email address"
            });

        if (!partners || partners.length === 0) {
            return res.status(404).json({ message: 'Partners not found' });
        }

        res.status(200).json({ message: "Partners Data, Type: " + partnerType, partners });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePartner = async (req, res) => {
    const partnerId = req.params.partnerId;
    const updates = req.body;
    try {
        const updatedPartner = await Partner.findByIdAndUpdate(partnerId, updates, { new: true });
        res.status(200).json({ message: "Partner Updated Successfully!", updatedPartner });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};