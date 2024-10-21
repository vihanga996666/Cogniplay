// src/pages/Level1.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';  // Correct path to firebase.js
import { doc, updateDoc } from 'firebase/firestore';
import PlayButton from './PlayButton';

const Level8 = () => {
    const navigate = useNavigate();
  
    const handleCompleteLevel = async () => {
      const userId = auth.currentUser.uid;
      const activeSubAccount = JSON.parse(sessionStorage.getItem('activeSubAccount'));
      const subAccountRef = doc(db, 'users', userId, 'subAccounts', activeSubAccount.id);
  
      await updateDoc(subAccountRef, {
        'scores.level8': 100, // example score
        currentLevel: 9 // navigate to Level 3 after completing Level 2
      });
  
      navigate('/level9');
    };
  
    return (
      <div>
        <h1>Coming Soon</h1>
        <p></p>
        <PlayButton onClick={handleCompleteLevel} />
      </div>
    );
  };
  
  export default Level8;