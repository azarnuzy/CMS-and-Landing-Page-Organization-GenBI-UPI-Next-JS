import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

import {
  addEventRequest,
  deleteEventRequest,
  getAllEvents,
  getDetailEvent,
  getEventOptionRequest,
  getEventParticipants,
  getEventScopesRequest,
  getEventTypesRequest,
  getOptionEventParticipantsField,
  getOptionEventParticipantsRole,
  getSearchEvent,
  getStatusEventRequest,
  putEventRequest,
  registrationEventRequest,
  updateRegistrationEventRequest,
} from '@/hooks/events/request';

import { TMetaErrorResponse } from '@/types';
import {
  TAddEventPayload,
  TDataAddEventResponse,
  TDataDeleteEventResponse,
  TDataGetAllEventResponse,
  TDataGetDetailEventResponse,
  TDataGetEventScopesResponse,
  TDataGetEventTypesResponse,
  TDataGetOptionEventParticipantsFieldsResponse,
  TDataGetOptionEventParticipantsRolesResponse,
  TDataGetStatusEventResposne,
  TDataPutEventResponse,
  TDataRegistrationEventResponse,
  TDataUpdateRegistrationEventResponse,
  TPutEventPayload,
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
    queryKey: ['get-detail-event', id],
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

export const useAddEvent = (): UseMutationResult<
  TDataAddEventResponse,
  TMetaErrorResponse,
  TAddEventPayload
> => {
  return useMutation<
    TDataAddEventResponse,
    TMetaErrorResponse,
    TAddEventPayload
  >({
    mutationKey: ['add-event'],
    mutationFn: async (payload: TAddEventPayload) => {
      const response = await addEventRequest(payload);
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const usePutEvent = (): UseMutationResult<
  TDataPutEventResponse,
  TMetaErrorResponse,
  { payload: TPutEventPayload; id: number }
> => {
  return useMutation<
    TDataPutEventResponse,
    TMetaErrorResponse,
    { payload: TPutEventPayload; id: number }
  >({
    mutationKey: ['put-event'],
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: TPutEventPayload;
      id: number;
    }) => {
      const response = await putEventRequest({ payload, id });
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const useDeleteEvent = (): UseMutationResult<
  TDataDeleteEventResponse,
  TMetaErrorResponse,
  number
> => {
  return useMutation<TDataDeleteEventResponse, TMetaErrorResponse, number>({
    mutationKey: ['delete-event'],
    mutationFn: async (id) => {
      const response = await deleteEventRequest(id);
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const useGetEventParticipants = (
  id: number
): UseQueryResult<
  TDataGetOptionEventParticipantsRolesResponse,
  TMetaErrorResponse
> => {
  return useQuery({
    queryKey: ['get-event-participants', id],
    queryFn: async () => await getEventParticipants(id),
  });
};

export const useGetEventStatus = (): UseQueryResult<
  TDataGetStatusEventResposne,
  TMetaErrorResponse
> => {
  return useQuery({
    queryKey: ['get-event-status'],
    queryFn: async () => await getStatusEventRequest(),
  });
};
export const useGetEventTypes = (): UseQueryResult<
  TDataGetEventTypesResponse,
  TMetaErrorResponse
> => {
  return useQuery({
    queryKey: ['get-event-types'],
    queryFn: async () => await getEventTypesRequest(),
  });
};
export const useGetEventScopes = (): UseQueryResult<
  TDataGetEventScopesResponse,
  TMetaErrorResponse
> => {
  return useQuery({
    queryKey: ['get-event-scopes'],
    queryFn: async () => await getEventScopesRequest(),
  });
};
