import React, { useState } from 'react';
import styled from 'styled-components/macro';
import ArticleList from '../components/ArticleList';
import SearchBar from '../components/SearchBar';
import API from '../api';

const SearchPage = function (): JSX.Element {
  const [articles, setArticles] = useState<Article[]>([]);
  const [noResults, setNoResults] = useState(false);

  const onSearchSubmit = async (term: string) => {
    const { data } = await API.searchArticles(term.toLowerCase());
    setNoResults(data.response.docs.length === 0);
    setArticles(data.response.docs);
  };

  const clearResults = () => setArticles([]);

  return (
    <Container>
      <h1>SEARCH NY-TIMES</h1>
      <section>
        <SearchBar
          onSearchSubmit={onSearchSubmit}
          clearResults={clearResults}
        />
      </section>
      <section>
        {noResults ? (
          <h3 className="no-results">No results found.</h3>
        ) : (
          <ArticleList articles={articles} />
        )}
      </section>
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export default SearchPage;
