Project Description
This application enables users to participate in live polls where they can see results update in real-time as votes come in. Users can create their own poll rooms or join existing ones using a unique room code. The application uses WebSockets for real-time communication between clients and the server.
Setup Instructions
Prerequisites
Node.js (v14 or higher)

npm (v6 or higher)

Installation
1. Clone the repository:
    git clone https://github.com/your-username/poll-battle.git
    

2. Set up the backend:
    npm install
    npm install -g nodemon (optional)

3. Set up the frontend:
    cd ../client
    npm install

Running the Application
1. Start the backend server:    
    nodemon index.js

2. Start the frontend application:
    npm start

How the App is Structured
Frontend (React)
The frontend is organized into components:

App.js: Main component with routing setup

JoinRoom.jsx: Handles user registration and room creation/joining

Poll.jsx: Displays the poll, handles voting, and shows results

socket.js: Sets up the WebSocket connection to the backend

Backend (Node.js)
The backend uses Express and Socket.IO:

index.js: Main server file with WebSocket event handlers

Room data is stored in memory using a Map structure

Data Flow
Users enter their username and create/join a room

When a user votes, the vote is sent to the server via WebSockets

The server updates the vote count and broadcasts the new results to all users in the room

The frontend updates in real-time to display the current vote tallies

State Management
Room state (users, votes, timer) is maintained on the server

Client-side state is managed with React hooks

WebSockets provide bidirectional communication for real-time updates

Local storage persists user votes to prevent duplicate voting    
    

    
    
