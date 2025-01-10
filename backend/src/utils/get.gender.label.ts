export const getGenderLabel = (gender: string) => {
  return gender === 'm' ? 'Male' : gender === 'f' ? 'Female' : 'Others';
};
