# Chit-Chat 💬

A simple, fun public chat room application built for LinuxLite demonstration.

## Overview

Chit-Chat is a real-time group chat application that demonstrates full-stack deployment on a custom Linux distribution. Users can join the chat room, enter their name, and chat with everyone online.

## Features

- 💬 **Public Group Chat** - Everyone sees all messages
- 👤 **Username System** - Enter your name to join
- 💾 **Message Persistence** - All messages stored in SQLite database
- 🔄 **Auto-refresh** - New messages appear automatically every 3 seconds
- 🎨 **Clean UI** - Modern, responsive design
- 🚀 **One-Command Deployment** - Deploy from GitHub with a single command

## Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** - Lightweight database
- **Uvicorn** - ASGI server

### Frontend
- **React** - Modern UI library
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with animations

## Project Structure

```
chit-chat/
├── .linuxlite/           # LinuxLite deployment configuration
│   ├── deploy.yaml       # Deployment manifest
│   ├── hooks.sh          # Custom deployment hooks
│   └── .env.production   # Production environment variables
├── backend/
│   ├── main.py           # FastAPI application
│   ├── database.py       # SQLite operations
│   └── requirements.txt  # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # Entry point
│   ├── index.html        # HTML template
│   ├── package.json      # Node dependencies
│   └── vite.config.js    # Vite configuration
└── README.md             # This file
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check endpoint |
| GET | `/api/messages` | Get recent messages (last 50) |
| POST | `/api/messages` | Post a new message |

## Deployment on LinuxLite

### ⚡ One-Command Deployment

Deploy directly from GitHub with a single command:

```bash
ssh root@linuxlite
linuxlite-deploy https://github.com/yourusername/chit-chat.git
```

That's it! The deployment system will automatically:

1. ✅ Clone the repository to `/tmp/deploys/chit-chat`
2. ✅ Parse `.linuxlite/deploy.yaml` configuration
3. ✅ Install Python dependencies (`pip3 install`)
4. ✅ Install Node.js dependencies (`npm install`)
5. ✅ Build frontend application (`npm run build`)
6. ✅ Deploy backend to `/opt/chit-chat/`
7. ✅ Deploy frontend to `/var/www/chit-chat/`
8. ✅ Generate and install system service
9. ✅ Start the application

After deployment:
- **Backend API:** http://localhost:8000
- **Frontend:** http://localhost/ (served by linuxlite-http)

### 📋 Service Management

After deployment, manage the service with standard init.d commands:

```bash
/etc/init.d/chit-chat start     # Start service
/etc/init.d/chit-chat stop      # Stop service  
/etc/init.d/chit-chat restart   # Restart service
/etc/init.d/chit-chat status    # Check status
```

### 📝 View Logs

```bash
tail -f /var/log/chit-chat/access.log   # Application output
tail -f /var/log/chit-chat/error.log    # Error messages
```

### 🔧 LinuxLite Configuration

This app is configured for LinuxLite deployment via `.linuxlite/` directory:

**`deploy.yaml`** - Main deployment manifest
- Defines runtime requirements (Python 3.10+, Node.js)
- Specifies build commands and output directories
- Configures service settings (user, logging, etc.)

**`hooks.sh`** - Custom deployment hooks (optional)
- `pre_build()` - Runs before building
- `post_build()` - Runs after building
- `pre_start()` - Runs before starting service
- `post_start()` - Runs after starting service

**`.env.production`** - Production environment variables
- Database path configuration
- API URL for frontend

See [LinuxLite Deployment Documentation](../linux-deploy/README.md) for more details.

### 🔄 Manual Deployment (Alternative)

If you want to deploy manually:

```bash
# Clone repository
git clone https://github.com/yourusername/chit-chat.git
cd chit-chat

# Install dependencies
pip3 install -r backend/requirements.txt --break-system-packages

# Copy frontend to web root
cp -r frontend/* /var/www/

# Start backend
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

## Local Development

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm

### Backend Setup & Run

1. **Install dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Run backend**
   ```bash
   cd backend
   uvicorn main:app --reload --port 8000
   ```

   Backend API available at: http://localhost:8000

### Frontend Setup & Run

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure API URL**
   
   Create `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

3. **Run development server**
   ```bash
   cd frontend
   npm run dev
   ```

   Frontend available at: http://localhost:5173

### Production Build (Local Testing)

Build the frontend for production:

```bash
cd frontend
npm run build
```

Output will be in `frontend/dist/` directory.

## Usage

1. **Enter Username** - When you first visit, enter your name
2. **Send Messages** - Type in the input box and click Send (or press Enter)
3. **See Messages** - All messages appear in real-time (polls every 3 seconds)
4. **Chat with Everyone** - All users see all messages

## Database Schema

```sql
CREATE TABLE messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Security Features

- XSS Protection - All user input is escaped
- Message length limits - 500 characters max
- Username length limits - 20 characters max
- CORS enabled for cross-origin requests

## Demo Workflow

Perfect for showcasing LinuxLite's deployment capabilities:

1. **Share GitHub Repo** - Show this repository to your audience
2. **SSH into LinuxLite** - `ssh root@linuxlite`
3. **Deploy with One Command** - `linuxlite-deploy https://github.com/user/chit-chat.git`
4. **Start Cloudflare Tunnel** - Expose to the internet (optional)
5. **Share URL** - Audience can access and chat together!
6. **Show Service Management** - Demonstrate start/stop/restart commands
7. **Show Logs** - Display real-time application logs

**What makes this demo impressive:**
- ✨ True one-command deployment (no manual steps)
- 🚀 Deploys directly from GitHub URL
- 🔧 Automatic dependency installation
- 📦 Frontend build automation
- 🔄 Service management integration
- 📊 Production-grade logging
- 🌐 Internet-accessible in seconds

## Future Enhancements

- [ ] Online user count
- [ ] Typing indicators
- [ ] Message reactions (emoji)
- [ ] Private messaging
- [ ] User avatars
- [ ] Message editing/deletion
- [ ] WebSocket support for true real-time updates
- [ ] Message search functionality

## License

MIT License - Feel free to use for your projects!

## Author

Built for LinuxLite - A custom Linux distribution demonstration project.

## Contributing

Contributions welcome! Feel free to submit issues or pull requests.

---

**Made with ❤️ for LinuxLite Project**
