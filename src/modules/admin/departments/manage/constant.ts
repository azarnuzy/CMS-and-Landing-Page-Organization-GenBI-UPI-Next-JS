import { TMetaResponse } from '@/types';
import {
  Awardee2Department,
  StructureAwardeeDepartment,
} from '@/types/departments';
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

export const defaultProgramDetail = {
  id: 3,
  name: 'Kabar GenBI',
  description: 'Memberikan informasi hari besar dan kabar duka.',
  type: 'Conditional',
  implementation_desc:
    '1 Periode (Januari - Oktober) menyesuaikan tanggal hari besar atau berita duka',
  date_start: '2023-12-01',
  date_end: '2024-11-30',
  department_id: 2,
  management_id: 5,
  createdAt: '2024-03-02T19:43:24.270Z',
  updatedAt: '2024-03-02T19:43:24.270Z',
  department: {
    id: 2,
    name: 'Marketing',
  },
  management: {
    id: 5,
    name: 'GenBI UPI 2023-2024',
    period_year: '23.24',
  },
};

export const defaultAwardeeDataFilterded: StructureAwardeeDepartment = {
  manager: {
    id: 0,
    awardee_id: 0,
    name: '',
    linkedin_username: '',
    instagram_username: '',
    department: '',
    photo: {
      alt: '',
      file_url: '',
      caption: '',
      mimetype: '',
      id: 0,
    },
    position: '',
    created_at: '',
    updated_at: '',
  },
  awardees: [
    {
      id: 0,
      name: '',
      description: '',
      awardees: [
        {
          id: 5,
          awardee_id: 0,
          name: '',
          linkedin_username: '',
          instagram_username: '',
          photo: {
            id: 0,
            alt: '',
            file_url: '',
            caption: '',
            mimetype: '',
          },
          division: '',
          position: '',
        },
      ],
    },
  ],
};

export const filtededAwardeeData = (
  data: StructureAwardeeDepartment
): TMetaResponse<Awardee2Department> => {
  let manager = <Array<Awardee2Department>>[];

  if (data.manager) {
    manager = [
      {
        id: data?.manager?.id || 0,
        awardee_id: data?.manager?.awardee_id || 0,
        name: data?.manager?.name || '',
        linkedin_username: data?.manager?.linkedin_username || '',
        instagram_username: data?.manager?.instagram_username || '',
        photo: data?.manager?.photo || '',
        division: '-',
        position: data?.manager?.position || '',
      },
    ];
  }

  let awardeeByDivision = <Awardee2Department[]>[];

  if (data?.awardees) {
    const tempData = data?.awardees
      ?.map((item) => {
        const temp = item?.awardees
          ?.filter((item) => !item.position.includes('Manager'))
          .map((awardeeData) => {
            return {
              id: awardeeData?.id || 0,
              awardee_id: awardeeData?.awardee_id || 0,
              name: awardeeData?.name || '',
              linkedin_username: awardeeData?.linkedin_username || '',
              instagram_username: awardeeData?.instagram_username || '',
              photo: awardeeData?.photo || '',
              division: awardeeData?.division || '',
              position: awardeeData?.position || '',
            };
          });

        return temp;
      })
      .flat();

    awardeeByDivision = tempData || [];
  }

  return {
    data: [...manager, ...awardeeByDivision],
    message: 'Success',
    status: '200',
  };
};
