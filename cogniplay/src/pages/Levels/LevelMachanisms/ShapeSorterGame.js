import React, { useState, useEffect } from 'react';
import '../LevelStyles/ShapeSorterGame.css';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';

const ShapeSorterGame = () => {
  const [shapes, setShapes] = useState([]);
  const [slots, setSlots] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Define shapes and slots with image URLs
    const initialShapes = [
      { id: 1, type: 'circle', color: 'red', image: '/images/circle.png' },
      { id: 2, type: 'square', color: 'blue', image: '/images/square.png' },
      { id: 3, type: 'triangle', color: 'green', image: '/images/triangle.png' },
      { id: 4, type: 'star', color: 'yellow', image: '/images/star.png' },
    ];

    const initialSlots = [
      { id: 1, type: 'circle', color: 'red', occupied: false, image: '/images/circle.png' },
      { id: 2, type: 'square', color: 'blue', occupied: false, image: '/images/square.png' },
      { id: 3, type: 'triangle', color: 'green', occupied: false, image: '/images/triangle.png' },
      { id: 4, type: 'star', color: 'yellow', occupied: false, image: '/images/star.png' },
    ];

    setShapes(initialShapes);
    setSlots(initialSlots);
  }, []);

  const handleDragStart = (event, shape) => {
    event.dataTransfer.setData('shape', JSON.stringify(shape));
  };

  const handleDrop = (event, slot) => {
    event.preventDefault();
    const shape = JSON.parse(event.dataTransfer.getData('shape'));

    if (shape.type === slot.type && shape.color === slot.color && !slot.occupied) {
      const newShapes = shapes.filter(s => s.id !== shape.id);
      const newSlots = slots.map(s =>
        s.id === slot.id ? { ...s, occupied: true } : s
      );

      setShapes(newShapes);
      setSlots(newSlots);

      if (newShapes.length === 0) {
        setGameFinished(true);
      }
    }
  };

  const handlePlayNextLevel = async () => {
    const userId = auth.currentUser.uid;
    const activeSubAccount = JSON.parse(sessionStorage.getItem('activeSubAccount'));
    const accountRef = doc(db, 'users', userId, 'subAccounts', activeSubAccount.id);

    await updateDoc(accountRef, {
      'scores.level2': 100, // Example score
    });

    navigate('/level3');
  };

  return (
    <div className="shape-sorter-game">
      <h1>Shape Sorter Game</h1>
      <div className="game-container">
        <div className="shapes">
          {shapes.map((shape) => (
            <div
              key={shape.id}
              className={`shape ${shape.type}`}
              draggable
              onDragStart={(event) => handleDragStart(event, shape)}
            >
              <img src={shape.image} alt={`${shape.type} shape`} />
            </div>
          ))}
        </div>
        <div className="slots">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className={`slot ${slot.type}`}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => handleDrop(event, slot)}
            >
              <img src={slot.image} alt={`${slot.type} slot`} />
            </div>
          ))}
        </div>
      </div>
      {gameFinished && (
        <div className="modal">
          <div className="modal-content">
            
            <p>You've completed Level 2.</p>
            <button onClick={handlePlayNextLevel}>Play Next Level</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShapeSorterGame;
