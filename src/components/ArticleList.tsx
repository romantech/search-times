import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { RootState } from '../modules';
import { getImage } from '../utils';
import Article from './Article';
import { FlexCenterColumn } from '../styles/commonStyles';

interface ArticleListProps {
  articles: Article[];
  term: string;
}

function ArticleList({ articles, term }: ArticleListProps): JSX.Element {
  const { favorites } = useSelector((state: RootState) => state.favoriteList);

  return (
    <ArticleListContainer>
      {articles?.map((article) => {
        const imageUrl = getImage(article.multimedia.default.url);
        const isFavorite = favorites.some(({ _id }) => _id === article._id);

        return (
          <Article
            term={term}
            key={article._id}
            article={article}
            isFavorite={isFavorite}
            imageUrl={imageUrl}
          />
        );
      })}
    </ArticleListContainer>
  );
}

const ArticleListContainer = styled.section`
  width: 85vw;
  max-width: 38rem;
  ${FlexCenterColumn};
`;

export default ArticleList;
