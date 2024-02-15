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

export function formatDate(dateString: string) {
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}
