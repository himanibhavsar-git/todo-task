const Task = require("./taskModel");
const mongoose = require('mongoose');
const taskController = {};

taskController.createTask = async (req, res) => {
    // should add try catch or globally exception handler to handle unexpected DB error but skipping for now
    const {
        title,
        subTasks,
    } = req.body;


    const taskbj = new Task({
        title,
        subTasks,
        status: "active",
    });
    // Should use service for function calls in DB but in urgency writing code here
    await taskbj.save();
    return res.status(200).json({
        message: "Success!!",
    });

};

taskController.removeTask = async (req, res) => {
    // should add try catch or globally exception handler to handle unexpected DB error but skipping for now
    const {
        taskId,
    } = req.params;

    // Should use service for function calls in DB but in urgency writing code here
    await Task.remove({
        _id: taskId
    });
    return res.status(200).json({
        message: "Success!!",
    });

};

taskController.updateTask = async (req, res) => {
    // should add try catch or globally exception handler to handle unexpected DB error but skipping for now
    const {
        title,
        subTasks,
        status
    } = req.body;

    const {
        taskId,
    } = req.params;

    const taskbj = {
        title,
        subTasks,
        status,
    };
    // Should use service for function calls in DB but in urgency writing code here
    await Task.update({
        _id: taskId
    }, taskbj);
    return res.status(200).json({
        message: "Success!!",
    });
};


taskController.getAllTasks = async (req, res) => {
    // should add try catch or globally exception handler to handle unexpected DB error but skipping for now
    // Should use service for function calls in DB but in urgency writing code here
    const tasks = await Task.find();
    if (tasks && tasks.length > 0) {
        return res.status(200).json({
            message: "Success!!",
            data: tasks
        });
    } else {
        return res.status(200).json({
            message: "No tasks found",
            data: []
        });
    }

};
module.exports = taskController;