import { atom } from 'recoil';

import { TDepartmentByIdData } from '@/types/departments';

export const departmentDataState = atom<TDepartmentByIdData>({
  key: 'departmentDataState',
  default: {
    department: {
      id: 0,
      name: '',
      management: {
        id: 0,
        name: '',
        period_year: '',
      },
      cover: {
        file: {
          imagekit_url: '',
          mimetype: '',
        },
        id: 0,
        alt: '',
        file_url: '',
        mimetype: '',
      },
      description: '',
      divisions: [
        {
          id: 0,
          name: '',
          description: '',
        },
      ],
      programs: [
        {
          id: 0,
          name: '',
          description: '',
          implementation_desc: '',
        },
      ],
    },
    structure: {
      manager: {
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

          caption: '',
        },
        department: '',
        position: '',
        created_at: '',
        updated_at: '',
      },
      awardees: [
        {
          id: 0,
          description: '',
          name: '',
          awardees: [
            {
              id: 0,
              name: '',
              linkedin_username: '',
              instagram_username: '',
              awardee_id: 0,
              division: '',
              position: '',
              photo: {
                id: 0,
                alt: '',
                file_url: '',
                mimetype: '',
                caption: '',
              },
            },
          ],
        },
      ],
    },
  },
});
