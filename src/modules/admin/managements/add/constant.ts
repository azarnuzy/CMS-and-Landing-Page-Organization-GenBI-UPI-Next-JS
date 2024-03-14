import { z } from 'zod';

import { ValidationSchemaAddManagementForm } from '@/lib/validations/managements';

import { TPostManagamentPayload } from '@/types/managements';

export const breadcrumbAddManagementsData = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Appreciations',
    link: '/admin/appreciations',
  },
  {
    name: 'Add Appreciations',
    link: '/admin/appreciations/add',
  },
];

export const defaultValuesAddManagements: TPostManagamentPayload = {
  name: '',
  description: '',
  is_active: false,
  mission: [
    {
      value: '',
    },
  ],
  period_end_date: undefined,
  period_start_date: undefined,
  period_year: '',
  photo: undefined,
  video: undefined,
  vision: '',
};

export function addFormDataManagement(
  data: z.infer<typeof ValidationSchemaAddManagementForm>
): FormData {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('vision', data.vision);
  formData.append('period_year', data.period_year);
  formData.append('period_start_date', data.period_start_date.toISOString());
  formData.append('period_end_date', data.period_end_date.toISOString());
  formData.append('is_active', String(data.is_active));
  formData.append('photo', data.photo[0]);
  formData.append('video', data.video[0]);

  // translate data.missions to array of string
  const missions = data?.missions?.map((mission) => mission.value);

  formData.append('mission', JSON.stringify(missions));

  return formData;
}
