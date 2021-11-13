import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';

interface SearchBarProps {
  onSearchSubmit: (term: string) => void;
  clearResults: () => void;
}

const SearchBar = function ({
  onSearchSubmit,
  clearResults,
}: SearchBarProps): JSX.Element {
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  useEffect(() => {
    const timer = setTimeout(() => setTerm(debouncedTerm), 500);
    return () => clearTimeout(timer);
  }, [debouncedTerm]);

  useEffect(() => {
    if (term !== '') {
      onSearchSubmit(term);
    } else {
      clearResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  return (
    <Input
      onChange={({ target }) => setDebouncedTerm(target.value)}
      type="text"
      value={debouncedTerm}
      placeholder="Input keywords"
      maxLength={100}
    />
  );
};

const Input = styled.input`
  width: 85vw;
  height: 20vh;
  max-height: 3.5rem;
  max-width: 38rem;
  padding: 1rem;
`;

export default SearchBar;
