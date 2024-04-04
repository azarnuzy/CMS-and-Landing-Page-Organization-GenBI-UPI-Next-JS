import { api } from '@/lib/api';

import {
  TAddEventPayload,
  TDataAddEventResponse,
  TDataDeleteEventResponse,
  TDataGetAllEventResponse,
  TDataGetDetailEventResponse,
  TDataGetOptionEventParticipantsFieldsResponse,
  TDataGetOptionEventParticipantsRolesResponse,
  TDataPutEventResponse,
  TDataRegistrationEventResponse,
  TDataUpdateRegistrationEventResponse,
  TGetAllEventParams,
  TPutEventPayload,
  TRegistrationEventPayload,
} from '@/types/events';
import { TUserParams } from '@/types/users';

export const getAllEvents = async (
  params: TGetAllEventParams
): Promise<TDataGetAllEventResponse> => {
  const { sort, type, limit, page, filter } = params;

  const { data } = await api.get(`v1/events`, {
    params: {
      sort,
      type,
      limit,
      page,
      filter,
    },
  });

  return data;
};

export const getSearchEvent = async (
  keyword: string
): Promise<TDataGetAllEventResponse> => {
  const { data } = await api.get(`v1/events/search?keyword=${keyword}`);

  return data;
};

export const getDetailEvent = async (
  id: number
): Promise<TDataGetDetailEventResponse> => {
  const { data } = await api.get(`v1/events/${id}`);

  return data;
};

export const getEventOptionRequest = async (
  params: TUserParams
): Promise<TDataGetAllEventResponse> => {
  const { data } = await api.get('v1/events', {
    params,
  });

  return data;
};

export const registrationEventRequest = async (
  payload: TRegistrationEventPayload
): Promise<TDataRegistrationEventResponse> => {
  const { data } = await api.post(`v1/event_participants`, payload);

  return data;
};

export const updateRegistrationEventRequest = async ({
  id,
  payload,
}: {
  id: number;
  payload: TRegistrationEventPayload;
}): Promise<TDataUpdateRegistrationEventResponse> => {
  const { data } = await api.put(`v1/event_participants/${id}`, payload);

  return data;
};

export const getOptionEventParticipantsRole =
  async (): Promise<TDataGetOptionEventParticipantsRolesResponse> => {
    const { data } = await api.get(`v1/event_participants/roles`);

    return data;
  };

export const getOptionEventParticipantsField =
  async (): Promise<TDataGetOptionEventParticipantsFieldsResponse> => {
    const { data } = await api.get(`v1/event_participants/fields`);

    return data;
  };

export const addEventRequest = async (
  payload: TAddEventPayload
): Promise<TDataAddEventResponse> => {
  const { data } = await api({
    method: 'post',
    url: 'v1/events',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: payload,
  });
  return data;
};

export const putEventRequest = async ({
  payload,
  id,
}: {
  payload: TPutEventPayload;
  id: number;
}): Promise<TDataPutEventResponse> => {
  const { data } = await api.put(`v1/events/${id}`, payload);

  return data;
};

export const deleteEventRequest = async (
  id: number
): Promise<TDataDeleteEventResponse> => {
  const { data } = await api.delete(`v1/events/${id}`);
  return data;
};
