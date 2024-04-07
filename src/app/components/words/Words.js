'use client';
import React, { useState, useEffect } from 'react';
import Keyboard from "../Keyboard/Keyboard";
import BadLetters from '../BadLetters/BadLetters';
import Draw from '../Draw/Draw';
import Win from '../Win/Win';
import Lose from '../Lose/Lose';
import './Words.css';

const Words = () => {
  const [word, setWord] = useState('');
  const [language, setLanguage] = useState('');
  const [lettersGuessed, setLettersGuessed] = useState([]);
  const [badLetters, setBadLetters] = useState([]);
  const [wordKey, setWordKey] = useState('');
  const [clickable, setClickable] = useState(true);
  const [showWinPopup, setShowWinPopup] = useState(false);
  const [showLosePopup, setShowLosePopup] = useState(false); // Ajoutez un état pour afficher le popup de perte

  useEffect(() => {
    fetchWord('en-GB');
  }, []);

  const fetchWord = (locale) => {
    setLettersGuessed([]);
    setBadLetters([]);
    setClickable(true);
    setShowWinPopup(false);
    setShowLosePopup(false);
    fetch('https://node-hangman-api-production.up.railway.app/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ locale }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du mot');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.word) {
          setWord(data.word.toLowerCase());
          //console.log(`Mot récupéré : ${data.word.toLowerCase()}`);
          setLanguage(locale === 'fr-FR' ? 'français' : 'anglais');
          setWordKey(Math.random().toString(36).substring(7));
        } else {
          throw new Error('Le mot récupéré est invalide');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du mot :', error);
      });
  };

  const handleLetterClick = (letter) => {
    letter = letter.toLowerCase();
    if (!lettersGuessed.includes(letter)) {
      setLettersGuessed(prevLettersGuessed => [...prevLettersGuessed, letter]);
      if (word.includes(letter)) {
        const occurrences = word.split(letter).length - 1;
        //console.log(`La lettre ${letter} se trouve ${occurrences} fois dans le mot.`);
      } else {
        //console.log(`La lettre ${letter} n'est pas dans le mot.`);
        setBadLetters([...badLetters, letter]);
      }
      if (badLetters.length >= 8) {
        setClickable(false);
        setShowLosePopup(true);
      }
    }
  };

  const handleResetHangman = () => {
    fetchWord(language === 'français' ? 'fr-FR' : 'en-GB');
  }

  const handleChangeLanguage = (locale, event) => {
    event.preventDefault();
    setLettersGuessed([]);
    setClickable(true);
    setShowWinPopup(false);
    setShowLosePopup(false);
    fetchWord(locale);
  };

  const maskedWord = word.split('').map(letter => lettersGuessed.includes(letter) ? letter : '-').join('');

  return (
    <div>
      <h1>Jeu du Pendu</h1>
      {showWinPopup && (
        <div className='win-popup'>
          <Win word={word} errors={badLetters.length} />
          <button onClick={handleResetHangman}>Rejouer</button>
        </div>
      )}
      {showLosePopup && (
        <div className='lose-popup'>
          <Lose word={word} errors={badLetters.length} />
          <button onClick={handleResetHangman}>Rejouer</button>
        </div>
      )}
      {clickable ? (
        <div>
          <div className='word-length'>
          <p>{maskedWord}</p>
          <p>Origine du mot : {language}</p>
          </div>
          <div className="language-buttons">
            <button onClick={(event) => handleChangeLanguage('fr-FR', event)}>Français</button>
            <button onClick={(event) => handleChangeLanguage('en-GB', event)}>Anglais</button>
          </div>
          <Keyboard key={language} onLetterClick={handleLetterClick} languageKey={wordKey} clickable={clickable}/>
          <BadLetters badLetters={badLetters} />
          <div className='hangman-draw'>
          <Draw badLetters={badLetters} />
          </div>
        </div>
      ) : null}
      </div>
    );
  };

export default Words;