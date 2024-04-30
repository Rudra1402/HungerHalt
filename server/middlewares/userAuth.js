const User = require('../models/user');

const checkUserExists = async (req, res, next) => {
    try {
        const { userid } = req.headers;

        if (!userid) {
            return res.status(403).json({ message: 'User ID is required!' });
        }

        const user = await User.findById(userid);

        if (!user) {
            return res.status(404).json({ message: 'Access Denied!' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = checkUserExists;