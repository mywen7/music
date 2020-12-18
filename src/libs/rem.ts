const remBase = 14;

export function toRem(px: number) {
  return `${px / remBase}rem`;
}
