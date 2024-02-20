export const splitAndJoinWithDash = (text: string): string => {
  return text.split(' ').join('-').toLowerCase();
};

export const contentTrimmed = (text: string, maxLength?: number): string => {
  if (!maxLength) {
    maxLength = 100;
  }
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

export function getTimeDifference(dateString: string): string {
  const date = new Date(dateString);
  const currentDate = new Date();
  const differenceInSeconds = Math.floor(
    (currentDate.getTime() - date.getTime()) / 1000
  );

  // Define time intervals in seconds
  const intervals: Record<string, number> = {
    tahun: 31536000,
    bulan: 2592000,
    hari: 86400,
    jam: 3600,
    menit: 60,
  };

  // Iterate through intervals to find the largest one that fits the difference
  for (const [unit, seconds] of Object.entries(intervals)) {
    const differenceInUnit = Math.floor(differenceInSeconds / seconds);
    if (differenceInUnit >= 1) {
      return `${differenceInUnit} ${unit}${
        differenceInUnit > 1 ? '' : ''
      } yang lalu`;
    }
  }

  // If the difference is less than a minute, return "just now"
  return 'baru saja';
}

export async function urlToFile(url: string) {
  // Fetch the image data from the URL
  const response = await fetch(url);
  const blob = await response.blob();

  // Extract the filename from the URL
  const filename = url.substring(url.lastIndexOf('/') + 1);

  // Create a file object from the blob
  const file = new File([blob], filename, { type: blob.type });

  return file;
}
