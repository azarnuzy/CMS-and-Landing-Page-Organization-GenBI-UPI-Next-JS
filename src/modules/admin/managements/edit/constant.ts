import { z } from 'zod';

import { ValidationSchemaUpdateManagementForm } from '@/lib/validations/managements';

import {
  TActiveManagementsData,
  TPutManagamentPayload,
} from '@/types/managements';

export const breadcrumbEditManagementsData = (id: string) => [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Managements',
    link: '/admin/managements',
  },
  {
    name: 'Edit Managements',
    link: `/admin/managements/edit/${id}`,
  },
];

export const defaultValuesUpdateManagements = (
  data: TActiveManagementsData
): TPutManagamentPayload => {
  return {
    name: data?.management.name || '',
    description: data?.management.description || '',
    vision: data?.management.vision || '',
    period_year: data?.management.period_year || '',
    period_start_date:
      new Date(data?.management.period_start_date) || undefined,
    period_end_date: new Date(data?.management.period_end_date) || undefined,
    is_active: data?.management.is_active || false,
    photo: undefined,
    video: undefined,
    mission: data?.management.mission.map((item) => ({ value: item })) || [
      { value: '' },
    ],
  };
};

export function updateFormDataManagement(
  data: z.infer<typeof ValidationSchemaUpdateManagementForm>
): FormData {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('vision', data.vision);
  formData.append('period_year', data.period_year);
  formData.append('period_start_date', data.period_start_date.toISOString());
  formData.append('period_end_date', data.period_end_date.toISOString());
  formData.append('is_active', String(data.is_active));
  if (data?.photo !== undefined) {
    formData.append('photo', data.photo[0]);
  }
  if (data?.video !== undefined) {
    formData.append('video', data.video[0]);
  }

  // translate data.missions to array of string
  const missions = data?.mission?.map((mission) => mission.value);

  formData.append('mission', JSON.stringify(missions));

  return formData;
}
