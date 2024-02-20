export const defaultValuesData = {
  title: '',
  content: '<p></p>\n',
  department: '',
  type: '',
  event: '',
  hashtag: [''],
  thumbnail: undefined,
  othersPhoto: undefined,
  caption_othersPhoto_1: '',
  caption_othersPhoto_2: '',
  caption_othersPhoto_3: '',
  caption_othersPhoto_4: '',
  caption_othersPhoto_5: '',
};

export const breadcrumbEditNewsData = (id: string) => [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'News',
    link: '/admin/news',
  },
  {
    name: 'Edit News',
    link: `/admin/news/edit/${id}`,
  },
];
