const express = require('express');
const router = express.Router();
const task_controller = require("../../controllers/v1/task-controller")

router.post('/newTask', task_controller.createTask);

router.get('/:username/all', task_controller.viewAllTasks);

router.get('/:username/:title', task_controller.viewTaskByTitle);

router.put('/:username/:title', task_controller.updateTask);

router.delete('/:username/:title', task_controller.deleteTask);

module.exports = router;