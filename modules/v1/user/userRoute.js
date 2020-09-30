const express = require('express');
const userCtr = require('./userController');
const userMiddleware = require('./userMiddleware');
const userRouter = express.Router();
const signupMiddleware = [
    userMiddleware.checkEmailExist,
    userCtr.signUp,
];
userRouter.post('/signup', signupMiddleware);

// User Login
const loginMiddleware = [
    userMiddleware.authenticate,
    userCtr.login,
];
userRouter.post('/authenticate', loginMiddleware);

module.exports = userRouter;