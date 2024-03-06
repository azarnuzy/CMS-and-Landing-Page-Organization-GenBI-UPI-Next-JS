import { atom, selector } from 'recoil';

import {
  TStudyProgramData,
  TStudyProgramDataSelect,
} from '@/types/study-programs';

export const studyProgramDataState = atom<TStudyProgramData[]>({
  key: 'studyProgramDataState',
  default: [
    {
      id: 0,
      name: '',
      jenjang: '',
      faculty_name: '',
      faculty_abbr: '',
    },
  ],
});

export const studyProgramSelectorData = selector<TStudyProgramDataSelect[]>({
  key: 'studyProgramSelectorData',
  get: ({ get }) => {
    const data = get(studyProgramDataState);
    // return to [{ value: id, label: name}]
    return data.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
  },
});
