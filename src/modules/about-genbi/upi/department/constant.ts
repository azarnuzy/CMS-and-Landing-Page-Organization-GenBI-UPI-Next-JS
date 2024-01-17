export const translateImage = (name: string) => {
  switch (name) {
    case 'marketing':
      return 'marketing.png';
    case 'economic':
      return 'economic.png';
    case 'healthcare':
      return 'healthcare.png';
    case 'human-resource':
      return 'hr.png';
    case 'education':
      return 'education.png';
    case 'social-environment':
      return 'socen.png';
    default:
      return 'marketing.png';
  }
};

export const translateTitleDepartment = (name: string) => {
  switch (name) {
    case 'marketing':
      return 'Marketing';
    case 'economic':
      return 'Economic';
    case 'healthcare':
      return 'Healthcare';
    case 'human-resource':
      return 'Human Resource';
    case 'education':
      return 'Education';
    case 'social-environment':
      return 'Social & Environment';
    default:
      return 'Marketing';
  }
};

export const BreadcrumbDepartmentData = (name: string) => {
  return [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'Tentang GenBI UPI',
      link: '/tentang-genbi/upi',
    },
    {
      name: translateTitleDepartment(name),
      link: `/tentang-genbi/upi/${name}`,
    },
  ];
};
