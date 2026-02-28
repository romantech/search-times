import React, { useState } from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import { getImage } from '../utils';

type SpinSize = 'default' | 'small' | 'large';

function useImage(src: string, spinSize: SpinSize = 'default') {
  const [isLoading, setIsLoading] = useState(true);
  return function Image() {
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
}

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
