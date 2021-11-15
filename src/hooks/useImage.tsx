import React, { useState } from 'react';
import { Spin } from 'antd';
import styled from 'styled-components/macro';
import { getImage } from '../utils';

type SpinSize = 'default' | 'small' | 'large';

const useImage = function (
  src: string,
  spinSize: SpinSize = 'default',
): () => JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const Image = function () {
    return (
      <>
        {isLoading && <Spin size={spinSize} />}
        <StyledImage
          isLoading={isLoading}
          src={src}
          alt="article_image"
          onError={({ currentTarget }) => {
            currentTarget.src = getImage();
          }}
          onLoad={() => setIsLoading(false)}
        />
      </>
    );
  };

  return Image;
};

const StyledImage = styled.img<{ isLoading: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: ${({ isLoading }) => isLoading && 'none'};
`;

export default useImage;
