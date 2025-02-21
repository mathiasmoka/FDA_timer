import React, { useState } from 'react';
import Button from './ui/button.js';
import './SetupScreen.css';

const roles = [
  "Prime Minister",
  "First Snppeaker",
  "Second Speaker",
  "Third Speaker",
  "Whip"
];

export default function SetupScreen({ onSetupComplete }) {
  const [debateTitle, setDebateTitle] = useState('');
  const [government, setGovernment] = useState(Array(5).fill(''));
  const [opposition, setOpposition] = useState(Array(5).fill(''));

  const handleInputChange = (index, value, currentArray, setFunction) => {
    const newValues = [...currentArray];
    newValues[index] = value;
    setFunction(newValues);
  };

  const handleSubmit = () => {
    onSetupComplete({ debateTitle, government, opposition });
  };

  return (
    <div className="setup-container">
      <div className="title-input">
        <label>Debate Title</label>
        <input
          type="text"
          value={debateTitle}
          onChange={(e) => setDebateTitle(e.target.value)}
        />
      </div>
      <div className="columns-container">
        <div className="column">
          <h2>Government</h2>
          {roles.map((role, index) => (
            <div key={index} className="input-group">
              <label>{role}</label>
              <input
                type="text"
                value={government[index]}
                onChange={(e) => handleInputChange(index, e.target.value, government, setGovernment)}
              />
            </div>
          ))}
        </div>
        <div className="column">
          <h2>Opposition</h2>
          {roles.map((role, index) => (
            <div key={index} className="input-group">
              <label>{role}</label>
              <input
                type="text"
                value={opposition[index]}
                onChange={(e) => handleInputChange(index, e.target.value, opposition, setOpposition)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="button-container">
        <Button className="button button-start" onClick={handleSubmit}>
          Start Debate
        </Button>
      </div>
    </div>
  );
}