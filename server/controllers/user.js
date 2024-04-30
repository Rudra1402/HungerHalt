const User = require('../models/user');
const Partner = require('../models/partner');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = "patrickjane"

exports.createUser = async (req, res) => {
    const { address, name, email, password, isPartner, bannerImage, logo, socials, tags, description } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            email: email,
            address: address,
            password: hashedPassword,
            isPartner: isPartner || false
        });
        await newUser.save();
        let partnerId = null;
        if (isPartner) {
            const partnerType = req.body.partnerType;

            if (!['s', 'r', 'd'].includes(partnerType)) {
                return res.status(400).json({ message: 'Invalid partner type!' });
            }

            const newPartner = new Partner({
                bannerImage: bannerImage || null,
                logo: logo || null,
                socials: socials || [],
                partnerType: partnerType,
                tags: tags || [],
                description: description || null,
                userId: newUser._id
            });
            await newPartner.save();

            newUser.isPartner = true;
            await newUser.save();
            partnerId = newPartner._id
        }

        res.status(201).json({ ...newUser, partnerId });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "Username or Password is incorrect!" });
        }

        const checkPass = await bcrypt.compare(password, user.password);
        if (!checkPass) {
            return res.status(401).json({ message: "Username or Password is incorrect!" });
        }

        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

        let partner = null;
        if (user.isPartner) {
            partner = await Partner.findOne({ userId: user._id })
        }

        let loggedInUser = {
            id: user?._id,
            partnerId: user.isPartner ? partner._id : null,
            token: token,
            name: user?.name,
            email: user?.email,
            isPartner: user?.isPartner,
            active: user?.active
        }

        res.status(200).json({ message: 'Login successful', user: loggedInUser });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, message: 'Users Data', data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedUser) {
            return res.status(400).json({ success: false, message: 'Error while updating!' });
        }

        res.status(200).json({ success: true, message: 'User Updated Successfully!', data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};