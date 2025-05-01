import { useEffect, useState } from 'react';

// 리사이즈 참고 링크:
// https://dev.to/vitaliemaldur/resize-event-listener-using-react-hooks-1k0c

/*
  window.innerWidth/innerHeight : 현재 화면에서 스크롤바가 차지하는 영역 포함
  document.documentElement.clientHeight : 현재 화면에서 스크롤바가 차지하는 영역 제외(<html>)
  document.body.clientHeight : 현재 화면에서 스크롤바가 차지하는 영역 제외(<body>)
  참고 : https://ko.javascript.info/size-and-scroll-window
*/

const getWidth = () =>
  document.documentElement.clientWidth || window.innerWidth || document.body.clientWidth;

const getHeight = () =>
  document.documentElement.clientHeight || window.innerHeight || document.body.clientHeight;

// customHook의 이름은 무조건 use로 시작해야 한다
export default function useCurrentSize(): { width: number; height: number } {
  // save current window width in the state object
  const [windowSize, setWindowSize] = useState({
    width: getWidth(),
    height: getHeight(),
  });

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    // timeoutId for debounce mechanism
    let timeoutId: NodeJS.Timeout;
    const resizeListener = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      // change width from the state object after 150 milliseconds
      timeoutId = setTimeout(
        () =>
          setWindowSize({
            width: getWidth(),
            height: getHeight(),
          }),
        150,
      );
    };
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // cleanup function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return windowSize;
}
