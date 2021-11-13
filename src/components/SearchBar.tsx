import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { checkTerms } from '../utils';

interface SearchBarProps {
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = function ({ term, setTerm }: SearchBarProps): JSX.Element {
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const isChanged = checkTerms(term, debouncedTerm);
    if (isChanged) {
      const timer = setTimeout(() => setTerm(debouncedTerm), 500);
      return () => clearTimeout(timer);
    }
  }, [debouncedTerm, setTerm, term]);

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
