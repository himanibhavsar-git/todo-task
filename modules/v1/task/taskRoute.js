const express = require('express');
const taskCtr = require('./taskController');
const auth = require('../../../helper/auth');
const taskRouter = express.Router();
const taskMiddleware = require('./taskMiddleware');


const createTaskMiddleware = [
    auth.validateUser,
    taskMiddleware.checkAdminRoleForTaskCRUD,
    taskCtr.createTask,
];
taskRouter.post('/create', createTaskMiddleware);

const updateTaskMiddleware = [
    auth.validateUser,
    taskMiddleware.checkAdminRoleForTaskCRUD,
    taskCtr.updateTask,
];
taskRouter.post('/update/:taskId', updateTaskMiddleware);

const removeTaskMiddleware = [
    auth.validateUser,
    taskMiddleware.checkAdminRoleForTaskCRUD,
    taskCtr.removeTask,
];
taskRouter.delete('/delete/:taskId', removeTaskMiddleware);

const getTasksMiddleware = [
    auth.validateUser,
    taskCtr.getAllTasks,
];
taskRouter.get('/list', getTasksMiddleware);

module.exports = taskRouter;