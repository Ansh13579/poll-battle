import { io } from 'socket.io-client';

// Use environment variable or current domain for production
const SERVER_URL = process.env.NODE_ENV === 'production' 
  ? window.location.origin 
  : 'http://localhost:4000';

export const socket = io(SERVER_URL);
socket.on('connect', () => {
    console.log('Connected to server!');
  });
  
  socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
  });
