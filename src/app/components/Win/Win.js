'use client';
import React from 'react';
import PropTypes from 'prop-types';

const Win = ({ word, errors }) => {
  return (
    <div>
      <h2>Vous avez gagné !</h2>
      <p>Mot deviné : {word}</p>
      <p>Nombre d'erreurs : {errors === 0 ? 'Score parfait' : errors}</p>
    </div>
  );
};

Win.propTypes = {
  word: PropTypes.string.isRequired,
  errors: PropTypes.number.isRequired,
};

export default Win;