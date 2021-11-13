import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { RootState } from '../modules';
import { getImage } from '../utils';
import Article from './Article';

interface ArticleListProps {
  articles: Article[];
}

const ArticleList = function ({ articles }: ArticleListProps): JSX.Element {
  const { favorites } = useSelector((state: RootState) => state.favoriteList);

  return (
    <ArticleListContainer>
      {articles?.map(article => {
        const imageUrl = getImage(article.multimedia[0]?.url);
        const isFavorite = favorites.some(({ _id }) => _id === article._id);

        return (
          <Article
            key={article._id}
            article={article}
            isFavorite={isFavorite}
            imageUrl={imageUrl}
          />
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
