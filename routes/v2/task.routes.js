const express = require("express");
const router = express.Router();
const taskModel = require("../models/task.models");
const userModel = require("../models/user.models");

function createPayload(data) {
  return {
    title: data.title,
    description: data.description,
    createdBy: data.username,
    completed: data.status,
  };
}

router.post("/newTask", async (req, res) => {
  try {
    const { username, title, description, status } = req.body;
    if (!username || !title || !description || !status) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newTask = await taskModel.create(createPayload(req.body));
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
});

router.get("/:username/all", async (req, res) => {
  try {
    const username = req.params.username;
    const user = await userModel.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const tasks = await taskModel.findAll({ where: { createdBy: username } });
    if (!tasks) {
      return res.status(404).json({ message: "Add more tasks" });
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/:username/:title", async (req, res) => {
  try {
    const username = req.params.username;
    const user = await userModel.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const task = await taskModel.findOne({
      where: {
        createdBy: username,
        title,
      },
    });
    if (!task) {
      return res.status(404).json({ error: "Task does not exist" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Error fetching task" });
  }
});

router.put("/:username/:title", async (req, res) => {
  try {
    const username = req.params.username;
    const user = await userModel.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const task = await taskModel.findOne({
      createdBy: username,
      title: req.params.title,
    });
    const updatedData = req.body;
    const [updatedRowsCount, updatedTask] = await taskModel.update(
      updatedData,
      {
        where: {
          createdBy: username,
          title,
        },
        returning: true,
      }
    );

    if (updatedRowsCount === 0 || !updatedTask) {
      return res.status(404).json({ error: "Task does not exist" });
    }
    res.status(200).json(updatedDocument);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
});

router.delete("/:username/:title", async (req, res) => {
  try {
    const username = req.params.username;
    const user = await userModel.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const deletedTask = await taskModel.findOne({
      where: {
        createdBy: username,
        title,
      },
    });
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    await taskModel.findOneAndDelete({ title: req.params.title });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error deleting task" });
  }
});

module.exports = router;
