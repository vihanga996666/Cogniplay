import React, { useState, useEffect } from 'react';
import '../LevelStyles/SelectTheOddOne.css'; // Assuming you have a CSS file for styling
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import Melon from './Resources/Melon'; // Import the Melon component
import OddMelon from './Resources/OddMelon'; // Import the OddMelon component

const FindTheOddOne = () => {
  const [objects, setObjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize objects
    const initialObjects = [
      { id: 1, type: 'melon' },
      { id: 2, type: 'melon' },
      { id: 3, type: 'melon' },
      { id: 4, type: 'melon' },
      { id: 5, type: 'melon' },
      { id: 6, type: 'oddmelon' } // The odd one out
    ].sort(() => Math.random() - 0.5); // Shuffle objects

    setObjects(initialObjects);
  }, []);

  useEffect(() => {
    if (selected !== null) {
      const oddOneId = 6; // The ID of the odd object
      if (selected === oddOneId) {
        setScore(prevScore => prevScore + 10);
        setFeedback('Correct! Well done.');
        setGameFinished(true);
      } else {
        setScore(prevScore => prevScore - 1);
        setFeedback('Incorrect! Try again.');
        setSelected(null); // Deselect after incorrect choice
      }
    }
  }, [selected]);

  const handleSelect = (id) => {
    if (!gameFinished) {
      setSelected(id);
    }
  };

  const handlePlayNextLevel = async () => {
    const userId = auth.currentUser.uid;
    const activeSubAccount = JSON.parse(sessionStorage.getItem('activeSubAccount'));
    const accountRef = doc(db, 'users', userId, 'subAccounts', activeSubAccount.id);

    await updateDoc(accountRef, {
      'scores.level5': score,
    });

    navigate('/level6');
  };

  return (
    <div className="findtheoddone">
      <h1>Find the Different one</h1>
      <div className="objectsgridcontainer">
        <div className="objectscontainer">
          {objects.map((obj) => (
            <div
              key={obj.id}
              className={`object ${selected === obj.id ? 'selected' : ''}`}
              onClick={() => handleSelect(obj.id)}
            >
              {obj.type === 'melon' ? <Melon /> : <OddMelon />}
            </div>
          ))}
        </div>
      </div>
      {feedback && (
        <div className={`feedback ${feedback.startsWith('Incorrect') ? 'error' : 'success'}`}>
          {feedback}
        </div>
      )}
      {gameFinished && (
        <div className="modal">
          <div className="modal-content">
          <h2>Congratulations!</h2>
            <p>You've completed Level 5</p>
            <button onClick={handlePlayNextLevel}>Play Next Level</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindTheOddOne;
