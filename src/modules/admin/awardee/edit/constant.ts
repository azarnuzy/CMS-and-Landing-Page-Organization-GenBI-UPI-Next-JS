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
  full_name: '',
  birth_date: new Date(),
  member_since: new Date(),
  total_scholarship: 0,
  year: 0,
  nim: '',
  study_program: '',
  linkedin: '',
  instagram: '',
  ip1: '',
  ip2: '',
  ip3: '',
  ip4: '',
  ip5: '',
  ip6: '',
  ip7: '',
  ip8: '',
};
