import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Spin, Empty } from 'antd';
import ArticleList from '../components/ArticleList';
import SearchBar from '../components/SearchBar';
import useFetch from '../hooks/useFetch';

const SearchPage = function (): JSX.Element {
  const [term, setTerm] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [renderData, setRenderData] = useState<Article[]>([]);
  const [fetchedData, loading, error] = useFetch({
    method: 'get',
    path: '/articlesearch.json',
    query: term,
  });

  useEffect(() => {
    if (fetchedData) {
      setNoResults(fetchedData.response.docs.length === 0);
      setRenderData(fetchedData.response.docs);
    }
  }, [fetchedData]);

  useEffect(() => {
    if (term === '') {
      setRenderData([]);
    }
  }, [term]);

  return (
    <Container>
      <section>
        <h1>SEARCH TIMES</h1>
        <div>
          <SearchBar term={term} setTerm={setTerm} />
        </div>
      </section>
      <ResultArea>
        {loading ? (
          <Spin size="large" style={{ marginTop: '5vh' }} />
        ) : noResults || error ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              error
                ? `${error}, Please try later`
                : 'No Articles, Try other keywords'
            }
          />
        ) : (
          <ArticleList articles={renderData} />
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
