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

type TFilterData = {
  id: string;
  name: string;
};

export const filterData: TFilterData[] = [
  {
    id: 'all-data',
    name: 'All Data',
  },
  {
    id: 'press-release',
    name: 'Press Release',
  },
  {
    id: 'article',
    name: 'Article',
  },
];

export const departmentData = [
  {
    id: 'all-department',
    name: 'All Department',
  },
  {
    id: 'bank-indonesia',
    name: 'Bank Indonesia',
  },
  {
    id: 'bank-indonesia-jabar',
    name: 'Bank Indonesia Jabar',
  },
  {
    id: 'economic',
    name: 'Economic',
  },
  {
    id: 'education',
    name: 'Education',
  },
  {
    id: 'executive',
    name: 'Executive',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
  },
  {
    id: 'human-resources',
    name: 'Human Resources',
  },
  {
    id: 'marketing',
    name: 'Marketing',
  },
  {
    id: 'public-relation',
    name: 'Public Relation',
  },
  {
    id: 'social-environtment',
    name: 'Social Environtment',
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
