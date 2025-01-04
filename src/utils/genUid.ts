export const genUid = () =>
  Math.round(36 ** (5 + 1) - Math.random() * 36 ** 5)
    .toString(36)
    .slice(1);
