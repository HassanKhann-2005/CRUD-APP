import React from 'react';

const RadioButton = ({ name = 'gender', options = ['Male', 'Female'], defaultValue = 'Male' }) => {
  return (
    <div className="flex space-x-4">
      {options.map((option) => (
        <label key={option} className="inline-flex items-center">
          <input
            type="radio"
            name={name}
            value={option.toLowerCase()}
            defaultChecked={option === defaultValue}
            className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300"
            required
          />
          <span className="ml-2 text-sm text-gray-700">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioButton;