const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('http');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const rooms = new Map(); // Stores all active rooms

io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);

  // Create new room with custom question and options
  socket.on('create-room', (data) => {
    // Handle both old format (just username) and new format (object with question/options)
    let username, question, options;
    
    if (typeof data === 'string') {
      // Legacy format - just username
      username = data;
      question = 'Cats vs Dogs';
      options = ['cats', 'dogs'];
    } else {
      // New format with custom poll data
      username = data.username;
      question = data.question || 'Cats vs Dogs';
      options = data.options || ['cats', 'dogs'];
    }

    const roomId = uuidv4().substring(0, 6);
    
    // Create votes object dynamically based on options
    const votes = {};
    options.forEach(option => {
      votes[option] = 0;
    });
    
    rooms.set(roomId, {
      users: new Map([[socket.id, username]]),
      question,
      options,
      votes,
      timer: 60,
      isActive: true
    });
    
    socket.join(roomId);
    socket.emit('room-created', roomId);
    startTimer(roomId);
  });

  // Join existing room
  socket.on('join-room', (data) => {
    const room = rooms.get(data.roomId);
    if (!room) return socket.emit('error', 'Room not found');
    
    room.users.set(socket.id, data.username);
    socket.join(data.roomId);
    io.to(data.roomId).emit('update-users', Array.from(room.users.values()));
    socket.emit('room-joined', room);
  });

  // Handle voting
  socket.on('vote', (data) => {
    const room = rooms.get(data.roomId);
    if (!room || !room.isActive) return;
    
    room.votes[data.option]++;
    io.to(data.roomId).emit('update-votes', room.votes);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    rooms.forEach((room, roomId) => {
      if (room.users.has(socket.id)) {
        room.users.delete(socket.id);
        io.to(roomId).emit('update-users', Array.from(room.users.values()));
      }
    });
  });
});

function startTimer(roomId) {
  const interval = setInterval(() => {
    const room = rooms.get(roomId);
    if (!room) {
      clearInterval(interval);
      return;
    }
    
    room.timer--;
    io.to(roomId).emit('update-timer', room.timer);
    
    if (room.timer <= 0) {
      room.isActive = false;
      clearInterval(interval);
      io.to(roomId).emit('vote-ended');
    }
  }, 1000);
}

server.listen(4000, () => console.log('Server running on port 4000'));

