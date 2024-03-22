export const breadCrumbGenBIBanggaData = (param: string, title: string) => {
  return [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'Acara GenBI UPI',
      link: '/acara',
    },
    {
      name: title,
      link: `/acara/${param}`,
    },
  ];
};

export const defaultRegistrationEvent = {
  name: '',
  email: '',
  institution: '',
  role: '',
  field: '',
  telp: '',
  city: '',
};
