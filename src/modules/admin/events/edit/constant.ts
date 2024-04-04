import { z } from 'zod';

import { ValidationSchemaPutEventForm } from '@/lib/validations/event';

import { TDetailEventData, TPutEventPayload } from '@/types/events';

export const breadcrumbEditEventsData = (id: string) => [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Events',
    link: '/admin/events',
  },
  {
    name: 'Edit Events',
    link: `/admin/events/edit/${id}`,
  },
];

export const defaultValuesPutEvent = (data: TDetailEventData) => {
  return {
    title: data?.event?.title || '',
    type: data?.event?.type || '',
    description: data?.event?.description || '',
    start_date: new Date(data?.event?.start_date) || undefined,
    end_date: new Date(data?.event?.end_date) || undefined,
    location: data?.event?.location || '',
    contact: data?.event?.contact || '',
    end_reg_date: new Date(data?.event?.end_reg_date) || undefined,
    scope: data?.event?.scope || undefined,
    start_reg_date: new Date(data?.event?.start_reg_date) || undefined,
    location_url: data?.event?.location_url || '',
    // program_id: data?.event?.program_id || undefined,
    registration_link: data?.event?.registration_link || '',
  };
};

export const putPayloadEvent = (
  data: z.infer<typeof ValidationSchemaPutEventForm>
): TPutEventPayload => {
  return {
    title: data.title,
    type: data.type,
    description: data.description,
    start_date: data.start_date,
    end_date: data.end_date,
    location: data.location,
    location_url: data.location_url,
    registration_link: data.registration_link,
    start_reg_date: data.start_reg_date,
    end_reg_date: data.end_reg_date,
    contact: data.contact,
  };
};
