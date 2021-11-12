import React from 'react';
import styled from 'styled-components/macro';
import { Tabs } from 'antd';
import SearchPage from './pages/SearchPage';

const { TabPane } = Tabs;

const App = function (): JSX.Element {
  return (
    <StyledWrapper>
      <Tabs defaultActiveKey="1">
        <TabPane tab="SEARCH" key="1">
          <SearchPage />
        </TabPane>
        <TabPane tab="FAVORITE" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.section`
  padding: 1rem 1.5rem;
`;

export default App;
