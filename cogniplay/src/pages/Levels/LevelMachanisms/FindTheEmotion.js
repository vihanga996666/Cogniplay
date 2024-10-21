import React, { useState, useEffect } from 'react';
import '../LevelStyles/SelectTheOddOne.css'; // Assuming you have a CSS file for styling
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import Happy from './Resources/Happy'; // Import the Happy component
import Sad from './Resources/Sad'; // Import the Sad component
import Wow from './Resources/Wow'; // Import the Wow component

const FindTheEmotion = () => {
  const [objects, setObjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize objects
    const initialObjects = [
      { id: 1, type: 'happy' },
      { id: 2, type: 'wow' },
      { id: 3, type: 'sad' } // The odd one out
    ].sort(() => Math.random() - 0.5); // Shuffle objects

    setObjects(initialObjects);
  }, []);

  useEffect(() => {
    if (selected !== null) {
      const sadId = 3; // The ID of the sad object
      if (selected === sadId) {
        setScore(prevScore => prevScore + 10);
        setFeedback('Correct! Well done.');
        setGameFinished(true);
      } else {
        setScore(prevScore => prevScore - 3);
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
      'scores.level6': score,
    });

    navigate('/level7');
  };

  return (
    <div className="findtheemotion">
      <h1 className='QL6'>Find the Sad One</h1>
      <div className="objectsgridcontainerc">
        <div className="objectscontainerc">
          {objects.map((obj) => (
            <div
              key={obj.id}
              className={`objectc ${selected === obj.id ? 'selected' : ''}`}
              onClick={() => handleSelect(obj.id)}
            >
              {obj.type === 'happy' ? <Happy /> : obj.type === 'sad' ? <Sad /> : <Wow />}
            </div>
          ))}
        </div>
      </div>
      {feedback && (
        <div className={`feedbackc ${feedback.startsWith('Incorrect') ? 'error' : 'success'}`}>
          {feedback}
        </div>
      )}
      {gameFinished && (
        <div className="modal">
          <div className="modal-content">
          <h2>Congratulations!</h2>
            <p>You've completed Level 6</p>
            <button onClick={handlePlayNextLevel}>Play Next Level</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindTheEmotion;
