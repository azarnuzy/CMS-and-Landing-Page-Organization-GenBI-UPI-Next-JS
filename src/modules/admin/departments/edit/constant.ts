import { TDepartmentByIdData } from '@/types/departments';

export const breadcrumbEditDepartmentData = (id: number) => [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Department',
    link: '/admin/department',
  },
  {
    name: 'Edit Department',
    link: `/admin/department/edit/${id}`,
  },
];

export const defaultValuesEditDepartment = (data: TDepartmentByIdData) => {
  return {
    name: data?.department?.name,
    description: data?.department?.description,
    cover: undefined,
    management_id: data?.department?.management.id,
  };
};
