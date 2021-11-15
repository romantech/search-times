import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components/macro';
import { Spin, Empty, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import ArticleList from '../components/ArticleList';
import SearchBar from '../components/SearchBar';
import useFetch from '../hooks/useFetch';
import useScroll from '../hooks/useScroll';
import { HeadlineStyle, FlexCenterColumn } from '../styles/commonStyles';

interface StyledProps {
  isCenter: boolean;
  width: number;
}

const SearchPage = function ({ width }: { width: number }): JSX.Element {
  const [term, setTerm] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [renderData, setRenderData] = useState<Article[]>([]);
  const [fetchedData, loading, error] = useFetch<ArticleSearchResponse>({
    method: 'get',
    path: 'search/v2/articlesearch.json',
    query: term,
    page: currentPage,
  });
  const isBottom = useScroll();

  useEffect(() => {
    if (fetchedData !== null) {
      setNoResults(fetchedData.response.docs.length === 0);
      const { offset } = fetchedData.response.meta;
      setRenderData(prev =>
        offset === 0
          ? fetchedData.response.docs
          : [...prev, ...fetchedData.response.docs],
      );
    }
  }, [fetchedData]);

  useEffect(() => {
    if (term === '') {
      setRenderData([]);
      setNoResults(false);
    }
  }, [term]);

  const isLast = renderData.length === fetchedData?.response.meta.hits;
  const emptyMsg =
    error !== null
      ? `${error.statusText}, Please try later`
      : `No Articles, Try other keywords`;

  return (
    <Container isCenter={term === ''} width={width}>
      <section>
        <h1>SEARCH TIMES</h1>
        <div>
          <SearchBar
            term={term}
            setTerm={setTerm}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </section>
      <section>
        {loading && !isBottom ? (
          <Spin size="large" style={{ marginTop: '5vh' }} />
        ) : noResults || error ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={emptyMsg} />
        ) : (
          <ArticleList articles={renderData} />
        )}
      </section>
      {isBottom && !isLast && (
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          loading={loading}
          style={{ marginBottom: '1rem' }}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          LOAD MORE
        </Button>
      )}
    </Container>
  );
};

const Container = styled.section<StyledProps>`
  ${FlexCenterColumn}
  gap: 1rem;

  h1 {
    ${HeadlineStyle}
  }

  section:nth-child(1) {
    margin-top: 0;
    transition: margin-top 0.3s ease-in-out;
  }

  ${({ isCenter, width }) =>
    isCenter &&
    css`
      section:nth-child(1) {
        margin-top: ${width > 768 ? '18vh' : '10vh'};
        transition: margin-top 0.3s ease-in-out;
      }
    `}
`;

export default SearchPage;
