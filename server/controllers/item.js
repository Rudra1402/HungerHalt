const Item = require('../models/item');
const Partner = require('../models/partner');

exports.createItems = async (req, res) => {
    const itemData = req.body;
    const { partnerId, quantity } = req.body;
    try {
        const newItem = new Item(itemData);

        const updPartner = await Partner.findByIdAndUpdate(partnerId, { $inc: { netItemsCount: quantity } });

        if (!updPartner) {
            return res.status(400).json({ message: "Error while updating partner items!" })
        }

        await newItem.save();
        res.status(201).json({ message: "Item Created!", newItem });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getItems = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        let items = [];
        if (itemId) {
            items = await Item.findById(itemId);

            if (!items) {
                return res.status(404).json({ message: 'Item not found!' });
            }

            return res.status(200).json({ message: 'Item found', item: items });

        } else {
            items = await Item.find({});
            return res.status(200).json({ message: 'All items data', items: items });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getItemsByPartnerId = async (req, res) => {
    const partnerId = req.params.partnerId;
    try {
        const partner = await Partner.findById(partnerId);
        if (!partner) {
            return res.status(404).json({ message: 'Partner not found!' });
        }

        const items = await Item.find({ partnerId: partnerId });
        res.status(200).json({ success: true, message: "Items data", items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateItem = async (req, res) => {
    const { quantity, price, title, description, imageUrl, postId, partnerId } = req.body;
    const { itemId } = req.params;
    try {
        const partner = await Partner.findById(partnerId);
        if (!partner) {
            return res.status(404).json({ message: 'Partner not found!' });
        }

        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ error: "Item not found!" });
        }

        let quantityDifference = 0;
        if (quantity !== undefined) {
            const oldQuantity = item.quantity;
            quantityDifference = quantity - oldQuantity;
            item.quantity = quantity;
        }
        if (price !== undefined) {
            item.price = price;
        }
        if (title !== undefined) {
            item.title = title;
        }
        if (description !== undefined) {
            item.description = description;
        }
        if (postId !== undefined) {
            item.postId = postId;
        }
        if (imageUrl) {
            item.images.push(imageUrl);
        }

        if (quantityDifference) {
            var pID = item.partnerId
            const updPartner = await Partner.findByIdAndUpdate(pID, { $inc: { netItemsCount: quantityDifference } });
            if (!updPartner) {
                return res.status(404).json({ message: 'Error updating partner!' })
            }
        }
        await item.save();

        return res.status(200).json({
            message: "Item updated successfully!",
            quantityDifference: quantityDifference,
            partnerId: pID
        });
    } catch (error) {
        res.status(500).json({ error: "Error: " + error });
    }
};

exports.deleteItem = async (req, res) => {
    const { itemId } = req.params;
    try {
        let item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found!' });
        }

        const deletedItem = await Item.deleteOne({ _id: itemId });
        if (!deletedItem) {
            return res.status(400).json({ message: 'Failed to delete item!' });
        }

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};