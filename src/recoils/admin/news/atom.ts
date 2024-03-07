import { atom, selector } from 'recoil';

import { TDepartmentOptionData } from '@/types/departments';

export const searchAdminNewsState = atom<string>({
  key: 'searchAdminNewsState',
  default: '',
});

export const dataStatusAdminNewsState = atom<string>({
  key: 'dataStatusAdminNewsState',
  default: 'data',
});

export const parentRefAdminNewsState =
  atom<React.RefObject<HTMLTableElement> | null>({
    key: 'parentRefAdminNewsState',
    default: null,
  });

export const dataAddDepartmentAtomNewsState = atom<TDepartmentOptionData[]>({
  key: 'dataAddDepartmentAtomNewsState',
  default: [
    {
      id: 0,
      name: '',
    },
  ],
});

export const dataDepartmentSelectorNewsState = selector({
  key: 'dataDepartmentSelectorNewsState',
  get: ({ get }) => {
    const data = get(dataAddDepartmentAtomNewsState);

    return data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  },
});
