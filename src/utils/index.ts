export const sliceCharactersUntilNum = (
  string: string,
  num: number,
): string => {
  let count = 0;
  return string
    .split('')
    .reduce((acc, cur) => {
      if (count < num) {
        if (cur !== ' ') count++;
        return acc.concat(cur);
      }
      return acc;
    }, '')
    .trim();
};

export const checkIsTermChanged = (
  prevTerm: string,
  curTerm: string,
): boolean => {
  const trimmedPrevTerm = prevTerm.trim();
  const trimmedCurTerm = curTerm.trim();
  return trimmedPrevTerm !== trimmedCurTerm;
};

export const getImage = (
  imgUrl = 'fallback',
  domain = 'https://nytimes.com/',
): string => {
  const hasImage = imgUrl !== undefined && imgUrl !== 'fallback';
  return hasImage
    ? `${domain}${imgUrl}`
    : 'https://i.ibb.co/0yYnWSn/default-fallback-image.png';
};

export const checkIsMobile = (): boolean => {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
};
