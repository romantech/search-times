import { createGlobalStyle } from 'styled-components/macro';
import { normalize } from 'styled-normalize';
import { BackgroundPattern, ScrollStyle } from './commonStyles';

const GlobalStyle = createGlobalStyle`
  ${normalize}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans KR', 'Segoe UI',
    'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  ${BackgroundPattern}
  ${ScrollStyle}
  overflow-y: scroll; // 스크롤바 밀림 현상 방지
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

`;

export default GlobalStyle;
