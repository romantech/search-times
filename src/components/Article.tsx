import React from 'react';
import styled from 'styled-components/macro';
import useImage from '../hooks/useImage';

import { sliceCharactersUntilNum } from '../utils';

interface ArticleListProps {
  article: Article;
  imageUrl: string;
}

const Article = function ({
  article,
  imageUrl,
}: ArticleListProps): JSX.Element {
  const Image = useImage(imageUrl);

  return (
    <ArticleContainer>
      <TextWrapper>
        <h2>{article.headline.main}</h2>
        <p>
          {sliceCharactersUntilNum(article.lead_paragraph, 30) + ' '}
          <a href={article.web_url} target="_blank" rel="noreferrer">
            ...more
          </a>
        </p>
      </TextWrapper>
      <ImageWrapper>
        <Image />
      </ImageWrapper>
    </ArticleContainer>
  );
};

const ArticleContainer = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  padding: 1rem 0rem;
  gap: 2rem;
`;

const TextWrapper = styled.section`
  width: 80%;
  overflow: hidden;

  h2 {
    margin: 0;
    padding: 0;
    font-size: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ImageWrapper = styled.section`
  min-width: 100px;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Article;
