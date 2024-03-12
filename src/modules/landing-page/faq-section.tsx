import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { ValidationSchemaSuggestionForm } from '@/lib/validations/landing-page';
import { usePostContactUs } from '@/hooks/landing-page/hook';

import BaseLayout from '@/components/layouts/base';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
  const form = useForm<z.infer<typeof ValidationSchemaSuggestionForm>>({
    resolver: zodResolver(ValidationSchemaSuggestionForm),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const { mutate } = usePostContactUs();

  const onSubmit = (data: z.infer<typeof ValidationSchemaSuggestionForm>) => {
    mutate(data, {
      onSuccess: () => {
        toast.success(
          `Pesan berhasil dikirim, balasan akan dikirim ke email ${data.email}`
        );
        form.reset();
        form.setValue('name', '');
        form.setValue('email', '');
        form.setValue('message', '');
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || 'Gagal mengirim pesan');
      },
    });
  };

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
          <div className='p-6 rounded-2xl shadow-md bg-white flex flex-col sm:flex-row gap-4 sm:gap-14'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col gap-4 w-full order-2 sm:order-1'
              >
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem className='grid w-full items-center gap-1.5'>
                        <FormLabel>Nama</FormLabel>
                        <FormControl>
                          <Input {...field} type='text' placeholder='Nama' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem className='grid w-full items-center gap-1.5'>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type='email' placeholder='Email' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='message'
                  render={({ field }) => (
                    <FormItem className='grid w-full items-center gap-1.5'>
                      <FormLabel>Pertanyaan</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder='Pertanyaan' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className='text-neutral-500'>
                  Jawaban akan dikirim melalui email
                </p>
                <Button
                  type='submit'
                  variant='default'
                  className='rounded-full bg-warning-main text-white w-full hover:bg-warning-600'
                >
                  Kirim Pesan
                </Button>
              </form>
            </Form>
            <div className='w-full sm:w-fit whitespace-nowrap order-1 sm:order-2 sm:text-end'>
              <h2>
                <span className='text-primary-main'>Punya Pertanyaan</span>
              </h2>
              <h2>atau Pesan Untuk GenBI?</h2>
            </div>
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default FaqSection;
