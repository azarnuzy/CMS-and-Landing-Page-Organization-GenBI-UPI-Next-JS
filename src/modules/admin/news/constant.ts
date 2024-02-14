export const breadcrumbNewsData = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'News',
    link: '/admin/news',
  },
];

export const filterData = [
  {
    value: 'all-data',
    label: 'All Data',
  },
  {
    value: 'press-release',
    label: 'Press Release',
  },
  {
    value: 'article',
    label: 'Article',
  },
];

export const departmentData = [
  {
    value: 'all-department',
    label: 'All Department',
  },
  {
    value: 'bank-indonesia',
    label: 'Bank Indonesia',
  },
  {
    value: 'bank-indonesia-jabar',
    label: 'Bank Indonesia Jabar',
  },
  {
    value: 'economic',
    label: 'Economic',
  },
  {
    value: 'education',
    label: 'Education',
  },
  {
    value: 'executive',
    label: 'Executive',
  },
  {
    value: 'healthcare',
    label: 'Healthcare',
  },
  {
    value: 'human-resources',
    label: 'Human Resources',
  },
  {
    value: 'marketing',
    label: 'Marketing',
  },
  {
    value: 'public-relation',
    label: 'Public Relation',
  },
  {
    value: 'social-environtment',
    label: 'Social Environtment',
  },
];

type TNewsData = {
  value: number;
  title: string;
  type: 'press-release' | 'article' | 'all-data' | 'default';
  department:
    | 'marketing'
    | 'all-department'
    | 'bank-indonesia'
    | 'bank-indonesia-jabar'
    | 'economic'
    | 'education'
    | 'executive'
    | 'healthcare'
    | 'human-resources'
    | 'public-relation'
    | 'social-environtment'
    | 'default';
};

export const newsData: TNewsData[] = [
  {
    value: 1,
    title:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, placeat.',
    type: 'press-release',
    department: 'marketing',
  },
  // create more data

  {
    value: 2,
    title:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, placeat.',
    type: 'article',
    department: 'healthcare',
  },
  {
    value: 3,
    title:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, placeat.',
    type: 'press-release',
    department: 'marketing',
  },
  {
    value: 4,
    title:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, placeat.',
    type: 'article',
    department: 'marketing',
  },
  {
    value: 5,
    title:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, placeat.',
    type: 'press-release',
    department: 'economic',
  },
  {
    value: 6,
    title:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, placeat.',
    type: 'article',
    department: 'education',
  },
  {
    value: 7,
    title:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, placeat.',
    type: 'press-release',
    department: 'executive',
  },
  {
    value: 8,
    title:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, placeat.',
    type: 'article',
    department: 'healthcare',
  },
  {
    value: 9,
    title:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, placeat.',
    type: 'press-release',
    department: 'healthcare',
  },
  {
    value: 10,
    title:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, placeat.',
    type: 'article',
    department: 'healthcare',
  },
];
