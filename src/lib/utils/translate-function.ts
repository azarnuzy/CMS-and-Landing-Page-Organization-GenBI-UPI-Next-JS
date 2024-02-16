export const translateStatusEvent = (status: string) => {
  switch (status) {
    case 'Coming Soon':
      return 'text-error-700 bg-error-100 border-error-300';
    case 'Open Registration':
      return 'text-warning-500 bg-warning-100 border-warning-500';
    case 'Close Registration':
      return 'text-neutral-main bg-neutral-500 border-neutral-600';
    case 'Ongoing':
      return 'text-success-900 bg-success-200 border-success-400';
    default:
      return 'text-neutral-600 bg-neutral-200 border-neutral-300';
  }
};
