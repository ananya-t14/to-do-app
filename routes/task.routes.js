const express = require('express');
const router = express.Router();
const taskModel = require('../models/task.models');
const userModel = require('../models/user.models');  

function createPayload(data) {
  return {
    title : data.title,
    description: data.description,
    createdBy: data.email,
    completed: data.status,
  }
}

router.post('/newTask', async (req, res) => {
  try {
    console.log(req.body);
    const { email, title, description, status } = req.body;
    if (!email || !title || !description || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }     
    const newTask = await taskModel.create(createPayload(req.body));
    res.status(201).json(newTask);
  } 
  catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
});

router.get('/:email', async (req, res) => {
  try {
    const tasks = await taskModel.find({});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching task' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await taskModel.findByIdAndRemove(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
});

module.exports = router;
