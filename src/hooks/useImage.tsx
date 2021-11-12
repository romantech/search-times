import React, { useState } from 'react';
import { Spin } from 'antd';
import styled from 'styled-components/macro';

type SpinSize = 'default' | 'small' | 'large';

const useImage = function (
  src: string,
  spinSize = 'default',
): () => JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const Image = function () {
    return (
      <>
        {isLoading && <Spin size={spinSize as SpinSize} />}
        <StyledImage
          isLoading={isLoading}
          src={src}
          alt="article_image"
          onError={({ currentTarget }) => {
            currentTarget.src =
              'https://i.ibb.co/0yYnWSn/default-fallback-image.png';
          }}
          onLoad={() => setIsLoading(false)}
        />
      </>
    );
  };

  return Image;
};

const StyledImage = styled.img<{ isLoading: boolean }>`
  max-width: 100%;
  object-fit: cover;
  display: ${({ isLoading }) => isLoading && 'none'};
`;

export default useImage;
