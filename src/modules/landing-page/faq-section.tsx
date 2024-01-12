import Image from 'next/image';
import React from 'react';

import BaseLayout from '@/components/layouts/base';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const requirementData = [
  'Biodata Mahasiswa;',
  'Fotocopy KTM dan KTP yang masil berlaku;',
  'Program Studi : Manajemen, Akuntansi, Ilmu Ekonomi dan Keuangan Islam, Pendidikan Manajemen Bisnis,',
  'Pendidikan Ekonomi dan Koperasi, Ilmu Komunikasi, Ilmu Komputer, Pendidikan Akuntansi, Pendidikan Ilmu Pengetahuan Sosial, Pendidikan Manajemen Perkantoran, Matematika, dan Pendidikan Ilmu Komputer;',
  'Telah menyelesaikan minimal 40 SKS (dibuktikan dengan transkrip nilai);',
  'Memiliki Indeks Prestasi (IP) minimal 3.00 (dibuktikan dengan Kartu Hasil Studi terakhir);',
  'Usia Maksimal 23 tahun pada saat menerima beasiswa;',
  'Tidak sedang menerima dana beasiswa dari sumber lain atau berada dalam status ikatan dinas dari',
  'lembaga/instansi lain, dibuktikan dengan surat rekomendasi yang ditanda tangani oleh Wakil Dekan Bidang Kemahasiswaan;',
  'Membuat motivation letter (dalam Bahasa Indonesia);',
  'Menyertakan surat rekomendasi dari 1 tokoh (akademik atau non – akademik);',
  'Memiliki minat dan pengalaman menjalankan aktivitas sosial yang mempunyai dampak kebermanfaatan bagi masyarakat;',
  'Bersedia berperan aktif dalam Generasi Baru Indonesia (GENBI) dan berpartisipasi dalam kegiatan yang diselenggarakan Bank Indonesia;',
  'Semua berkas berkas dikirim ke Direktorat Kemahasiswaan paling lambat tanggal 24 Februari 2023;',
];

const FaqSection = () => {
  return (
    <div
      className='min-h-[60vh] w-full relative'
      style={{
        background:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #9DBAE9 100%)',
      }}
    >
      <Image
        src='/svg/bg-faq.svg'
        alt='bg-faq'
        className='absolute bottom-0 object-cover z-0 w-full h-full'
        width={0}
        height={0}
        sizes='40vw'
      />
      <BaseLayout>
        <div className='flex flex-col gap-14 relative z-[2]'>
          <h1 className='text-balance'>
            <span className='text-primary-main'>Temukan Jawaban</span> Untuk{' '}
            <br />
            Pertanyaan yang Sering Diajukan
          </h1>
          <div className='p-6 rounded-2xl shadow-md bg-white'>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger className='text-lg text-neutral-main font-semibold'>
                  Kapan Beasiswa BI membuka pendaftaran?
                </AccordionTrigger>
                <AccordionContent className='text-primary-600'>
                  Setiap bulan Februari dan Agustus (apabila tidak ada perubahan
                  kebijakan dari BI)
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-2'>
                <AccordionTrigger className='text-lg text-neutral-main font-semibold'>
                  Apa saja persyaratan yang diperlukan?
                </AccordionTrigger>
                <AccordionContent className='text-primary-600'>
                  <p>
                    Dengan ini kami sampaikan daftar persyaratan pengajuan calon
                    pengganti Beasiswa Bank Indonesia:
                  </p>
                  <ul className='list-decimal pl-5'>
                    {requirementData.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='item-3'>
                <AccordionTrigger className='text-lg text-neutral-main font-semibold'>
                  Berapa biaya bantuan pendidikan yang BI berikan?
                </AccordionTrigger>
                <AccordionContent className='text-primary-600'>
                  <p>Rp6.000.000/semester</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className='p-6 rounded-2xl shadow-md bg-white'></div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default FaqSection;
