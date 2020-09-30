const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        default: null,
        required: false,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
}, {
    collection: 'users',
    timestamps: true,
    versionKey: false
});

const User = mongoose.model('users', adminSchema);
module.exports = User;