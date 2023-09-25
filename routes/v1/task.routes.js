const express = require("express");
const router = express.Router();
const TaskController = require("../../controllers/v1/task-controller");
const Validators = require("../../middlewares/validators");

router.post("/newTask", Validators.validateTask, TaskController.createTask);

router.get("/:username/all", TaskController.viewAllTasks);

router.get("/:username/:title", TaskController.viewTaskByTitle);

router.put("/:username/:title", TaskController.updateTask);

router.delete("/:username/:title", TaskController.deleteTask);

module.exports = router;
