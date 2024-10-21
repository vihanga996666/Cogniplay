// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import SelectSubAccountModal from '../components/SelectSubAccountModal';
import BackgroundHome from './BackgroundHome';
import './Home.css';

const Home = () => {
  const [activeSubAccount, setActiveSubAccount] = useState(null);
  const [subAccountData, setSubAccountData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const activeSubAccount = JSON.parse(sessionStorage.getItem('activeSubAccount'));
    setActiveSubAccount(activeSubAccount);

    if (activeSubAccount) {
      const fetchSubAccountData = async () => {
        const userId = auth.currentUser.uid;
        const subAccountRef = doc(db, 'users', userId, 'subAccounts', activeSubAccount.id);
        const subAccountDoc = await getDoc(subAccountRef);
        if (subAccountDoc.exists()) {
          setSubAccountData(subAccountDoc.data());
        }
      };
      fetchSubAccountData();
    } else {
      setShowModal(true);
    }
  }, []);

  const handleStartGame = () => {
    if (subAccountData) {
      const scores = subAccountData.scores || {};
      for (let i = 1; i <= 20; i++) {
        const levelKey = `level${i}`;
        if (scores[levelKey] === 0) {
          navigate(`/level${i}`);
          return;
        }
      }
      navigate('/level1'); // If all levels have scores, restart from level 1
    } else {
      navigate('/level1');
    }
  };

  const handleSelectSubAccount = (subAccount) => {
    sessionStorage.setItem('activeSubAccount', JSON.stringify(subAccount));
    setActiveSubAccount(subAccount);
    setShowModal(false);
  };

  return (
    <div className='Home'>
      
     
      
      <p className='WelcomePlayer'>Welcome, {activeSubAccount ? activeSubAccount.name : 'Guest'}!</p>
      <button className='StartBtn' onClick={handleStartGame}>Start Game</button>
      {showModal && <SelectSubAccountModal onClose={() => setShowModal(false)} onSelect={handleSelectSubAccount} />}
<BackgroundHome/>
    </div>
  );
};

export default Home;
