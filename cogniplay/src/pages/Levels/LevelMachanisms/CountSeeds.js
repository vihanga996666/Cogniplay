import React, { useState } from 'react';
import '../LevelStyles/CountSeeds.css'; // Assuming you have a CSS file for styling
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import '../LevelStyles/Modal.css';

const CountSeeds = () => {
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(10); // Starting score is 10
  const [gameFinished, setGameFinished] = useState(false);
  const navigate = useNavigate();

  const correctAnswer = 9; // Adjusted for Level 2

  const handleAnswerClick = async (answer) => {
    if (answer === correctAnswer) {
      setFeedback('Correct! Well done.');
      setGameFinished(true);
    } else {
      setFeedback('Incorrect! Try again.');
      setScore(prevScore => Math.max(prevScore - 3, 0)); // Deduct 2 points, but do not go below 0
    }
  };

  const handlePlayNextLevel = async () => {
    const userId = auth.currentUser.uid;
    const activeSubAccount = JSON.parse(sessionStorage.getItem('activeSubAccount'));
    const accountRef = doc(db, 'users', userId, 'subAccounts', activeSubAccount.id);

    await updateDoc(accountRef, {
      'scores.level2': score, // Save the score for Level 2
    });

    navigate('/level3'); // Navigate to the next level, Level 3
  };
  return (
    <div className="CountSeedGame">
      <h1 className='QL2'>Count Seeds and Select the Correct answer</h1>
      <div className="rotating-svg">
        <svg className='rotating' width="550" height="550" viewBox="0 0 550 550" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="275" cy="275" r="275" fill="#4DAE6B"/>
          <circle cx="275" cy="275" r="250" fill="#F8F0DD"/>
          <circle cx="276" cy="275" r="225" fill="#EC4B43"/>
          <path d="M252.234 143.16C252.46 148.793 244.642 150.435 242.584 145.186L228.925 110.36C227.796 107.48 229.526 104.276 232.553 103.641L244.712 101.088C247.739 100.453 250.611 102.69 250.735 105.781L252.234 143.16Z" fill="#682A2A"/>
          <path d="M140.282 267.408C145.76 268.741 145.186 276.709 139.573 277.243L102.332 280.788C99.2532 281.081 96.6493 278.536 96.8716 275.451L97.7646 263.059C97.987 259.974 100.929 257.829 103.934 258.56L140.282 267.408Z" fill="#682A2A"/>
          <path d="M211.695 374.401C215.366 370.122 222.208 374.246 220.141 379.491L206.423 414.294C205.288 417.171 201.84 418.339 199.19 416.743L188.549 410.331C185.9 408.734 185.321 405.139 187.335 402.792L211.695 374.401Z" fill="#682A2A"/>
          <path d="M359.154 352.57C355.453 348.317 360.524 342.145 365.414 344.951L397.861 363.57C400.544 365.109 401.199 368.691 399.236 371.081L391.349 380.68C389.385 383.07 385.744 383.122 383.714 380.788L359.154 352.57Z" fill="#682A2A"/>
          <path d="M366.864 275.337C361.557 274.17 361.659 266.569 366.994 265.543L396.141 259.942C399.252 259.344 402.127 261.752 402.085 264.919L401.925 276.896C401.883 280.063 398.944 282.393 395.851 281.713L366.864 275.337Z" fill="#682A2A"/>
          <path d="M280.371 338.02C280.725 332.717 288.011 331.554 289.998 336.483L299.81 360.825C301.01 363.803 299.132 367.125 295.961 367.631L284.404 369.477C281.233 369.983 278.413 367.411 278.627 364.207L280.371 338.02Z" fill="#682A2A"/>
          <path d="M212.932 308.107C217.784 305.938 222.221 311.834 218.795 315.896L201.873 335.957C199.802 338.412 195.988 338.306 194.056 335.74L187.018 326.39C185.087 323.824 186.04 320.129 188.972 318.818L212.932 308.107Z" fill="#682A2A"/>
          <path d="M225.48 230.936C228.066 235.487 222.808 240.449 218.415 237.604L198.062 224.422C195.341 222.659 194.991 218.813 197.349 216.589L205.721 208.688C208.078 206.463 211.898 207.036 213.499 209.854L225.48 230.936Z" fill="#682A2A"/>
          <path d="M394.819 203.446C389.766 205.946 385.083 199.474 389.039 195.456L415.285 168.8C417.455 166.596 421.086 166.872 422.899 169.378L430.181 179.444C431.994 181.95 431.12 185.484 428.348 186.856L394.819 203.446Z" fill="#682A2A"/>
        </svg>
      </div>
      <div className="answerbuttonz">
        <button className='BtnL2' onClick={() => handleAnswerClick(8)}>8</button>
        <button className='BtnL2' onClick={() => handleAnswerClick(9)}>9</button>
        <button className='BtnL2' onClick={() => handleAnswerClick(10)}>10</button>
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
            <p>You've completed Level 2.</p>
            <button onClick={handlePlayNextLevel}>Play Next Level</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountSeeds;