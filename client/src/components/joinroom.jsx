import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket';

export default function JoinRoom() {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [createMode, setCreateMode] = useState(true);
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    if (!username || !question || options.some(opt => !opt)) return;
    
    localStorage.setItem('username', username);
    socket.emit('create-room', { 
      username, 
      question, 
      options 
    });
    
    socket.once('room-created', (id) => navigate(`/poll/${id}`));
  };

  const handleJoinRoom = () => {
    if (!username || !roomId) return;
    localStorage.setItem('username', username);
    socket.emit('join-room', { username, roomId });
    socket.once('room-joined', () => navigate(`/poll/${roomId}`));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h1>Live Poll Battle</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          style={{ padding: '10px', marginRight: '10px' }}
          onClick={() => setCreateMode(true)}
        >
          Create Room
        </button>
        <button 
          style={{ padding: '10px' }}
          onClick={() => setCreateMode(false)}
        >
          Join Room
        </button>
      </div>
      
      {createMode ? (
        <div>
          <input
            style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
            placeholder="Enter poll question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          
          {options.map((option, index) => (
            <input
              key={index}
              style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          ))}
          
          {options.length < 5 && (
            <button 
              style={{ padding: '5px', marginBottom: '10px' }}
              onClick={addOption}
            >
              Add Option
            </button>
          )}
          
          <button 
            style={{ padding: '10px', width: '100%' }}
            onClick={handleCreateRoom}
          >
            Create Poll Room
          </button>
        </div>
      ) : (
        <div>
          <input
            style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
            placeholder="Enter room code"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button 
            style={{ padding: '10px', width: '100%' }}
            onClick={handleJoinRoom}
          >
            Join Room
          </button>
        </div>
      )}
    </div>
  );
}



