'use client';
import React from 'react';
import PropTypes from 'prop-types';

const BadLetters = ({ badLetters }) => {
    return (
        <div className="bad-letters">
        <h2>Mauvaises lettres</h2>
        <ul>
            {badLetters.map((letter, index) => (
            <li key={index}>{letter}</li>
            ))}
        </ul>
        </div>
    );
};

BadLetters.propTypes = {
    badLetters: PropTypes.array.isRequired
};

export default BadLetters;
