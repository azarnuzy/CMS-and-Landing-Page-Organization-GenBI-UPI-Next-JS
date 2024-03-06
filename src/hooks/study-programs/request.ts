import { api } from '@/lib/api';

import { TDataGetAllStudyProgramResponse } from '@/types/study-programs';

export const getAllStudyPrograms =
  async (): Promise<TDataGetAllStudyProgramResponse> => {
    const { data } = await api.get(`/v1/study_programs`);

    return data;
  };
