import { atom, selector } from 'recoil';

import { TUserOptionsData, TUserOptionSelector } from '@/types/users';

export const userOptionsAtomDataState = atom<TUserOptionsData[]>({
  key: 'userOptionsAtomDataState',
  default: [
    {
      id: 0,
      username: '',
      email: '',
      awardee_id: 0,
      awardee_name: '',
    },
  ],
});

export const userOptionSelectorDataState = selector<TUserOptionSelector[]>({
  key: 'userOptionSelectorDataState',
  get: ({ get }) => {
    const data = get(userOptionsAtomDataState);

    return data.map((item) => ({
      value: item.id,
      label: item.awardee_name,
    }));
  },
});
