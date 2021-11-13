import React from 'react';
import styled from 'styled-components/macro';
import { Empty } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import ArticleList from '../components/ArticleList';

const FavoritePage = function (): JSX.Element {
  const { favorites } = useSelector((state: RootState) => state.favoriteList);

  return (
    <FavoritePageContainer>
      <h1>FAVORITE ARTICLES</h1>
      {favorites.length > 0 ? (
        <ArticleList articles={favorites} />
      ) : (
        <Empty description="No favorite articles" />
      )}
    </FavoritePageContainer>
  );
};

const FavoritePageContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    text-align: center;
    font-weight: bold;
  }

  .ant-empty {
    margin-top: 5vh;
  }
`;

export default FavoritePage;
