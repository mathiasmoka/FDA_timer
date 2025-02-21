import React from 'react';

const Select = ({ options, onChange, className }) => {
  return (
    <select onChange={onChange} className={className}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;