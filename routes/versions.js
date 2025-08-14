const express = require('express');
const router = express.Router();
const { db } = require('../server');

// Get all versions
router.get('/', (req, res) => {
  try {
    res.json(db.versions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching versions', error: error.message });
  }
});

// Get version by ID
router.get('/:id', (req, res) => {
  try {
    const version = db.versions.find(v => v.id === req.params.id);
    if (!version) {
      return res.status(404).json({ message: 'Version not found' });
    }
    res.json(version);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching version', error: error.message });
  }
});

// Create new version
router.post('/', (req, res) => {
  try {
    const newVersion = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date()
    };
    db.versions.push(newVersion);
    res.status(201).json(newVersion);
  } catch (error) {
    res.status(500).json({ message: 'Error creating version', error: error.message });
  }
});

// Update version
router.put('/:id', (req, res) => {
  try {
    const index = db.versions.findIndex(v => v.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Version not found' });
    }
    db.versions[index] = { ...db.versions[index], ...req.body, updatedAt: new Date() };
    res.json(db.versions[index]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating version', error: error.message });
  }
});

// Delete version
router.delete('/:id', (req, res) => {
  try {
    const index = db.versions.findIndex(v => v.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Version not found' });
    }
    const deletedVersion = db.versions.splice(index, 1)[0];
    res.json({ message: 'Version deleted successfully', version: deletedVersion });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting version', error: error.message });
  }
});

module.exports = router; 