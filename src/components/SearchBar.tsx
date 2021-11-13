import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { checkTerms } from '../utils';

interface SearchBarProps {
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
}

const { Search } = Input;

const SearchBar = function ({ term, setTerm }: SearchBarProps): JSX.Element {
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [typing, setTyping] = useState(false);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    setTyping(true);
    const isChanged = checkTerms(term, debouncedTerm);
    if (isChanged) {
      const timer = setTimeout(() => setTerm(debouncedTerm), 500);
      return () => clearTimeout(timer);
    }
    setTyping(false);
  }, [debouncedTerm, setTerm, term]);

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
