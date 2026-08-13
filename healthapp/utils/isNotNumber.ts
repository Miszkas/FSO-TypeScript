export const isNotNumber = (
  value: number | string | null | undefined,
): boolean => {
  return isNaN(Number(value));
};
