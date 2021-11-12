import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Spin, Empty } from 'antd';
import ArticleList from '../components/ArticleList';
import SearchBar from '../components/SearchBar';
import API from '../api';

const SearchPage = function (): JSX.Element {
  const [articles, setArticles] = useState<Article[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSearchSubmit = async (term: string) => {
    setLoading(true);
    const { data } = await API.searchArticles(term.toLowerCase());
    setNoResults(data.response.docs.length === 0);
    setArticles(data.response.docs);
    setLoading(false);
  };

  const clearResults = () => setArticles([]);

  return (
    <Container>
      <section>
        <h1>SEARCH NY-TIMES</h1>
        <div>
          <SearchBar
            onSearchSubmit={onSearchSubmit}
            clearResults={clearResults}
          />
        </div>
      </section>
      <section>
        {loading ? (
          <Spin size="large" />
        ) : noResults ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
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
