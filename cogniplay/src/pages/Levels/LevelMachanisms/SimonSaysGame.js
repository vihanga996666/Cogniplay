import React, { useState, useEffect } from 'react';
import '../LevelStyles/SimonSaysGame.css';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';

const colors = ['red', 'green', 'blue', 'yellow'];

const SimonSaysGame = () => {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1); // Start with -1 to ensure initial step is handled
  const [showSequence, setShowSequence] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showCross, setShowCross] = useState(false);
  const [showTick, setShowTick] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    startNewRound();
  }, []);

  useEffect(() => {
    console.log("Sequence: ", sequence);
    console.log("User Sequence: ", userSequence);

    if (userSequence && sequence && userSequence.length === sequence.length && isPlayerTurn) {
      if (JSON.stringify(userSequence) === JSON.stringify(sequence)) {
        if (sequence.length === 5) {
          setShowTick(true);
          setTimeout(() => {
            setShowTick(false);
            handleFinishGame();
          }, 1000);
        } else {
          setShowTick(true);
          setTimeout(() => {
            setShowTick(false);
            startNewRound();
          }, 1000);
        }
      } else {
        setWrongAttempts(wrongAttempts + 1);
        setShowCross(true);
        setTimeout(() => {
          setShowCross(false);
          setUserSequence([]);
          setIsPlayerTurn(false);
          showFullSequence(sequence); // Pass the correct sequence here
        }, 1000);
      }
    }
  }, [userSequence]);

  const startNewRound = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    const newSequence = [...sequence, newColor];
    setSequence(newSequence);
    setUserSequence([]);
    setIsPlayerTurn(false);
    showFullSequence(newSequence);
  };

  const showFullSequence = (newSequence) => {
    setShowSequence(true);
    let index = 0;
    const interval = setInterval(() => {
      setCurrentStep(index);
      if (index === newSequence.length) {
        clearInterval(interval);
        setShowSequence(false);
        setIsPlayerTurn(true);
        setCurrentStep(-1);
      } else {
        index++;
      }
    }, 1000);
  };

  const handleColorClick = (color) => {
    if (isPlayerTurn) {
      setUserSequence([...userSequence, color]);
    }
  };

  const calculateScore = () => {
    if (wrongAttempts <= 3) {
      return 10;
    } else {
      return Math.max(1, 10 - (wrongAttempts - 3));
    }
  };

  const handleFinishGame = async () => {
    const score = calculateScore();
    const userId = auth.currentUser.uid;
    const activeSubAccount = JSON.parse(sessionStorage.getItem('activeSubAccount'));
    const accountRef = doc(db, 'users', userId, 'subAccounts', activeSubAccount.id);

    await updateDoc(accountRef, {
      'scores.level4': score,
    });

    setGameFinished(true);
  };

  return (
    <div className="simonsaysgame">
      <h1>Remember the Pattern</h1>
      <div className="displaybox">
        {showCross ? (
          <div className="cross">✖</div>
        ) : showTick ? (
          <div className="tick">✔</div>
        ) : (
          <div className={`colordisplay ${showSequence ? sequence[currentStep] : ''}`}></div>
        )}
      </div>
      <div className="usersequence">
        {userSequence.map((color, index) => (
          <div key={index} className={`colorbox ${color}`}></div>
        ))}
      </div>
      <div className="controls">
        {colors.map((color) => (
          <button
            key={color}
            className={`colorbutton ${color}`}
            onClick={() => handleColorClick(color)}
            disabled={!isPlayerTurn}
          >
          </button>
        ))}
      </div>
      {gameFinished && (
        <div className="modal">
          <div className="modal-content">
          <h2>Congratulations!</h2>
            <p>You've completed Level 4</p>
            <button onClick={() => navigate('/level5')}>Proceed to Next Level</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimonSaysGame;
