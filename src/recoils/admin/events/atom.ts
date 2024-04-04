import { atom } from 'recoil';

import { TEventData } from '@/types/events';

export const searchEventAdminState = atom<string>({
  key: 'searchEventAdminState',
  default: '',
});

export const dataStatusEventAdminState = atom<string>({
  key: 'dataStatusEventAdminState',
  default: 'data',
});

export const parentRefEventAdminState =
  atom<React.RefObject<HTMLTableElement> | null>({
    key: 'parentRefEventAdminState',
    default: null,
  });

export const eventsAdminDataState = atom<Array<TEventData>>({
  key: 'eventsAdminDataState',
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

export const inputTagStateEvent = atom<string[]>({
  key: 'inputTagStateEvent',
  default: [],
});
