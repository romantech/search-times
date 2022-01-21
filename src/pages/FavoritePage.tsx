import React from 'react';
import styled, { css } from 'styled-components/macro';
import { Empty } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import ArticleList from '../components/ArticleList';
import { FlexCenterColumn, HeadlineStyle } from '../styles/commonStyles';

interface StyledProps {
  isCenter: boolean;
  width: number;
}

const FavoritePage = function ({ width }: { width: number }): JSX.Element {
  const { favorites } = useSelector((state: RootState) => state.favoriteList);

  return (
    <FavoritePageContainer isCenter={favorites.length === 0} width={width}>
      <h1>FAVORITE ARTICLES</h1>
      <section>
        {favorites.length > 0 ? (
          <ArticleList articles={favorites} term="" />
        ) : (
          <Empty description="Nothing" />
        )}
      </section>
    </FavoritePageContainer>
  );
};

const FavoritePageContainer = styled.section<StyledProps>`
  ${FlexCenterColumn};
  margin-top: 0;
  padding-bottom: 2rem;
  transition: margin-top 0.3s ease-in-out;

  h1 {
    ${HeadlineStyle};
  }

  .ant-empty {
    margin-top: 3vh;
  }

  ${({ isCenter, width }) =>
    isCenter &&
    css`
      margin-top: ${width > 768 ? '18vh' : '10vh'};
      transition: margin-top 0.3s ease-in-out;
    `}
`;

export default FavoritePage;
