import { atom } from 'recoil';

import { TDetailEventData, TEventData } from '@/types/events';

export const eventsDataState = atom<Array<TEventData>>({
  key: 'eventsDataState',
  default: [
    {
      id: 0,
      title: '',
      slug: '',
      type: '',
      status: '',
      thumbnail: {
        id: 0,
        alt: '',
        file_url: '',
        mimetype: '',
      },
      description: '',
      start_date: '',
      end_date: '',

      created_at: '',
      updated_at: '',
      _links: {
        self: {
          href: '',
        },
      },
    },
  ],
});

export const eventsDetailDataState = atom<TDetailEventData>({
  key: 'eventsDetailDataState',
  default: {
    event: {
      id: 0,
      title: '',
      slug: '',
      type: '',
      status: '',
      thumbnail: {
        id: 0,
        alt: '',
        file_url: '',
        mimetype: '',
      },
      poster: {
        id: 0,
        alt: '',
        file_url: '',
        mimetype: '',
      },
      banner: {
        id: 0,
        alt: '',
        file_url: '',
        mimetype: '',
      },
      description: '',
      start_date: '',
      end_date: '',
      location: '',
      location_url: '',
      registration_link: '',
      start_reg_date: '',
      end_reg_date: '',
      contact: '',
      related_posts: [],
      program_name: '',
      department_name: '',
      period_year: '',
      created_at: '',
      updated_at: '',
    },
    recommendations: [],
  },
});
