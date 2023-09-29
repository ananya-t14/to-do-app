const UserModel = require('../../models/v2/user.models');
const TaskModel = require('../../models/v2/task.models');

class TaskController {
  static async createTask(req, res) {
    try {
      const {
        username, title, description, status,
      } = req.body;
      if (!username || !title || !description || !status) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }
      const newTask = await TaskModel.create({
        title,
        description,
        createdBy: username,
        completed: status,
      });
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: 'Error creating task' });
    }
  }

  static async viewAllTasks(req, res) {
    try {
      const { username } = req.params;
      const user = await UserModel.findOne({ where: { username } });
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      const tasks = await TaskModel.findAll({ where: { createdBy: username } });
      if (!tasks) {
        res.status(404).json({ message: 'Add more tasks' });
        return;
      }
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  }

  static async viewTaskByTitle(req, res) {
    try {
      const { username } = req.params;
      const user = await UserModel.findOne({ where: { username } });
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      const task = await TaskModel.findOne({
        where: {
          createdBy: username,
          title: req.params.title,
        },
      });
      if (!task) {
        res.status(404).json({ error: 'Task does not exist' });
        return;
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching task' });
    }
  }

  static async updateUser(req, res) {
    try {
      const { username } = req.params;
      const user = await UserModel.findOne({ where: { username } });
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      await TaskModel.findOne({
        createdBy: username,
        title: req.params.title,
      });
      const updatedData = req.body;
      const [updatedRowsCount, updatedTask] = await TaskModel.update(
        updatedData,
        {
          where: {
            createdBy: username,
            title: req.params.title,
          },
          returning: true,
        },
      );
      if (updatedRowsCount === 0 || !updatedTask) {
        res.status(404).json({ error: 'Task does not exist' });
        return;
      }
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: 'Error updating task' });
    }
  }

  static async deleteTask(req, res) {
    try {
      const { username } = req.params;
      const user = await UserModel.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const { title } = req.params;
      const deletedTask = await TaskModel.findOne({
        where: {
          createdBy: username,
          title,
        },
      });
      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      await TaskModel.findOneAndDelete({ title });
      return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Error deleting task' });
    }
  }
}

module.exports = TaskController;
