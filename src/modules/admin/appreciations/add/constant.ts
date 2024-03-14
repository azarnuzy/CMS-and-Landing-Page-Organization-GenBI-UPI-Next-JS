import { TPostAppreciationPayload } from '@/types/appreciations';

export const breadcrumbAddAppreciationsData = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Appreciations',
    link: '/admin/appreciations',
  },
  {
    name: 'Add Appreciations',
    link: '/admin/appreciations/add',
  },
];

export const defaultValuesAddAppreciations: TPostAppreciationPayload = {
  title: '',
  given_date: undefined,
  instagram_url: '',
  caption: '',
  cover: undefined,
};
