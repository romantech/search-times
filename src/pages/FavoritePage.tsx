import React from 'react';
import styled, { css } from 'styled-components/macro';
import { Empty } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import ArticleList from '../components/ArticleList';
import { HeadlineStyle, FlexCenterColumn } from '../styles/commonStyles';

const FavoritePage = function (): JSX.Element {
  const { favorites } = useSelector((state: RootState) => state.favoriteList);

  return (
    <FavoritePageContainer isCenter={favorites.length === 0}>
      <h1>FAVORITE ARTICLES</h1>
      <section>
        {favorites.length > 0 ? (
          <ArticleList articles={favorites} />
        ) : (
          <Empty description="Nothing" />
        )}
      </section>
    </FavoritePageContainer>
  );
};

const FavoritePageContainer = styled.section<{ isCenter: boolean }>`
  ${FlexCenterColumn}
  margin-top: 0;
  transition: margin-top 0.3s ease-in-out;

  h1 {
    ${HeadlineStyle}
  }

  .ant-empty {
    margin-top: 5vh;
  }

  ${({ isCenter }) =>
    isCenter &&
    css`
      margin-top: 20vh;
      transition: margin-top 0.3s ease-in-out;
    `}
`;

export default FavoritePage;
