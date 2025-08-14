const express = require('express');
const router = express.Router();
const { db } = require('../server');

// Get all users
router.get('/', (req, res) => {
  try {
    res.json(db.users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Get user by ID
router.get('/:id', (req, res) => {
  try {
    const user = db.users.find(u => u.id === req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

// Create new user
router.post('/', (req, res) => {
  try {
    const newUser = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date()
    };
    db.users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Update user
router.put('/:id', (req, res) => {
  try {
    const index = db.users.findIndex(u => u.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    db.users[index] = { ...db.users[index], ...req.body, updatedAt: new Date() };
    res.json(db.users[index]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

// Delete user
router.delete('/:id', (req, res) => {
  try {
    const index = db.users.findIndex(u => u.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    const deletedUser = db.users.splice(index, 1)[0];
    res.json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

// Update user online status
router.patch('/:id/online', (req, res) => {
  try {
    const { online } = req.body;
    const index = db.users.findIndex(u => u.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    db.users[index].online = online;
    db.users[index].lastSeen = new Date();
    res.json(db.users[index]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user status', error: error.message });
  }
});

// Get online users
router.get('/online/list', (req, res) => {
  try {
    const onlineUsers = db.users.filter(u => u.online);
    res.json(onlineUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching online users', error: error.message });
  }
});

module.exports = router; 