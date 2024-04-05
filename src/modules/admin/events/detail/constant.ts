export const breadcrumbDetailEventsData = (id: string) => [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Events',
    link: '/admin/events',
  },
  {
    name: 'Detail Event',
    link: `/admin/events/detail/${id}`,
  },
];
