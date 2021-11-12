import React from 'react';
import styled from 'styled-components/macro';
import Article from './Article';

interface ArticleListProps {
  articles: Article[];
}

const ArticleList = function ({ articles }: ArticleListProps): JSX.Element {
  return (
    <ArticleListContainer>
      {articles.map(article => (
        <Article key={article._id} article={article} />
      ))}
    </ArticleListContainer>
  );
};

const ArticleListContainer = styled.section`
  width: 85vw;
  max-width: 38rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default ArticleList;
