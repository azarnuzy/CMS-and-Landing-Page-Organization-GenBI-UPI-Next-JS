export const breadcrumbDetailAwardeeData = (id: string) => [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Awardee',
    link: '/admin/awardee',
  },
  {
    name: 'Detail',
    link: `/admin/awardee/${id}`,
  },
];
