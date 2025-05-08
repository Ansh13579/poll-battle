import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from '../socket';

export default function Poll() {
  const { roomId } = useParams();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [votes, setVotes] = useState({});
  const [users, setUsers] = useState([]);
  const [timer, setTimer] = useState(60);
  const [hasVoted, setHasVoted] = useState(localStorage.getItem(`voted_${roomId}`) === 'true');
  const [isActive, setIsActive] = useState(true);
  const [selectedOption, setSelectedOption] = useState(localStorage.getItem(`selected_${roomId}`) || '');

  useEffect(() => {
    socket.on('update-votes', (newVotes) => {
      setVotes(newVotes);
    });
    
    socket.on('update-users', (userList) => {
      setUsers(userList);
    });
    
    socket.on('update-timer', (time) => {
      setTimer(time);
    });
    
    socket.on('vote-ended', () => {
      setIsActive(false);
    });
    
    socket.on('room-joined', (room) => {
      setQuestion(room.question);
      setOptions(room.options);
      setVotes(room.votes);
      setTimer(room.timer);
      setIsActive(room.isActive);
    });
    
    // Request room data when component mounts
    socket.emit('join-room', { 
      username: localStorage.getItem('username'), 
      roomId 
    });

    return () => {
      socket.off('update-votes');
      socket.off('update-users');
      socket.off('update-timer');
      socket.off('vote-ended');
      socket.off('room-joined');
    };
  }, [roomId]);

  const handleVote = (option) => {
    if (!hasVoted && isActive) {
      socket.emit('vote', { roomId, option });
      setHasVoted(true);
      setSelectedOption(option);
      localStorage.setItem(`voted_${roomId}`, 'true');
      localStorage.setItem(`selected_${roomId}`, option);
    }
  };

  const totalVotes = options.reduce((sum, option) => sum + (votes[option] || 0), 0);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>{question || 'Loading poll...'}</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <p>Room: {roomId} | Time remaining: {timer}s</p>
        <p>Users in room: {users.length}</p>
      </div>
      
      {options.map((option) => {
        const voteCount = votes[option] || 0;
        const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
        
        return (
          <div 
            key={option}
            style={{ 
              marginBottom: '10px', 
              border: '1px solid #ddd',
              borderRadius: '5px',
              padding: '10px',
              cursor: isActive && !hasVoted ? 'pointer' : 'default',
              backgroundColor: selectedOption === option ? '#e6f7ff' : '#f9f9f9'
            }}
            onClick={() => handleVote(option)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{option}</span>
              <span>{voteCount} votes - {percentage}%</span>
            </div>
            <div style={{ 
              height: '20px', 
              backgroundColor: '#e6e6e6', 
              marginTop: '5px',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                height: '100%', 
                width: `${percentage}%`, 
                backgroundColor: '#1890ff',
                transition: 'width 0.5s ease'
              }} />
            </div>
          </div>
        );
      })}
      
      {!isActive && <p>Voting has ended!</p>}
      {hasVoted && isActive && <p>You have already voted!</p>}
      
      <p>Total votes: {totalVotes}</p>
    </div>
  );
}


