import { atom } from 'recoil';

import { TAwardeesData } from '@/types/awardees';

export const awardeesDataState = atom<Array<TAwardeesData>>({
  key: 'awardeesDataState',
  default: [
    {
      id: 0,
      name: '',
      created_at: '',
      department: '',
      ipks: [],
      ips: [],
      nim: '',
      photo: {
        id: 0,
        alt: '',
        file_url: '',
        caption: '',
        mimetype: '',
      },
      position: '',
      scholarship: 0,
      study_program: '',
      updated_at: '',
      division: '',
    },
  ],
});

export const dataStatusAdminAwardeeState = atom<string>({
  key: 'dataStatusAdminAwardeeState',
  default: 'data',
});

export const searchAdminAwardeeState = atom<string>({
  key: 'searchAdminAwardeeState',
  default: '',
});

export const filterAdminAwardeeDepartmentState = atom<string>({
  key: 'filterAdminAwardeeDepartmentState',
  default: '',
});

export const filterAdminAwardeeManagementState = atom<string>({
  key: 'filterAdminAwardeeManagementState',
  default: '',
});

export const parentRefAdminAwardeesState =
  atom<React.RefObject<HTMLTableElement> | null>({
    key: 'parentRefAdminAwardeesState',
    default: null,
  });
