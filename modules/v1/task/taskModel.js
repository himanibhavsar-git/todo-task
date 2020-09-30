const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        enum: ["active", "deactive"],
        default: "active",
        required: true,
    },

    subTasks: {
        type: [String],
        required: false
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
    collection: 'tasks',
    timestamps: true,
    versionKey: false
});

const Task = mongoose.model('tasks', taskSchema);
module.exports = Task;