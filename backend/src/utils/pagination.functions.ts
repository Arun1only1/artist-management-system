export const getSkip = (page: number, limit: number) => {
  return (page - 1) * limit;
};
