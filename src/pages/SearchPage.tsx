import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Spin, Empty } from 'antd';
import ArticleList from '../components/ArticleList';
import SearchBar from '../components/SearchBar';
import useFetch from '../hooks/useFetch';

const SearchPage = function (): JSX.Element {
  const [articles, setArticles] = useState<Article[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [request, fetchedData, loading, error] = useFetch({
    method: 'get',
    url: '',
  });

  useEffect(() => {
    if (fetchedData) {
      setNoResults(fetchedData.response.docs.length === 0);
      setArticles(fetchedData.response.docs);
    }
  }, [fetchedData]);

  const onSearchSubmit = (term: string) => {
    request(`/articlesearch.json?q=${term}`);
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
      <ResultArea>
        {loading ? (
          <Spin size="large" />
        ) : noResults || error ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              error
                ? 'Too many request, Please try later'
                : 'No Articles, Try other keywords'
            }
          />
        ) : (
          <ArticleList articles={articles} />
        )}
      </ResultArea>
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

const ResultArea = styled.section``;

export default SearchPage;
