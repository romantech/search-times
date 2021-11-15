import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { checkTerms } from '../utils';

interface SearchBarProps {
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const { Search } = Input;

const SearchBar = function ({
  term,
  setTerm,
  setCurrentPage,
}: SearchBarProps): JSX.Element {
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    setTyping(true);
    const isChanged = checkTerms(term, debouncedTerm);
    if (isChanged) {
      const timer = setTimeout(() => {
        setTerm(debouncedTerm);
        setCurrentPage(0);
      }, 500);
      return () => clearTimeout(timer);
    }
    setTyping(false);
    return undefined; // fix consistent-return linter error
  }, [debouncedTerm, setCurrentPage, setTerm, term]);

  return (
    <Search
      onChange={({ target }) => setDebouncedTerm(target.value)}
      type="text"
      value={debouncedTerm}
      loading={typing}
      placeholder="Input keywords"
      maxLength={100}
      size="large"
      style={{ width: '85vw', maxWidth: '38rem' }}
    />
  );
};

export default SearchBar;
