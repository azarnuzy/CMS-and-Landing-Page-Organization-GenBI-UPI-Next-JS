import { atom } from 'recoil';

import {
  TActiveManagementsData,
  TOptionManagementsData,
} from '@/types/managements';

export const optionManagementState = atom<Array<TOptionManagementsData>>({
  key: 'optionManagementState',
  default: [
    {
      id: 5,
      name: 'GenBI UPI 2023-2024',
      period_year: '23.24',
    },
  ],
});

export const selectedOptionManagementState = atom<number>({
  key: 'selectedOptionManagementState',
  default: 0,
});

export const activeManagementsState = atom<TActiveManagementsData>({
  key: 'activeManagementsState',
  default: {
    management: {
      id: 0,
      name: '',
      description: '',
      vision: '',
      mission: [],
      period_year: '',
      period_start_date: '',
      period_end_date: '',
      is_active: false,
      created_at: '',
      updated_at: '',
      photo: {
        id: 0,
        alt: '',
        file_url: '',
        caption: '',
        mimetype: '',
      },
      video: {
        id: 0,
        alt: '',
        file_url: '',
        mimetype: '',
      },
    },
    structure: {
      executives: [
        {
          id: 0,
          awardee_id: 0,
          name: '',
          linkedin_username: '',
          instagram_username: '',
          photo: {
            id: 0,
            alt: '',
            file_url: '',
            mimetype: '',
          },
          department: '',
          division: '',
          position: '',
          created_at: '',
          updated_at: '',
        },
      ],
      departments: [
        {
          id: 0,
          name: '',
          description: '',
          cover: {
            id: 0,
            alt: '',
            file_url: '',
            mimetype: '',
            category: '',
          },
          _links: {
            self: {
              href: '',
            },
          },
        },
      ],
    },
  },
});

export const statusManagementsState = atom<string>({
  key: 'statusManagementsState',
  default: 'data',
});
