import { TAddDepartmentPayload } from '@/types/departments';

export const breadcrumbAddDepartmentData = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Department',
    link: '/admin/department',
  },
  {
    name: 'Add Department',
    link: '/admin/department/add',
  },
];

export const defaultValuesAddDepartment: TAddDepartmentPayload = {
  name: '',
  description: '',
  cover: undefined,
  management_id: undefined,
};
