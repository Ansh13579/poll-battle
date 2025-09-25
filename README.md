# Live Poll Battle 🗳️⚡

A real-time live polling application where users can create and participate in voting battles with instant results!

## 🎯 Quick Start - Run Locally

Want to see it in action? Follow these simple steps to run the full application on your machine:

### 📋 Prerequisites
Make sure you have these installed:
- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)

### 🚀 Step-by-Step Setup

1. **📥 Clone the Repository**
   ```bash
   git clone https://github.com/Ansh13579/poll-battle.git
   cd poll-battle
   ```

2. **⚙️ Install Server Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **⚙️ Install Client Dependencies**
   ```bash
   cd ../client
   npm install
   ```

### 🏃‍♂️ Running the Application

You need to run both the server and client. Open **two terminal windows**:

#### Terminal 1 - Start the Backend Server:
```bash
cd server
node index.js
```
✅ You should see: `Server running on port 4000`

#### Terminal 2 - Start the Frontend:
```bash
cd client  
npm start
```
✅ This will automatically open your browser to the application

### 🎉 What You'll See

1. **Landing Page**: Create a new poll room or join an existing one
2. **Poll Room**: Vote in real-time and see results update instantly
3. **Live Updates**: Watch votes come in from multiple users in real-time

## 🌍 Online Demos

- **🌐 Frontend Demo**: [https://ansh13579.github.io/poll-battle](https://ansh13579.github.io/poll-battle) *(Interface only)*
- **🚀 Full Version**: Deploy your own using the buttons below for complete functionality

## ✨ Features

- 🔴 **Real-time Voting**: Live poll updates using Socket.io
- 🏠 **Room System**: Create and join private poll rooms with unique codes
- ⏱️ **Timer System**: Configurable voting time limits
- 📊 **Live Results**: See results update in real-time as people vote
- 🎨 **Custom Polls**: Create polls with custom questions and options
- 📱 **Mobile Responsive**: Works seamlessly on all devices
- 👥 **Multi-user**: Support for multiple users voting simultaneously

## 🔧 Troubleshooting

### Common Issues:

**❌ "npm not found" or "node not found"**
- Install Node.js from [nodejs.org](https://nodejs.org/)
- Restart your terminal after installation

**❌ Port already in use**
- Make sure no other applications are running on ports 3000 or 4000
- Or change ports in the configuration files

**❌ Cannot connect to server**
- Make sure the backend server is running first (Terminal 1)
- Check that you see "Server running on port 4000" message

**❌ Blank page in browser**
- Wait a few seconds for the React app to compile
- Check the terminal for any error messages

### 💡 Tips for Testing:
- Open multiple browser tabs to simulate different users
- Test creating and joining rooms with different room codes
- Try voting from different tabs to see real-time updates

## 🌐 Deploy Your Own

Want to share your poll app with the world? Deploy it for free:

### One-Click Deployment:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Ansh13579/poll-battle)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ansh13579/poll-battle)

### Other Options:
- **Railway**: Connect your GitHub repo at [railway.app](https://railway.app)
- **DigitalOcean**: Use their App Platform for easy deployment

## 🏗️ How It Works

### 🎮 User Flow:
1. **Create/Join**: Users enter their name and create a new poll room or join existing one with room code
2. **Vote**: Users vote on poll options in real-time
3. **See Results**: Live results update instantly as votes come in
4. **Timer**: Optional countdown timer for voting periods

### 🛠️ Tech Stack:
- **Frontend**: React.js with React Router for navigation
- **Backend**: Node.js with Express server
- **Real-time**: Socket.io for live updates
- **Styling**: CSS with gradient backgrounds

### 📁 Project Structure:
```
poll-battle/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js         # Main app component
│   │   └── socket.js      # Socket.io client setup
│   └── public/            # Static files
└── server/                # Node.js backend
    ├── index.js          # Main server file
    └── package.json      # Server dependencies
```

## 🤝 Contributing

Want to improve Live Poll Battle? Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Support

Having issues? Need help?
- 🐛 **Bug Reports**: [Open an issue](https://github.com/Ansh13579/poll-battle/issues)
- 💬 **Questions**: Start a [discussion](https://github.com/Ansh13579/poll-battle/discussions)
- 🌟 **Like the project?**: Give it a star on GitHub!

---

**Happy Polling!** 🗳️⚡