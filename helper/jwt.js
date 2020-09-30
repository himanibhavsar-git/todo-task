const jwt = require("jsonwebtoken");

jwt.getAuthToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET);
}

/*
 * decodeAuthToken
 */
jwt.decodeAuthToken = (token) => {
    if (token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return false;
        }
    }
    return false;
}

module.exports = jwt;