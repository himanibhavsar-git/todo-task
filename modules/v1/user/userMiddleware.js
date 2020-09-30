const User = require("./userModel");
const passwordHash = require("password-hash");
const userMiddleware = {};
const jwt = require('../../../helper/jwt');

userMiddleware.authenticate = async (req, res, next) => {
    // should add try catch or globally exception handler to handle unexpected DB error but skipping for now
    const {
        email,
        password
    } = req.body;
    const result = await User.findOne({
        email,
    });
    console.log(result)
    if (result) {
        const userPwd = result.password;
        console.log(passwordHash.verify(password, userPwd))

        if (passwordHash.verify(password, userPwd)) {
            result.token = jwt.getAuthToken({
                userId: result.id
            });
            console.log(result.token)
            req.__locals = result;
            next();
        } else {
            return res.status(400).json({
                err: "Invalid credentials",
            });
        }
    } else {
        return res.status(400).json({
            err: "Invalid credentials",
        });
    }
};

userMiddleware.checkEmailExist = async (req, res, next) => {
    // should add try catch or globally exception handler to handle unexpected DB error but skipping for now
    const {
        email,
    } = req.body;
    const result = await User.findOne({
        email,
    });

    if (result && result.email) {
        return res.status(400).json({
            err: "Email already exits",
        });
    } else {
        next();
    }
};
module.exports = userMiddleware;