// src/pages/Finished.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoundDiv from '../../components/NavBar';

const Finished = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <div>
      <RoundDiv/>
      <h1>Congratulations!</h1>
      <p>You have completed all the levels!</p>
      <button onClick={handleBackToHome}>Back to Home</button>
    </div>
  );
};

export default Finished;
