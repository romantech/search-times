import React from 'react';
import styled from 'styled-components/macro';
import { Tabs } from 'antd';

import SearchPage from './pages/SearchPage';
import FavoritePage from './pages/FavoritePage';
import useCurrentSize from './hooks/useCurrentSize';

const { TabPane } = Tabs;

function App(): JSX.Element {
  const { width } = useCurrentSize();

  return (
    <StyledWrapper>
      <Tabs defaultActiveKey="1">
        <TabPane tab="SEARCH" key="1">
          <SearchPage width={width} />
        </TabPane>
        <TabPane tab="FAVORITES" key="2">
          <FavoritePage width={width} />
        </TabPane>
      </Tabs>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.section`
  padding: 1rem 1.5rem;
  height: 100vh;
`;

export default App;
