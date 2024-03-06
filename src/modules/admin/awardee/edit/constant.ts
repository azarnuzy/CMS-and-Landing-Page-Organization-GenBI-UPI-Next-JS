import { TAwardeeDetailData } from '@/types/awardees';

export const breadcrumbEditAwardeeData = (id: string) => [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Awardee',
    link: '/admin/awardee',
  },
  {
    name: 'Edit',
    link: `/admin/awardee/edit/${id}`,
  },
];

export const defaultValuesAwardeeEditData = {
  name: '',
  birth_date: undefined,
  member_since: undefined,
  scholarship: undefined,
  year: '',
  nim: '',
  study_program_id: undefined,
  linkedin_username: '',
  instagram_username: '',
  telp: '',
  photo: undefined,
  transcript: undefined,
  smt1_ip: undefined,
  smt2_ip: undefined,
  smt3_ip: undefined,
  smt4_ip: undefined,
  smt5_ip: undefined,
  smt6_ip: undefined,
  smt7_ip: undefined,
  smt8_ip: undefined,
  smt1_ipk: undefined,
  smt2_ipk: undefined,
  smt3_ipk: undefined,
  smt4_ipk: undefined,
  smt5_ipk: undefined,
  smt6_ipk: undefined,
  smt7_ipk: undefined,
  smt8_ipk: undefined,
};

export const defaultValuesPutAwardee = (data: TAwardeeDetailData) => {
  return {
    name: data?.name || '',
    birth_date: new Date(data?.birth_date) || new Date(),
    member_since: new Date(data?.member_since) || new Date(),
    scholarship: data?.scholarship || 0,
    year: data?.year || '',
    nim: data?.nim || '',
    study_program_id: data?.study_program_id || 0,
    linkedin_username: data?.linkedin_username || '',
    instagram_username: data?.instagram_username || '',
    telp: data?.telp || '',
    smt1_ip: Number(data?.ip1),
    smt2_ip: Number(data?.ip2),
    smt3_ip: Number(data?.ip3),
    smt4_ip: Number(data?.ip4),
    smt5_ip: Number(data?.ip5),
    smt6_ip: Number(data?.ip6),
    smt7_ip: Number(data?.ip7),
    smt8_ip: Number(data?.ip8),
    smt1_ipk: Number(data?.ipk1),
    smt2_ipk: Number(data?.ipk2),
    smt3_ipk: Number(data?.ipk3),
    smt4_ipk: Number(data?.ipk4),
    smt5_ipk: Number(data?.ipk5),
    smt6_ipk: Number(data?.ipk6),
    smt7_ipk: Number(data?.ipk7),
    smt8_ipk: Number(data?.ipk8),
  };
};
