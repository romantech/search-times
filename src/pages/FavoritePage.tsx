import React from 'react';
import styled, { css } from 'styled-components/macro';
import { Empty } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import ArticleList from '../components/ArticleList';
import { HeadlineStyle, FlexCenterColumn } from '../styles/commonStyles';

const FavoritePage = function ({ width }: { width: number }): JSX.Element {
  const { favorites } = useSelector((state: RootState) => state.favoriteList);

  return (
    <FavoritePageContainer isCenter={favorites.length === 0} width={width}>
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

const FavoritePageContainer = styled.section<{
  isCenter: boolean;
  width: number;
}>`
  ${FlexCenterColumn}
  margin-top: 0;
  transition: margin-top 0.3s ease-in-out;

  h1 {
    ${HeadlineStyle}
  }

  .ant-empty {
    margin-top: 5vh;
  }

  ${({ isCenter, width }) =>
    isCenter &&
    css`
      margin-top: ${width > 768 ? '17vh' : '10vh'};
      transition: margin-top 0.3s ease-in-out;
    `}
`;

export default FavoritePage;
