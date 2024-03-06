import { atom } from 'recoil';

import { TAwardeeDetailData, TAwardeesData } from '@/types/awardees';

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

export const awardeesDataDetailState = atom<TAwardeeDetailData>({
  key: 'awardeesDataDetailState',
  default: {
    id: 0,
    name: '',
    birth_date: new Date(),
    linkedin_username: '',
    instagram_username: '',
    telp: '',
    member_since: new Date(),
    scholarship: 0,
    nim: '',
    year: '',
    ip1: '',
    ip2: '',
    ip3: '',
    ip4: '',
    ip5: '',
    ip6: '',
    ip7: '',
    ip8: '',
    ipk1: '',
    ipk2: '',
    ipk3: '',
    ipk4: '',
    ipk5: '',
    ipk6: '',
    ipk7: '',
    ipk8: '',
    study_program: '',
    study_program_id: 0,
    faculty: '',
    created_at: '',
    updated_at: '',
    photo: {
      alt: '',
      caption: '',
      file_url: '',
      id: 0,
      mimetype: '',
    },
    transcript: {
      file_name: '',
      file_url: '',
      id: 0,
    },
    managements: [
      {
        department: '',
        id: 0,
        management: '',
        division: '',
        position: '',
      },
    ],
  },
});

export const awardeesDataEditState = atom<TAwardeeDetailData>({
  key: 'awardeesDataEditState',
  default: {
    id: 0,
    name: '',
    birth_date: new Date(),
    linkedin_username: '',
    instagram_username: '',
    telp: '',
    member_since: new Date(),
    scholarship: 0,
    nim: '',
    year: '',
    ip1: '',
    ip2: '',
    ip3: '',
    ip4: '',
    ip5: '',
    ip6: '',
    ip7: '',
    ip8: '',
    ipk1: '',
    ipk2: '',
    ipk3: '',
    ipk4: '',
    ipk5: '',
    ipk6: '',
    ipk7: '',
    ipk8: '',
    study_program: '',
    study_program_id: 0,
    faculty: '',
    created_at: '',
    updated_at: '',
    photo: {
      alt: '',
      caption: '',
      file_url: '',
      id: 0,
      mimetype: '',
    },
    transcript: {
      file_name: '',
      file_url: '',
      id: 0,
    },
    managements: [
      {
        department: '',
        id: 0,
        management: '',
        division: '',
        position: '',
      },
    ],
  },
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

export const photoNameAwardeeState = atom<string>({
  key: 'photoNameAwardeeState',
  default: '',
});
