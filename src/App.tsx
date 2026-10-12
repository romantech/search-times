import { Tabs, type TabsProps } from 'antd';
import styled from 'styled-components';
import useCurrentSize from './hooks/useCurrentSize';
import FavoritePage from './pages/FavoritePage';
import SearchPage from './pages/SearchPage';

function App() {
  const { width } = useCurrentSize();

  const tabItems: TabsProps['items'] = [
    { label: 'SEARCH', key: '1', children: <SearchPage width={width} /> },
    { label: 'FAVORITES', key: '2', children: <FavoritePage width={width} /> },
  ];

  return (
    <StyledWrapper>
      <Tabs defaultActiveKey="1" items={tabItems} />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.section`
  padding: 1rem 1.5rem;
  height: 100vh;
`;

export default App;
