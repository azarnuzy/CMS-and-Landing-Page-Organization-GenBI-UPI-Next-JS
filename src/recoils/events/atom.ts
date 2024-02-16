import { atom } from 'recoil';

import { TEventData } from '@/types/events';

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
