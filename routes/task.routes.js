const express = require('express');
const router = express.Router();
const taskModel = require('../models/task.models');
const userModel = require('../models/user.models');  

function createPayload(data) {
  return {
    title : data.title,
    description: data.description,
    createdBy: data.username,
    completed: data.status,
  }
}

router.post('/newTask', async (req, res) => {
  try {
    const { username, title, description, status } = req.body;
    if (!username || !title || !description || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }     
    const newTask = await taskModel.create(createPayload(req.body));
    res.status(201).json(newTask);
  } 
  catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
});

router.get('/:username/all', async (req, res) => {
  try {
    const username  = req.params.username;
    const user = await findOne({ username });
    if (!user) { 
      return res.status(404).json({ error: 'User not found' });
    }
    const tasks = await taskModel.find({ user : username });
    res.json(tasks);
  } 
  catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

router.get('/:username/:title', async (req, res) => {
  try {
    const username  = req.params.username;
    const user = await findOne({ username });
    if (!user) { 
      return res.status(404).json({ error: 'User not found' });
    }
    const task = await taskModel.findOne({ user : username, title : req.params.title});
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } 
  catch (error) {
    res.status(500).json({ error: 'Error fetching task' });
  }
});

router.put('/:username/:title', async (req, res) => {
  try {
    const username  = req.params.username;
    const user = await findOne({ username });
    if (!user) { 
      return res.status(404).json({ error: 'User not found' });
    }
    const task = await taskModel.findOne({ user : username, title : req.params.title});
    const updatedData = req.body
    const updatedDocument = await taskModel.findOneAndUpdate({ username, title }, updatedData, {new: true})
    if (!updatedDocument) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedDocument);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
});

router.delete('/:username/:title', async (req, res) => {
  try {
    const deletedTask = await taskModel.findOneAndDelete({ username, title });
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(deletedTask);
  } 
  catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
});

module.exports = router;