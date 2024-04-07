'use client';
import React from 'react';

const Lose = ({ word, errors }) => {
  return (
    <div>
      <h2>Vous avez perdu !</h2>
      <p>Mot à deviner : {word}</p>
      <p>Nombre d'erreurs : {errors}</p>
    </div>
  );
};

export default Lose;