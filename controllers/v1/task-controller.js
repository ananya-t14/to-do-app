const UserModel = require("../../models/v1/user.models");
const TaskModel = require("../../models/v1/task.models");

class TaskController {
  static async createTask(req, res) {
    try {
      const { username, title, description, status } = req.body;

      const newTask = await TaskModel.create({
        title,
        description,
        createdBy: username,
        completed: status,
      });
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: "Error creating task" });
    }
  }

  static async viewAllTasks(req, res) {
    try {
      const { username } = req.params;
      if (!username) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const user = await UserModel.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const tasks = await TaskModel.find({ createdBy: username });
      if (!tasks) {
        return res.status(404).json({ message: "Add more tasks" });
      }
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }

  static async viewTaskByTitle(req, res) {
    try {
      const { username } = req.params;
      if (!username) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const user = await UserModel.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const task = await TaskModel.findOne({
        createdBy: username,
        title: req.params.title,
      });
      if (!task) {
        return res.status(404).json({ error: "Task does not exist" });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "Error fetching task" });
    }
  }

  static async updateTask(req, res) {
    try {
      const { username } = req.params;
      if (!username) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const user = await UserModel.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      await TaskModel.findOne({ createdBy: username, title: req.params.title });
      const updatedData = req.body;
      const updatedDocument = await TaskModel.findOneAndUpdate(
        { createdBy: username, title: req.params.title },
        updatedData,
        { new: true }
      );
      if (!updatedDocument) {
        return res.status(404).json({ error: "Task does not exist" });
      }
      res.status(200).json(updatedDocument);
    } catch (error) {
      res.status(500).json({ error: "Error updating task" });
    }
  }

  static async deleteTask(req, res) {
    try {
      const { username } = req.params;
      if (!username) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const user = await UserModel.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const deletedTask = await TaskModel.findOne({
        createdBy: username,
        title: req.params.title,
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
  }
}

module.exports = TaskController;
