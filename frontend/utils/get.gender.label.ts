export const getGenderLabel = (gender: string) => {
  let result: string;

  if (gender === 'm') {
    result = 'Male';
  } else if (gender === 'f') {
    result = 'Female';
  } else {
    result = 'Other';
  }

  return result;
};
