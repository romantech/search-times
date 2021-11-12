/* eslint-disable import/prefer-default-export */
export const sliceCharactersUntilNum = (
  string: string,
  num: number,
): string => {
  let count = 0;
  return string.split('').reduce((acc, cur) => {
    if (count < num) {
      if (cur !== ' ') count++;
      return acc.concat(cur);
    }
    return acc;
  }, '');
};
