import React from 'react';
import styled from 'styled-components/macro';
import Article from './Article';

interface ArticleListProps {
  articles: Article[];
}

const ArticleList = function ({ articles }: ArticleListProps): JSX.Element {
  return (
    <ArticleListContainer>
      {articles.map(article => {
        const domain = 'https://nytimes.com/';
        const hasImage = article.multimedia[0] !== undefined;
        const imageUrl = hasImage
          ? `${domain}${article.multimedia[0]?.url}`
          : 'https://i.ibb.co/0yYnWSn/default-fallback-image.png';
        return (
          <Article key={article._id} article={article} imageUrl={imageUrl} />
        );
      })}
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
