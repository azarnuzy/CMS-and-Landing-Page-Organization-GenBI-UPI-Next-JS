import { api } from '@/lib/api';

import { TDataGetOptionManagement } from '@/types/managements';

// import { TManagementDataResponse } from '@/types/managements';

// export const getManagementRequest = async (
//   year: string
// ): Promise<TManagementDataResponse> => {
//   const { data } = await api.get(`/v1/managements/active?year=${year}`);

//   return data;
// };
export const getOptionManagements =
  async (): Promise<TDataGetOptionManagement> => {
    const { data } = await api.get(`/v1/managements?options=true`);

    return data;
  };
