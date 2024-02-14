export function badgeColor(tag: string) {
  switch (tag.toLowerCase().trim()) {
    case 'press-release':
      return 'bg-warning-100 text-warning-900 border-warning-500 hover:bg-warning-200';
    case 'article':
      return 'bg-error-100 text-error-700 border-error-400 hover:bg-error-200';
    case 'marketing':
      return 'bg-error-300 text-neutral-100 border-error-400 hover:bg-error-400';
    case 'executive':
      return 'bg-error-100 text-error-400 border-error-300 hover:bg-error-200';
    case 'healthcare':
      return 'bg-success-300 text-success-600 border-success-400 hover:bg-success-400';
    case 'education':
      return 'bg-warning-800 text-warning-100 border-warning-900 hover:bg-secondary-900';
    case 'economic':
      return 'text-purple-main bg-purple-100 border-purple-300 hover:bg-purple-200';
    default:
      return 'bg-primary text-primary-foreground hover:bg-primary/80';
  }
}
