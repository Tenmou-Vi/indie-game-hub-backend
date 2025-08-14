const express = require('express');
const router = express.Router();
const { db } = require('../server');

// Get all assets
router.get('/', (req, res) => {
  try {
    res.json(db.assets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assets', error: error.message });
  }
});

// Get asset by ID
router.get('/:id', (req, res) => {
  try {
    const asset = db.assets.find(a => a.id === req.params.id);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    res.json(asset);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching asset', error: error.message });
  }
});

// Create new asset
router.post('/', (req, res) => {
  try {
    const newAsset = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date()
    };
    db.assets.push(newAsset);
    res.status(201).json(newAsset);
  } catch (error) {
    res.status(500).json({ message: 'Error creating asset', error: error.message });
  }
});

// Update asset
router.put('/:id', (req, res) => {
  try {
    const index = db.assets.findIndex(a => a.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    db.assets[index] = { ...db.assets[index], ...req.body, updatedAt: new Date() };
    res.json(db.assets[index]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating asset', error: error.message });
  }
});

// Delete asset
router.delete('/:id', (req, res) => {
  try {
    const index = db.assets.findIndex(a => a.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    const deletedAsset = db.assets.splice(index, 1)[0];
    res.json({ message: 'Asset deleted successfully', asset: deletedAsset });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting asset', error: error.message });
  }
});

module.exports = router; 