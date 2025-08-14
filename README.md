# 🎮 Indie Game Hub - Backend API

A Node.js/Express backend API for indie game development team collaboration platform.

## 🌐 Live API

**Deployed API**: https://indie-game-hub-backend-346389979835.us-central1.run.app

## 🚀 Technology Stack

- **Node.js** - JavaScript runtime
- **Express** (v4.18.2) - Web application framework
- **CORS** (v2.8.5) - Cross-origin resource sharing
- **In-Memory Database** - Simplified data storage for deployment stability

## 📊 API Endpoints

### Health Check
```
GET /health
```
Returns server health status.

### Tasks API
```
GET    /api/tasks          # Get all tasks
GET    /api/tasks/:id      # Get task by ID
POST   /api/tasks          # Create new task
PUT    /api/tasks/:id      # Update task
DELETE /api/tasks/:id      # Delete task
```

### Assets API
```
GET    /api/assets         # Get all assets
GET    /api/assets/:id     # Get asset by ID
POST   /api/assets         # Create new asset
PUT    /api/assets/:id     # Update asset
DELETE /api/assets/:id     # Delete asset
```

### Users API
```
GET    /api/users          # Get all users
GET    /api/users/:id      # Get user by ID
```

### Versions API
```
GET    /api/versions       # Get all versions
GET    /api/versions/:id   # Get version by ID
```

## 📋 Data Models

### Task
```javascript
{
  id: string,
  title: string,
  description: string,
  status: 'To Do' | 'In Progress' | 'Review' | 'Done',
  priority: 'Low' | 'Medium' | 'High' | 'Critical',
  assignedTo: string,
  projectId: string,
  dueDate: Date,
  tags: string[],
  createdAt: Date
}
```

### Asset
```javascript
{
  id: string,
  name: string,
  filename: string,
  type: 'image' | 'audio' | 'video' | 'document',
  size: number,
  category: 'Character' | 'Background' | 'Audio' | 'UI' | 'Other',
  description: string,
  tags: string[],
  uploader: string,
  projectId: string,
  createdAt: Date
}
```

### User
```javascript
{
  id: string,
  name: string,
  email: string,
  role: string,
  avatar: string,
  status: 'online' | 'offline',
  lastActive: Date,
  projectId: string
}
```

### Version
```javascript
{
  id: string,
  version: string,
  description: string,
  creator: string,
  projectId: string,
  assets: string[],
  completedTasks: string[],
  createdAt: Date
}
```

## 🛠️ Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm start
```

### Available Scripts
- `npm start` - Start the server (port 8080)
- `npm test` - Run test suite (if configured)

### Environment Variables
- `PORT` - Server port (default: 8080)
- `NODE_ENV` - Environment (development/production)

## 🌐 Deployment

### Google Cloud Run
The API is deployed using Google Cloud Run with Docker containerization.

```bash
# Build Docker image
docker build -t indie-game-hub-backend .

# Deploy to Google Cloud Run
gcloud run deploy indie-game-hub-backend \
  --image gcr.io/indie-game-hub-2024/indie-game-hub-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Docker Configuration
The application uses a multi-stage Docker build for optimization:
- Base image: `node:18-alpine`
- Working directory: `/workspace`
- Exposed port: `8080`

## 🔒 CORS Configuration

The API is configured to accept requests from:
- Frontend application domain
- Localhost for development
- All origins (for demo purposes)

## 📁 Project Structure

```
backend/
├── server.js           # Main application file
├── package.json        # Dependencies and scripts
├── Dockerfile         # Docker configuration
├── routes/            # API route handlers
│   ├── tasks.js       # Task-related routes
│   ├── assets.js      # Asset-related routes
│   ├── users.js       # User-related routes
│   └── versions.js    # Version-related routes
├── models/            # Data models (future MongoDB integration)
└── middleware/        # Custom middleware functions
```

## 🚀 Features

### RESTful API Design
- Standard HTTP methods (GET, POST, PUT, DELETE)
- JSON request/response format
- Consistent error handling
- Status code conventions

### In-Memory Data Storage
- Fast response times
- No database dependencies
- Perfect for demonstration purposes
- Easy to extend to MongoDB/PostgreSQL

### CORS Support
- Cross-origin requests enabled
- Frontend-backend communication
- Secure header configuration

### Error Handling
- Comprehensive error responses
- Proper HTTP status codes
- Detailed error messages for debugging

## 🔧 Configuration Files

- `Dockerfile` - Container configuration for Google Cloud Run
- `package.json` - Node.js dependencies and scripts

## 🔗 Frontend Integration

This backend is designed to work with the Indie Game Hub frontend:
- **Frontend Repository**: [Link to frontend repo]
- **Deployed Frontend**: https://indie-game-hub-2024.uc.r.appspot.com

## 📄 License

This project is part of a university course assignment.

---

**Part of the Indie Game Hub project** - A collaborative platform for indie game development teams.
