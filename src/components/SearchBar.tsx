import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { checkIsTermChanged } from '../utils';

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
    let timer: NodeJS.Timeout;
    const isChanged = checkIsTermChanged(term, debouncedTerm);
    if (isChanged) {
      timer = setTimeout(() => {
        setTerm(debouncedTerm);
        setCurrentPage(0);
        setTyping(false);
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [debouncedTerm, setCurrentPage, setTerm, term]);

  return (
    <Search
      onChange={({ target }) => {
        setTyping(true);
        setDebouncedTerm(target.value);
      }}
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
