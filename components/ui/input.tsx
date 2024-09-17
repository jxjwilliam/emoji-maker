import React from 'react';

const Input = ({ value, onChange }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            className="border rounded p-2"
            placeholder="Enter your emoji prompt"
        />
    );
};

export default Input;
