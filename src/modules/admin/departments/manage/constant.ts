export const breadcrumbManageDepartmentData = (id: string) => [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Department',
    link: '/admin/department',
  },

  {
    name: 'Manage Department',
    link: '/admin/department/manage/' + id,
  },
];

export const defaultHTMLContent = `<p>Membangun citra positif organisasi melalui pengelolaan media sosial GenBI UPI sebagai media informasi dan komunikasi.&nbsp;</p>
<ul>
    <li><strong>Creative Division</strong>: divisi yang bertugas untuk mengelola sosial media dan mengembangkan website GenBI UPI.</li>
    <li><strong>ABC Division</strong>: divisi yang bertugas membuat konten yang diperlukan di sosial media GenBI UPI.</li>
</ul>`;

export const programsDepartmentConstant = [
  {
    title: 'GenBI Awarding',
    description: 'Memberikan apresiasi best manager, best leader, best staff ',
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
];
