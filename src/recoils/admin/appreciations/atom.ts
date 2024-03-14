import { atom } from 'recoil';

export const parentRefAdminAppreciationsState =
  atom<React.RefObject<HTMLTableElement> | null>({
    key: 'parentRefAdminAppreciationsState',
    default: null,
  });
