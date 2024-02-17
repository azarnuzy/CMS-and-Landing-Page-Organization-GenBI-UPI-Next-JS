import { atom } from 'recoil';

import { TOptionManagementsData } from '@/types/managements';

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

export const selectedOptionManagementState = atom<string>({
  key: 'selectedOptionManagementState',
  default: '23.24',
});
