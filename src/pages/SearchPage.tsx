import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components/macro';
import { Spin, Empty } from 'antd';
import ArticleList from '../components/ArticleList';
import SearchBar from '../components/SearchBar';
import useFetch from '../hooks/useFetch';
import { HeadlineStyle, FlexCenterColumn } from '../styles/commonStyles';

const SearchPage = function (): JSX.Element {
  const [term, setTerm] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [renderData, setRenderData] = useState<Article[]>([]);
  const [fetchedData, loading, error] = useFetch<ArticleSearchResponse>({
    method: 'get',
    path: 'search/v2/articlesearch.json',
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
      setNoResults(false);
    }
  }, [term]);

  return (
    <Container isCenter={renderData.length === 0 && noResults === false}>
      <section>
        <h1>SEARCH TIMES</h1>
        <div>
          <SearchBar term={term} setTerm={setTerm} />
        </div>
      </section>
      <section>
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
      </section>
    </Container>
  );
};

const Container = styled.section<{ isCenter: boolean }>`
  ${FlexCenterColumn}
  gap: 1rem;

  h1 {
    ${HeadlineStyle}
  }

  section:nth-child(1) {
    margin-top: 0;
    transition: margin-top 0.3s ease-in-out;
  }

  ${({ isCenter }) =>
    isCenter &&
    css`
      section:nth-child(1) {
        margin-top: 20vh;
        transition: margin-top 0.3s ease-in-out;
      }
    `}
`;

export default SearchPage;
