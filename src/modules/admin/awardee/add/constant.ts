import { TAwardeeAddPayload } from '@/types/awardees';

export const breadcrumbAddAwardeeData = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Awardee',
    link: '/admin/awardee',
  },
  {
    name: 'Add Awardee',
    link: '/admin/awardee/add',
  },
];

export const defaultValuesAddAwardee: TAwardeeAddPayload = {
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
