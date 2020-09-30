const passwordHash = require("password-hash");
const User = require("./userModel");
const userCtr = {};
userCtr.signUp = async (req, res) => {
    // should add try catch or globally exception handler to handle unexpected DB error but skipping for now
    const {
        email,
        password,
        name,
        role,
    } = req.body;

    if (role !== "admin" && role !== "user") {
        return res.status(400).json({
            err: "Invalid Role",
        });
    } else {
        const userObj = new User({
            email,
            password: passwordHash.generate(password),
            name,
            role
        });
        // Should use service for function calls in DB but in urgency writing code here
        await userObj.save();
        return res.status(200).json({
            message: "Success!!",
        });
    }
};

userCtr.login = async (req, res) => {
    // should add try catch or globally exception handler to handle unexpected DB error but skipping for now
    if (req.__locals && req.__locals.id) {
        console.log(req.__locals.token)
        const obj = {
            email: req.__locals.email,
            role: req.__locals.role,
            token: req.__locals.token,
        }
        return res.status(200).json({
            message: "Login Success!!",
            data: obj
        });
    }
};

module.exports = userCtr;