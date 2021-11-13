import React from 'react';
import styled from 'styled-components/macro';
import { Button, Tooltip, message } from 'antd';
import { useDispatch } from 'react-redux';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { addToFavorites, removeFromFavorites } from '../modules/favoriteList';
import useImage from '../hooks/useImage';
import { sliceCharactersUntilNum } from '../utils';

interface ArticleListProps {
  article: Article;
  isFavorite: boolean;
  imageUrl: string;
}

const Article = function ({
  article,
  isFavorite,
  imageUrl,
}: ArticleListProps): JSX.Element {
  const dispatch = useDispatch();
  const Image = useImage(imageUrl);

  const favoriteHandler = () => {
    let msg = '';
    if (isFavorite) {
      dispatch(removeFromFavorites(article._id));
      msg = '즐겨찾기에서 삭제되었습니다';
    } else {
      dispatch(addToFavorites(article));
      msg = '즐겨찾기에 추가되었습니다';
    }
    message.success(msg);
  };

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
        <TagWrapper>
          <TagSpan>{article.pub_date?.split('T')[0]}</TagSpan>
          <TagSpan>{article.section_name?.split(' ')[0]}</TagSpan>
          <Tooltip title="Add to favorite">
            <Button
              type="default"
              shape="circle"
              icon={isFavorite ? <StarFilled /> : <StarOutlined />}
              onClick={favoriteHandler}
            />
          </Tooltip>
        </TagWrapper>
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
  gap: 1.5rem;
`;

const TagWrapper = styled.section`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
`;

const TagSpan = styled.span`
  background: #d3d3d34c;
  padding: 8px 8px;
  border-radius: 10px;
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
  min-width: 6.2rem;
  max-height: 5rem;
  overflow: hidden;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Article;
