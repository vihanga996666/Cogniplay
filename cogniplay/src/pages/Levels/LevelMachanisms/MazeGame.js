import React, { useState, useEffect } from 'react';
import '../LevelStyles/MazeGame.css';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import Butterfly from './Resources/Butterfly'; // Import your Butterfly component
import Flower from './Resources/Flower'; // Correctly import your Flower component

const MazeGame = () => {
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 });
  const [maze, setMaze] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);
  const navigate = useNavigate();

  const mazeLayout = [
    [2, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0],
    [1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 3], // 3 is the endpoint
  ];

  useEffect(() => {
    setMaze(mazeLayout);

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          moveCharacter(-1, 0);
          break;
        case 'ArrowDown':
          moveCharacter(1, 0);
          break;
        case 'ArrowLeft':
          moveCharacter(0, -1);
          break;
        case 'ArrowRight':
          moveCharacter(0, 1);
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (characterPosition.x === maze.length - 1 && characterPosition.y === maze[0].length - 1) {
      setGameFinished(true);
    }
  }, [characterPosition]);

  const moveCharacter = (dx, dy) => {
    const newX = characterPosition.x + dx;
    const newY = characterPosition.y + dy;

    if (newX >= 0 && newX < maze.length && newY >= 0 && newY < maze[0].length && maze[newX][newY] !== 1) {
      setCharacterPosition({ x: newX, y: newY });
    }
  };

  const handlePlayNextLevel = async () => {
    const userId = auth.currentUser.uid;
    const activeSubAccount = JSON.parse(sessionStorage.getItem('activeSubAccount'));
    const accountRef = doc(db, 'users', userId, 'subAccounts', activeSubAccount.id);

    await updateDoc(accountRef, {
      'scores.level3': 100, // Example score
    });

    navigate('/level4');
  };

  return (
    <div className="mazegame">
      <h1 className='QL3'>Guide the Butterfly to the Flower</h1>
      <div className="mazecontainer">
        {maze.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            let className = 'mazecell';
            if (rowIndex === characterPosition.x && colIndex === characterPosition.y) {
              className += ' character';
              return (
                <div key={`${rowIndex}-${colIndex}`} className={className}>
                  <Butterfly /> {/* Replace character with Butterfly */}
                </div>
              );
            } else if (cell === 1) {
              className += ' wall';
            } else if (rowIndex === 0 && colIndex === 0) {
              className += ' start';
            } else if (cell === 3) {
              className += ' end';
              return (
                <div key={`${rowIndex}-${colIndex}`} className={className}>
                  <Flower /> {/* Replace endpoint with Flower */}
                </div>
              );
            }
            return <div key={`${rowIndex}-${colIndex}`} className={className} />;
          })
        )}
      </div>
      {gameFinished && (
        <div className="modal">
          <div className="modal-content">
          <h2>Congratulations!</h2>
            <p>You've completed Level 3.</p>
            <button onClick={handlePlayNextLevel}>Play Next Level</button>
          </div>
        </div>
      )}
      <div className="controls">
        <button className="controlbtn" onClick={() => moveCharacter(-1, 0)}>▲</button>
        <div className="horizontalcontrols">
          <button className="controlbtn" onClick={() => moveCharacter(0, -1)}>◄</button>
          <button className="controlbtn" onClick={() => moveCharacter(0, 1)}>►</button>
        </div>
        <button className="controlbtn" onClick={() => moveCharacter(1, 0)}>▼</button>
      </div>
    </div>
  );
};

export default MazeGame;
