export const translateImage = (name: string) => {
  switch (name) {
    case 'marketing':
      return 'marketing.png';
    case 'economic':
      return 'economic.png';
    case 'healthcare':
      return 'healthcare.png';
    case 'human-resource':
      return 'hr.png';
    case 'education':
      return 'education.png';
    case 'social-environment':
      return 'socen.png';
    default:
      return 'marketing.png';
  }
};

export const translateTitleDepartment = (name: string) => {
  switch (name) {
    case 'marketing':
      return 'Marketing';
    case 'economic':
      return 'Economic';
    case 'healthcare':
      return 'Healthcare';
    case 'human-resource':
      return 'Human Resource';
    case 'education':
      return 'Education';
    case 'social-environment':
      return 'Social & Environment';
    default:
      return 'Marketing';
  }
};

export const BreadcrumbDepartmentData = (name: string) => {
  return [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'Tentang GenBI UPI',
      link: '/tentang-genbi/upi',
    },
    {
      name: translateTitleDepartment(name),
      link: `/tentang-genbi/upi/${name}`,
    },
  ];
};

export const dataDepartment = {
  description:
    'Membangun citra positif organisasi melalui pengelolaan media sosial GenBi UPI sebagai media informasi dan komunikasi.',
  division: [
    {
      name: 'Creative Division',
      description:
        'divisi yang bertugas untuk mengelola sosial media dan website GenBi UPI',
      members: [
        {
          name: 'Nama Anggota',
          position: 'Staff Creative Division',
        },
        {
          name: 'Nama Anggota',
          position: 'Staff Creative Division',
        },
        {
          name: 'Nama Anggota',
          position: 'Staff Creative Division',
        },
        {
          name: 'Nama Anggota',
          position: 'Staff Creative Division',
        },
        {
          name: 'Nama Anggota',
          position: 'Staff Creative Division',
        },
        {
          name: 'Nama Anggota',
          position: 'Staff Creative Division',
        },
      ],
    },
    {
      name: 'ABC Division',
      description:
        'divisi yang bertugas membuat konten yang diperlukan untuk publikasi di sosial media dan website GenBi UPI',
      members: [
        {
          name: 'Nama Anggota',
          position: 'Staff ABC Division',
        },
        {
          name: 'Nama Anggota',
          position: 'Staff ABC Division',
        },
        {
          name: 'Nama Anggota',
          position: 'Staff ABC Division',
        },
        {
          name: 'Nama Anggota',
          position: 'Staff ABC Division',
        },
      ],
    },
  ],
  manager: {
    name: 'Nama Manager',
    position: 'Manager Marketing Department',
    image: '/images/ceo.png',
    instagram: 'instagram.com/username',
    linkedin: 'linkedin.com/username',
  },
  programs: [
    {
      title: 'GenBI Awarding',
      description:
        'Memberikan apresiasi best manager, best leader, best staff ',
      date: '[Tanggal 7 disetiap bulan selama 1 Periode (Januari - November)]',
    },
    {
      title: 'GenBI Birthday',
      description: 'Mengucapkan hari ulang tahun warga GenBI UPI[1 Periode ',
      date: '(Januari - November) menyesuaikan tanggal lahir]',
    },
    {
      title: 'Kabar GenBI',
      description: 'Memberikan informasi hari besar dan kabar duka [1 Periode ',
      date: '(Januari - November) menyesuaikan tanggal hari besar atau berita duka]',
    },
    {
      title: 'Website GenBI',
      description:
        'Membuat website sebagai sumber penyebaran informasi dari GenBI UPI ',
      date: '[1 Periode (Januari - November)]',
    },
    {
      title: 'GenBI Tips',
      description:
        'Memberikan informasi tips beasiswa dan tips tentang bank indonesia ',
      date: '[1 Periode (Januari - November) menyesuaikan tanggal yang telah disepakati]',
    },
    {
      title: 'GenBI Sharing',
      description: 'Memberikan informasi tentang kegiatan GenBIUPI [1 Periode ',
      date: '(Januari - November) menyesuaikan tanggal pelaksanaan acara atau kegiatan]',
    },
    {
      title: 'GenBI Bangga',
      description:
        'Memberikan apresiasi terkait pencapaian warga genbi upi, misalnya juara lomba & graduation. ',
      date: '[Tanggal 28 setiap bulan selama 1 Periode (Januari - November)]',
    },
  ],
};
