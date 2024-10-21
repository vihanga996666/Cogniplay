import React, { useState, useEffect } from 'react';
import '../LevelStyles/CatchTheObjectGame.css';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import Flower from './Resources/Flower'; // Import Flower SVG component
import Bomb from './Resources/Bomb'; // Import Bomb SVG component
import '../LevelStyles/Modal.css';

const CatchTheObjectGame = () => {
  const [objects, setObjects] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameFinished, setGameFinished] = useState(false);
  const [flowerCount, setFlowerCount] = useState(0);
  const [bombCount, setBombCount] = useState(0);
  const [occupiedColumns, setOccupiedColumns] = useState(Array(8).fill(false));
  const navigate = useNavigate();

  const columns = Array.from({ length: 8 }, (_, i) => i * 12.5);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setGameFinished(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (!gameFinished) {
      const objectInterval = setInterval(() => {
        if (flowerCount < 20 || bombCount < 10) {
          const type = Math.random() < 0.67 && flowerCount < 20 ? 'flower' : 'bomb';
          if (type === 'flower') {
            setFlowerCount((prevCount) => prevCount + 1);
          } else {
            setBombCount((prevCount) => prevCount + 1);
          }
          createObject(type);
        }
      }, 2000); // Adjust this interval as needed

      return () => clearInterval(objectInterval);
    }
  }, [gameFinished, flowerCount, bombCount]);

  const createObject = (type) => {
    const id = Math.random().toString(36).substr(2, 9);
    const availableColumns = columns.filter((_, index) => !occupiedColumns[index]);

    if (availableColumns.length === 0) return;

    const column = availableColumns[Math.floor(Math.random() * availableColumns.length)];
    const columnIndex = columns.indexOf(column);

    setOccupiedColumns((prev) => {
      const newOccupied = [...prev];
      newOccupied[columnIndex] = true;
      return newOccupied;
    });

    const newObject = {
      id,
      type,
      left: column,
      top: 0,
    };

    setObjects((prevObjects) => [...prevObjects, newObject]);

    const fallInterval = setInterval(() => {
      setObjects((prevObjects) => {
        return prevObjects.map((obj) => {
          if (obj.id === id) {
            return { ...obj, top: obj.top + 1 };
          }
          return obj;
        });
      });
    }, 70);

    setTimeout(() => {
      setOccupiedColumns((prev) => {
        const newOccupied = [...prev];
        newOccupied[columnIndex] = false;
        return newOccupied;
      });
      clearInterval(fallInterval);
    }, 7000);
  };

  const handleObjectClick = (id, type) => {
    if (type === 'flower') {
      setScore((prevScore) => prevScore + 0.5);
    } else if (type === 'bomb') {
      setScore((prevScore) => prevScore - 0.5);
    }
    setObjects((prevObjects) => prevObjects.filter((object) => object.id !== id));
  };

  const handlePlayNextLevel = async () => {
    const userId = auth.currentUser.uid;
    const activeSubAccount = JSON.parse(sessionStorage.getItem('activeSubAccount'));
    const accountRef = doc(db, 'users', userId, 'subAccounts', activeSubAccount.id);

    await updateDoc(accountRef, {
      'scores.level7': score,
    });

    navigate('/level8');
  };

  return (
    <div className="catchtheobjectgame">
      <h1 className='QL7'>Catch Flowers</h1>
      <div className="timerb">Time Left: {timeLeft}s</div>
      <div className="gameareab">
        {objects.map((object) => (
          <div
            key={object.id}
            className={`fallingobjectb ${object.type}`}
            style={{ left: `${object.left}%`, top: `${object.top}%` }}
            onClick={() => handleObjectClick(object.id, object.type)}
          >
            {object.type === 'flower' ? <Flower /> : <Bomb />}
          </div>
        ))}
      </div>
      {gameFinished && (
        <div className="modal">
          <div className="modal-content">
          <h2>Congratulations!</h2>
            <p>You've completed Level 7.</p>
            <button onClick={handlePlayNextLevel}>Play Next Level</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatchTheObjectGame;
