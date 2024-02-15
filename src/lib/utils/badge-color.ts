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
    case 'social-&-environment':
      return 'bg-primary-100 text-primary-500 hover:bg-primary/80 border-primary-300';
    case 'public-relation':
      return 'bg-blue-100 text-blue-500 hover:bg-blue/80 border-blue-300';
    case 'human-resources':
      return 'bg-orange-100 text-orange-500 hover:bg-orange/80 border-orange-300';
    case 'semua':
      return 'bg-warning-main text-warning-900 rounded-full hover:bg-warning-500 border border-warning-600 ';
    default:
      return 'text-neutral-600 border-neutral-300';
  }
}
