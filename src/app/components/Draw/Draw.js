import React from 'react';

const Draw = ({ badLetters }) => {
  const totalDrawParts = 9;
  const wrongAttempts = badLetters.length;

  const drawParts = [
    `
    |
    |
    |
    |
    |
  ==============
    `,
    `
     _________
    |
    |
    |
    |
    |
  ==============
    `,
    `
     _________
    |         |
    |
    |
    |
    |
  ==============
    `,
    `
     _________
    |         |
    |         O
    |
    |
    |
  ==============
    `,
    `
     _________
    |         |
    |         O
    |         |
    |
    |
  ==============
    `,
    `
     _________
    |         |
    |         O
    |        /|
    |
    |
  ==============
    `,
    `
     _________
    |         |
    |         O
    |        /|\\
    |
    |
  ==============
    `,
    `
     _________
    |         |
    |         O
    |        /|\\
    |        /
    |
  ==============
    `,
    `
     _________
    |         |
    |         O
    |        /|\\
    |        / \\
    |
  ==============
    `
  ];

  const renderDrawPart = () => {
    if (wrongAttempts > 0 && wrongAttempts <= totalDrawParts) {
      return <pre>{drawParts[wrongAttempts - 1]}</pre>;
    } else {
      return null;
    }
  };

  return (
    <div>
      {renderDrawPart()}
    </div>
  );
};

export default Draw;
