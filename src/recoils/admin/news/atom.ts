import { atom } from 'recoil';

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
