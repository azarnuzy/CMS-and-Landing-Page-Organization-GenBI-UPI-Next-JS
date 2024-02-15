export const splitAndJoinWithDash = (text: string): string => {
  return text.split(' ').join('-').toLowerCase();
};

export const contentTrimmed = (text: string): string => {
  const maxLength = 100;
  const trimmedString = text.substr(0, maxLength);
  const descriptionTrimmed =
    trimmedString.substr(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
    ) + '...';

  return descriptionTrimmed;
};
