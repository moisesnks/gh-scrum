import React, { useState } from 'react';

const Search = ({ onSearchChange }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        const newTerm = event.target.value;
        setSearchTerm(newTerm);
        onSearchChange(newTerm.toLowerCase());
    };

    return (
        <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleInputChange}
            className='search-input'
        />
    );
};

export default Search;
