import { z } from 'zod';

import { ValidationSchemaAddEventForm } from '@/lib/validations/event';

import { TAddEventPayload } from '@/types/events';

export const breadcrumbAddEventsData = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Events',
    link: '/admin/events',
  },
  {
    name: 'Add Events',
    link: '/admin/events/add',
  },
];

export const addEventsDefaultValues: TAddEventPayload = {
  title: '',
  type: '',
  description: '',
  start_date: '',
  end_date: '',
  location: '',
  banner: undefined,
  contact: '',
  end_reg_date: undefined,
  poster: undefined,
  scope: undefined,
  start_reg_date: undefined,
  tags: [''],
  thumbnail: undefined,
  location_url: '',
  program_id: undefined,
  registration_link: '',
};

export function AddEventFormData(
  data: z.infer<typeof ValidationSchemaAddEventForm>
): FormData {
  const formData = new FormData();

  formData.append('title', data.title);
  formData.append('type', data.type);
  formData.append('description', data.description);
  formData.append('start_date', String(data.start_date));
  formData.append('start_reg_date', String(data.start_reg_date));
  formData.append('end_reg_date', String(data.end_reg_date));
  formData.append('location', data.location);
  formData.append('contact', data.contact);
  formData.append('scope', data.scope);
  formData.append('tags', JSON.stringify(data.tags));
  formData.append('thumbnail', data.thumbnail[0]);
  formData.append('poster', data.poster[0]);
  formData.append('banner', data.banner[0]);

  if (data.program_id) {
    formData.append('program_id', String(data.program_id));
  }

  if (data.end_date) {
    formData.append('end_date', String(data.end_date));
  }

  if (data.location_url) {
    formData.append('location_url', String(data.location_url));
  }

  if (data.registration_link) {
    formData.append('registration_link', String(data.registration_link));
  }

  return formData;
}
