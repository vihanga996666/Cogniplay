import React, { useState, useEffect } from 'react';
import '../LevelStyles/CardFlipGame.css';
import '../LevelStyles/Modal.css';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';

// Import the components
import Apple from './Resources/Apple';
import Pineapple from './Resources/Pineapple';
import Grapes from './Resources/Grapes';
import Lemon from './Resources/Lemon';
import Guava from './Resources/Guava';
import Dragonfruit from './Resources/Dragonfruit';

const CardFlipGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  // Use the imported components in the card array
  const cardComponents = [
    <Apple />, <Pineapple />, <Grapes />, <Lemon />, <Guava />, <Dragonfruit />,
    <Apple />, <Pineapple />, <Grapes />, <Lemon />, <Guava />, <Dragonfruit />,
  ];

  useEffect(() => {
    // Shuffle cards
    const shuffledCards = [...cardComponents]
      .sort(() => 0.5 - Math.random())
      .map((Component, index) => ({ id: index, Component, flipped: true, matched: false })); // Initially set flipped to true
    setCards(shuffledCards);

    // Reveal cards for 10 seconds
    const revealTimeout = setTimeout(() => {
      setCards(shuffledCards.map(card => ({ ...card, flipped: false })));
    }, 10000);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    // Cleanup timeouts and intervals on component unmount
    return () => {
      clearTimeout(revealTimeout);
      clearInterval(countdownInterval);
    };
  }, []);

  useEffect(() => {
    if (matchedPairs === cardComponents.length / 2) {
      setGameFinished(true);
    }
  }, [matchedPairs]);

  const handleCardClick = (card) => {
    if (flippedCards.length < 2 && !card.flipped && !card.matched) {
      const newCards = cards.map(c => c.id === card.id ? { ...c, flipped: true } : c);
      setCards(newCards);
      setFlippedCards([...flippedCards, card]);

      if (flippedCards.length === 1) {
        const firstCard = flippedCards[0];
        const secondCard = card;

        if (firstCard.Component.type === secondCard.Component.type) {
          setMatchedPairs(matchedPairs + 1);
          setCards(prevCards =>
            prevCards.map(c =>
              c.Component.type === card.Component.type ? { ...c, matched: true } : c
            )
          );
          setFlippedCards([]);
        } else {
          setWrongAttempts(wrongAttempts + 1);
          setTimeout(() => {
            setCards(prevCards =>
              prevCards.map(c =>
                c.id === firstCard.id || c.id === secondCard.id ? { ...c, flipped: false } : c
              )
            );
            setFlippedCards([]);
          }, 1000);
        }
      }
    }
  };

  const calculateScore = () => {
    if (wrongAttempts <= 3) {
      return 10;
    } else {
      return Math.max(1, 10 - (wrongAttempts - 3));
    }
  };

  const handlePlayNextLevel = async () => {
    const score = calculateScore();
    const userId = auth.currentUser.uid;
    const activeSubAccount = JSON.parse(sessionStorage.getItem('activeSubAccount'));
    const accountRef = doc(db, 'users', userId, 'subAccounts', activeSubAccount.id);

    await updateDoc(accountRef, {
      'scores.level1': score,
    });

    navigate('/level2');
  };

  return (
    <div className="cardflipgame">
      <h1>Find the Matching Pairs</h1>
      {countdown > 0 && (
        <div className="countdown">{countdown}</div>
      )}
      <div className="cardscontainer1">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card1 ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
            onClick={() => handleCardClick(card)}
          >
            <div className="cardinner1">
              <div className="cardfront1">?</div>
              <div className="cardback1">{card.Component}</div>
            </div>
          </div>
        ))}
      </div>
      {gameFinished && (
        <div className="modal">
          <div className="modal-content">
            <h2>Congratulations!</h2>
            <p>You've completed Level 1</p>
            <button onClick={handlePlayNextLevel}>Play Next Level</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardFlipGame;
