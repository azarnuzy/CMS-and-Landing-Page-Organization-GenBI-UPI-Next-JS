import { TAddProgramPayload } from '@/types/program';

export const breadcrumbManageDepartmentData = (id: string) => [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Department',
    link: '/admin/department',
  },

  {
    name: 'Manage Department',
    link: '/admin/department/manage/' + id,
  },
];

export const defaultAddProgramData = {
  name: '',
  description: '',
  type: '',
  implementation_desc: '',
  date_start: undefined,
  date_end: undefined,
  department_id: undefined,
  programType: '',
};
export const defaultEditProgramData = (
  data: TAddProgramPayload
): TAddProgramPayload => {
  return {
    name: data.name,
    description: data.description,
    type: data.type,
    implementation_desc: data.implementation_desc,
    date_start: data.date_start,
    date_end: data.date_end,
    department_id: data.department_id,
  };
};
