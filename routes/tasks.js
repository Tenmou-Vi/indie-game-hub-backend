const express = require('express');
const router = express.Router();
const { db } = require('../server');

// Get all tasks
router.get('/', (req, res) => {
  try {
    res.json(db.tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
});

// Get task by ID
router.get('/:id', (req, res) => {
  try {
    const task = db.tasks.find(t => t.id === req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error: error.message });
  }
});

// Create new task
router.post('/', (req, res) => {
  try {
    const newTask = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date()
    };
    db.tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
});

// Update task
router.put('/:id', (req, res) => {
  try {
    const index = db.tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }
    db.tasks[index] = { ...db.tasks[index], ...req.body, updatedAt: new Date() };
    res.json(db.tasks[index]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
});

// Delete task
router.delete('/:id', (req, res) => {
  try {
    const index = db.tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }
    const deletedTask = db.tasks.splice(index, 1)[0];
    res.json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
});

// Update task status
router.patch('/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const index = db.tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }
    db.tasks[index].status = status;
    db.tasks[index].updatedAt = new Date();
    res.json(db.tasks[index]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task status', error: error.message });
  }
});

module.exports = router; 