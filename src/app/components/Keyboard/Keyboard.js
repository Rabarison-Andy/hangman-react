'use client';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Keyboard.css';

const Keyboard = ({ onLetterClick, languageKey, clickable }) => {
  const [selectedLetters, setSelectedLetters] = useState([]);

  useEffect(() => {
    setSelectedLetters([]);
  }, [languageKey]);

  const handleLetterClick = (letter) => {
    if (clickable && !selectedLetters.includes(letter)) {
      onLetterClick(letter);
      setSelectedLetters([...selectedLetters, letter]);
    }
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-';

  return (
    <div className="keyboard-container">
      {alphabet.split('').map((letter, index) => (
        <button
          key={index}
          className="keyboard-button"
          onClick={() => handleLetterClick(letter)}
          disabled={!clickable || selectedLetters.includes(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

Keyboard.propTypes = {
  onLetterClick: PropTypes.func.isRequired,
  languageKey: PropTypes.string.isRequired,
  clickable: PropTypes.bool.isRequired,
};

export default Keyboard;