const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data storage
let tasks = [
  {
    id: '1',
    title: 'Design Main Character',
    description: 'Create the main character sprite sheet',
    status: 'In Progress',
    priority: 'High',
    assignedTo: 'user1',
    projectId: 'project1',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    tags: ['design', 'character'],
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Implement Jump Mechanics',
    description: 'Add jumping functionality to the game',
    status: 'To Do',
    priority: 'Medium',
    assignedTo: 'user2',
    projectId: 'project1',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    tags: ['programming', 'mechanics'],
    createdAt: new Date()
  }
];

let assets = [
  {
    id: '1',
    name: 'Hero Sprite',
    filename: 'hero_sprite.png',
    type: 'image',
    size: 1024,
    category: 'Character',
    tags: ['player', 'sprite', '32x32'],
    description: 'Main character sprite sheet',
    projectId: 'project1',
    uploader: 'user1',
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'Jump Sound',
    filename: 'jump_sound.wav',
    type: 'audio',
    size: 512,
    category: 'Audio',
    tags: ['sound', 'jump', 'effect'],
    description: 'Character jump sound effect',
    projectId: 'project1',
    uploader: 'user1',
    createdAt: new Date()
  }
];

// Helper function to generate unique IDs
const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Indie Game Hub API is running!',
    timestamp: new Date().toISOString(),
    database: 'In-memory'
  });
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Indie Game Hub API is running!' });
});

// ===== TASKS API - Full CRUD Operations =====

// GET all tasks
app.get('/api/tasks', (req, res) => {
  try {
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// GET single task by ID
app.get('/api/tasks/:id', (req, res) => {
  try {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// POST create new task
app.post('/api/tasks', (req, res) => {
  try {
    const { title, description, priority, assignedTo, dueDate, status = 'To Do', tags = [] } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const newTask = {
      id: generateId(),
      title,
      description,
      status,
      priority: priority || 'Medium',
      assignedTo: assignedTo || '',
      projectId: 'project1',
      dueDate: dueDate ? new Date(dueDate) : null,
      tags,
      createdAt: new Date()
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT update task
app.put('/api/tasks/:id', (req, res) => {
  try {
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const { title, description, priority, assignedTo, dueDate, status, tags } = req.body;
    
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...(title && { title }),
      ...(description && { description }),
      ...(priority && { priority }),
      ...(assignedTo !== undefined && { assignedTo }),
      ...(dueDate && { dueDate: new Date(dueDate) }),
      ...(status && { status }),
      ...(tags && { tags })
    };

    res.json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE task
app.delete('/api/tasks/:id', (req, res) => {
  try {
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];
    res.json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// ===== ASSETS API - Full CRUD Operations =====

// GET all assets
app.get('/api/assets', (req, res) => {
  try {
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
});

// GET single asset by ID
app.get('/api/assets/:id', (req, res) => {
  try {
    const asset = assets.find(a => a.id === req.params.id);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.json(asset);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch asset' });
  }
});

// POST create new asset
app.post('/api/assets', (req, res) => {
  try {
    const { name, filename, type, size, category, tags, description, uploader } = req.body;
    
    if (!name || !filename || !type) {
      return res.status(400).json({ error: 'Name, filename, and type are required' });
    }

    const newAsset = {
      id: generateId(),
      name,
      filename,
      type,
      size: size || 0,
      category: category || 'Other',
      tags: tags || [],
      description: description || '',
      projectId: 'project1',
      uploader: uploader || 'user1',
      createdAt: new Date()
    };

    assets.push(newAsset);
    res.status(201).json(newAsset);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create asset' });
  }
});

// PUT update asset
app.put('/api/assets/:id', (req, res) => {
  try {
    const assetIndex = assets.findIndex(a => a.id === req.params.id);
    if (assetIndex === -1) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    const { name, filename, type, size, category, tags, description } = req.body;
    
    assets[assetIndex] = {
      ...assets[assetIndex],
      ...(name && { name }),
      ...(filename && { filename }),
      ...(type && { type }),
      ...(size !== undefined && { size }),
      ...(category && { category }),
      ...(tags && { tags }),
      ...(description !== undefined && { description })
    };

    res.json(assets[assetIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update asset' });
  }
});

// DELETE asset
app.delete('/api/assets/:id', (req, res) => {
  try {
    const assetIndex = assets.findIndex(a => a.id === req.params.id);
    if (assetIndex === -1) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    const deletedAsset = assets.splice(assetIndex, 1)[0];
    res.json({ message: 'Asset deleted successfully', asset: deletedAsset });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete asset' });
  }
});

// ===== LEGACY ROUTES (keeping for compatibility) =====

app.get('/api/versions', (req, res) => {
  res.json([
    {
      id: '1',
      name: 'Alpha 0.1',
      description: 'Initial prototype with basic mechanics',
      versionNumber: '0.1.0',
      projectId: 'project1',
      creator: 'user1',
      createdAt: new Date(),
      assets: ['1', '2'],
      tasks: ['1']
    }
  ]);
});

app.get('/api/users', (req, res) => {
  res.json([
    {
      id: 'user1',
      username: 'john_doe',
      displayName: 'John Doe',
      email: 'john@example.com',
      role: 'Developer',
      online: true,
      lastSeen: new Date()
    },
    {
      id: 'user2',
      username: 'jane_smith',
      displayName: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Designer',
      online: false,
      lastSeen: new Date(Date.now() - 30 * 60 * 1000)
    }
  ]);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🏥 Health check available at: http://localhost:${PORT}/health`);
  console.log('💾 Using in-memory database - no external database required!');
  console.log('📝 Full CRUD operations implemented!');
  console.log('📊 Available endpoints:');
  console.log('   GET    /api/tasks - Get all tasks');
  console.log('   POST   /api/tasks - Create new task');
  console.log('   PUT    /api/tasks/:id - Update task');
  console.log('   DELETE /api/tasks/:id - Delete task');
  console.log('   GET    /api/assets - Get all assets');
  console.log('   POST   /api/assets - Create new asset');
  console.log('   PUT    /api/assets/:id - Update asset');
  console.log('   DELETE /api/assets/:id - Delete asset');
});
