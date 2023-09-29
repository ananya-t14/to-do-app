const express = require('express');

const router = express.Router();
const TaskController = require('../../controllers/v2/task-controller');

router.post('/newTask', TaskController.createTask);
router.get('/:username/all', TaskController.viewAllTasks);
router.get('/:username/:title', TaskController.viewTaskByTitle);
router.put('/:username/:title', TaskController.updateTask);
router.delete('/:username/:title', TaskController.deleteTask);

module.exports = router;
