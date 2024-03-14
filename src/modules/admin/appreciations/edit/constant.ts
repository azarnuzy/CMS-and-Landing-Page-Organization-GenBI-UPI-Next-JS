import { TAppreciationDetailData } from '@/types/appreciations';

export const breadcrumbEditAppreciationsData = (id: string) => [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Appreciations',
    link: '/admin/appreciations',
  },
  {
    name: 'Edit',
    link: `/admin/appreciations/edit/${id}`,
  },
];

export const defaultValuesPutAppreciations = (
  data: TAppreciationDetailData
) => {
  return {
    title: data?.title,
    given_date: new Date(data?.given_date),
    instagram_url: data?.instagram_url,
    caption: data?.caption,
  };
};
