import { atom } from 'recoil';

export const inputTagState = atom<string[]>({
  key: 'inputTagState',
  default: [],
});

export const inputUploadState = atom<string>({
  key: 'inputUploadState',
  default: '',
});
