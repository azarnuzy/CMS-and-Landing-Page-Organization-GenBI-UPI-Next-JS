import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

import {
  getAllEvents,
  getDetailEvent,
  getEventOptionRequest,
  getOptionEventParticipantsField,
  getOptionEventParticipantsRole,
  getSearchEvent,
  registrationEventRequest,
  updateRegistrationEventRequest,
} from '@/hooks/events/request';

import { TMetaErrorResponse } from '@/types';
import {
  TDataGetAllEventResponse,
  TDataGetDetailEventResponse,
  TDataGetOptionEventParticipantsFieldsResponse,
  TDataGetOptionEventParticipantsRolesResponse,
  TDataRegistrationEventResponse,
  TDataUpdateRegistrationEventResponse,
  TRegistrationEventPayload,
} from '@/types/events';
import { TUserParams } from '@/types/users';

export const useGetAllEvent = ({
  sort,
  type,
  limit,
  page,
  filter,
}: {
  sort: string;
  type: string;
  limit: number;
  page: number;
  filter?: string;
}): UseQueryResult<TDataGetAllEventResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['all-event', sort, type, limit, page, filter],
    queryFn: async () =>
      await getAllEvents({ sort, type, limit, page, filter }),
  });

export const useGetSearchEvent = ({
  keyword,
}: {
  keyword: string;
}): UseQueryResult<TDataGetAllEventResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['search-event', keyword],
    queryFn: async () => await getSearchEvent(keyword),
  });

export const useGetDetailEvent = ({
  id,
}: {
  id: number;
}): UseQueryResult<TDataGetDetailEventResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['get-detail-post', id],
    queryFn: async () => await getDetailEvent(id),
  });

export const useGetEventOptions = (
  params: TUserParams
): UseQueryResult<TDataGetAllEventResponse, TMetaErrorResponse> => {
  const { sort, type, limit, page, options } = params;
  return useQuery({
    queryKey: ['all-event-options', sort, type, limit, page, options],
    queryFn: async () => await getEventOptionRequest(params),
  });
};

export const useRegistrationEvent = (): UseMutationResult<
  TDataRegistrationEventResponse,
  TMetaErrorResponse,
  TRegistrationEventPayload
> => {
  return useMutation<
    TDataRegistrationEventResponse,
    TMetaErrorResponse,
    TRegistrationEventPayload
  >({
    mutationKey: ['registration-event'],
    mutationFn: async (payload: TRegistrationEventPayload) => {
      const response = await registrationEventRequest(payload);
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const useUpdateRegistrationEvent = (): UseMutationResult<
  TDataUpdateRegistrationEventResponse,
  TMetaErrorResponse,
  { payload: TRegistrationEventPayload; id: number }
> => {
  return useMutation<
    TDataUpdateRegistrationEventResponse,
    TMetaErrorResponse,
    { payload: TRegistrationEventPayload; id: number }
  >({
    mutationKey: ['update-registration-event'],
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: TRegistrationEventPayload;
      id: number;
    }) => {
      const response = await updateRegistrationEventRequest({ payload, id });
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const useGetOptionEventParticipantsRoles = (): UseQueryResult<
  TDataGetOptionEventParticipantsRolesResponse,
  TMetaErrorResponse
> => {
  return useQuery({
    queryKey: ['get-option-event-participants-roles'],
    queryFn: async () => await getOptionEventParticipantsRole(),
  });
};

export const useGetOptionEventParticipantsFields = (): UseQueryResult<
  TDataGetOptionEventParticipantsFieldsResponse,
  TMetaErrorResponse
> => {
  return useQuery({
    queryKey: ['get-option-event-participants-fields'],
    queryFn: async () => await getOptionEventParticipantsField(),
  });
};
