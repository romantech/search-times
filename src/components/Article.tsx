import React from 'react';
import styled from 'styled-components/macro';
import { Button, Tooltip, message } from 'antd';
import { useDispatch } from 'react-redux';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { addToFavorites, removeFromFavorites } from '../modules/favoriteList';
import useImage from '../hooks/useImage';
import { sliceCharactersUntilNum } from '../utils';
import {
  FlexCenterRow,
  FlexStartRow,
  FlexCenterColumn,
} from '../styles/commonStyles';
import useCurrentSize from '../hooks/useCurrentSize';

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
  const { width } = useCurrentSize();

  const favoriteHandler = () => {
    let msg = '';
    if (isFavorite) {
      dispatch(removeFromFavorites(article._id));
      msg = '즐겨찾기에서 삭제되었습니다';
    } else {
      dispatch(addToFavorites(article));
      msg = '즐겨찾기에 추가되었습니다';
    }
    message.success(msg, 1);
  };

  return (
    <ArticleContainer>
      <ArticleUpper>
        <TextWrapper>
          <h2>{article.headline.main}</h2>
          <div>
            <p>{sliceCharactersUntilNum(article.lead_paragraph, 30) + '...'}</p>
            <a href={article.web_url} target="_blank" rel="noreferrer">
              more
            </a>
          </div>
        </TextWrapper>
        <ImageWrapper>
          <Image />
        </ImageWrapper>
      </ArticleUpper>
      <ArticleLower>
        <Tooltip
          title={isFavorite ? 'Remove from favorite' : 'Add to favorite'}
        >
          <Button
            shape="circle"
            icon={isFavorite ? <StarFilled /> : <StarOutlined />}
            onClick={favoriteHandler}
          />
        </Tooltip>
        <TagSpan>{article.pub_date.split('T')[0] || 'No Date'}</TagSpan>
        <TagSpan>{article.section_name || 'Various'}</TagSpan>
        {width > 768 && (
          <TagSpan>
            {article.byline.original?.split(',')[0] || 'No Author'}
          </TagSpan>
        )}
      </ArticleLower>
    </ArticleContainer>
  );
};

const ArticleContainer = styled.section`
  ${FlexCenterColumn}
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding: 1rem 0;
  gap: 0.5rem;
`;

const ArticleUpper = styled.section`
  ${FlexCenterRow}
  align-items:flex-start;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
`;

const TextWrapper = styled.section`
  width: 73%;

  h2 {
    margin-bottom: 0.2rem;
    padding: 0;
    font-size: 1.2rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: pre-line;
    line-height: 1.7rem;
  }

  div {
    ${FlexStartRow}
    color: gray;

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

const ImageWrapper = styled.section`
  ${FlexCenterRow}
  position: relative;
  width: 27%;
  margin-top: 5px;
  min-height: 4.5rem;
`;

const ArticleLower = styled.section`
  ${FlexCenterRow}
  margin-right: auto;
  gap: 0.5rem;
  font-size: 0.75rem;
`;

const TagSpan = styled.span`
  background: #d3d3d34c;
  padding: 7px 7px;
  border-radius: 5px;
`;

export default Article;
