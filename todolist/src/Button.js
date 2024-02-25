import React from 'react';
import './index.css';

const Button = ({ onClick, type, label }) => {
  return (
    <button onClick={onClick} type={type}>
      {label}
    </button>
  );
};

export default Button;
