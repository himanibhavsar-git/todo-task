const auth = {};
const jwt = require('./jwt');
const User = require('../modules/v1/user/userModel');
const mongoose = require('mongoose');

auth.validateUser = async (req, res, next) => {
    try {
        const token = (req.headers && req.headers.authorization);
        const id = jwt.decodeAuthToken(token.toString());
        const userId = mongoose.Types.ObjectId(id.userId);
        const result = await User.findById({
            _id: userId,
        });

        if (result && result.id) {
            req.__locals = result;
            next();
        } else {
            return res.status(401).json({
                err: "NOT_AUTHORIZED",
            });
        }

    } catch (error) {

    }
};


module.exports = auth;