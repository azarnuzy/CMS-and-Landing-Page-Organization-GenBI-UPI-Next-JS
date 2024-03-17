import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Check, ChevronsUpDown, Trash } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuPlus } from 'react-icons/lu';
import { MdDelete } from 'react-icons/md';
import { toast } from 'sonner';
import { z } from 'zod';

import 'react-day-picker/dist/style.css';

import { cn } from '@/lib/utils';
import { ValidationSchemaAddAwardeeToManagementForm } from '@/lib/validations/department';
import {
  useAddAwardeeToManagement,
  useDeleteAwardeeToManagement,
} from '@/hooks/departments/hook';
import { useGetOptionsPosition } from '@/hooks/position/hook';
import { useGetUserOptions } from '@/hooks/users/hook';

import MiniSpinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { filtededAwardeeData } from '@/modules/admin/departments/manage/constant';
import { usersGetOptionParams } from '@/modules/admin/news/add/constant';

import {
  TAddAwardeeToManagementPayload,
  TDepartmentByIdData,
} from '@/types/departments';
import { TDataGetUsersOptionResponse, TUserOptionsData } from '@/types/users';

const AwardeeSection = ({ data }: { data: TDepartmentByIdData }) => {
  const { mutate, status } = useAddAwardeeToManagement();
  const { mutate: mutateDelete, status: statusDelete } =
    useDeleteAwardeeToManagement();
  const { id } = useParams();

  const { data: dataAwardee }: TDataGetUsersOptionResponse =
    useGetUserOptions(usersGetOptionParams);
  const { data: dataPosition } = useGetOptionsPosition();

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [getIdDelete, setIdDelete] = useState({
    id_management: 0,
    id_awardee: 0,
  });

  const form = useForm<
    z.infer<typeof ValidationSchemaAddAwardeeToManagementForm>
  >({
    resolver: zodResolver(ValidationSchemaAddAwardeeToManagementForm),
  });

  const queryClient = useQueryClient();

  const onSubmitAdd = (
    dataAdd: z.infer<typeof ValidationSchemaAddAwardeeToManagementForm>
  ) => {
    const payload = {
      ...dataAdd,
      department_id: Number(id),
      management_id: data.department.management.id,
    } as TAddAwardeeToManagementPayload;

    mutate(payload, {
      onSuccess: () => {
        setOpen(false);
        toast.success('Awardee added successfully');
        queryClient.invalidateQueries({
          queryKey: ['get-department-by-id', Number(id)],
        });
        form.reset({
          awardee_id: undefined,
          division_id: undefined,
          position_id: undefined,
        });
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to add Awardee');
      },
    });
  };

  const handleRemoveData = () => {
    mutateDelete(getIdDelete, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['get-department-by-id', data?.department?.id],
        });
        setOpenDelete(false);
        setIdDelete({
          id_awardee: 0,
          id_management: 0,
        });
        toast.success('Berhasil menghapus data');
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || 'Gagal menghapus data');
      },
    });
  };

  return (
    <>
      <div className='border rounded-3xl m-4'>
        <div className='p-4 flex justify-between items-center'>
          <h5 className='font-bold'>Awardee</h5>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              onClick={() => {
                setOpen(true);
              }}
            >
              <Button className='bg-primary-main text-neutral-100 text-sm font-semibold hover:bg-primary-600 rounded-full flex gap-2 items-center'>
                <LuPlus className='text-lg text-neutral-100' />
                <span>Tambah Awardee</span>
              </Button>
            </DialogTrigger>
            <DialogContent className='w-full md:max-w-xl lg:max-w-2xl xl:max-w-3xl rounded-3xl '>
              <DialogHeader>
                <h4>Tambah Awardee</h4>
                <div className=' w-full'>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmitAdd)}
                      className='w-full flex flex-col gap-2'
                    >
                      <FormField
                        control={form.control}
                        name='awardee_id'
                        render={({ field }) => (
                          <FormItem className='flex flex-col gap-2'>
                            <FormLabel>
                              Awardees{' '}
                              <span className='text-error-main'>*</span>
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant='outline'
                                    role='combobox'
                                    className={cn(
                                      'justify-between',
                                      !field.value && 'text-muted-foreground'
                                    )}
                                  >
                                    {field.value
                                      ? dataAwardee?.data?.find(
                                          (item: TUserOptionsData) => {
                                            return (
                                              item.awardee_id == field.value
                                            );
                                          }
                                        )?.awardee_name
                                      : 'Select Author'}
                                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className='w-full p-0'>
                                <Command>
                                  <CommandInput placeholder='Search Awardee...' />
                                  <CommandEmpty>No Awardee found.</CommandEmpty>
                                  <ScrollArea className='h-[200px]'>
                                    <CommandGroup>
                                      {dataAwardee?.data?.map(
                                        (item: TUserOptionsData) => {
                                          return (
                                            item.awardee_name !== null && (
                                              <CommandItem
                                                value={item.awardee_name}
                                                key={item.awardee_id}
                                                onSelect={() => {
                                                  form.setValue(
                                                    'awardee_id',
                                                    item.awardee_id
                                                  );
                                                }}
                                              >
                                                <Check
                                                  className={cn(
                                                    'mr-2 h-4 w-4',
                                                    item.awardee_id ===
                                                      field.value
                                                      ? 'opacity-100'
                                                      : 'opacity-0'
                                                  )}
                                                />
                                                {item.awardee_name}
                                              </CommandItem>
                                            )
                                          );
                                        }
                                      )}
                                    </CommandGroup>
                                  </ScrollArea>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='division_id'
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Division *</FormLabel>
                              <Select
                                onValueChange={(e) => {
                                  field.onChange(Number(e));
                                }}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder='Select Division ' />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {data?.department?.divisions?.map(
                                    (item, index: number) => {
                                      return (
                                        <SelectItem
                                          key={index}
                                          value={String(item.id)}
                                        >
                                          {item.name}
                                        </SelectItem>
                                      );
                                    }
                                  )}
                                </SelectContent>
                              </Select>

                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name='position_id'
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Position *</FormLabel>
                              <Select
                                onValueChange={(e) => {
                                  field.onChange(Number(e));
                                }}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder='Select Position ' />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {dataPosition?.data?.map(
                                    (item, index: number) => {
                                      return (
                                        <SelectItem
                                          key={index}
                                          value={String(item.id)}
                                        >
                                          {item.name}
                                        </SelectItem>
                                      );
                                    }
                                  )}
                                </SelectContent>
                              </Select>

                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <div className='w-full flex justify-end'>
                        <div className='flex gap-4 items-center'>
                          <Button
                            type='button'
                            className='bg-neutral-100 text-primary-main border-primary-main rounded-full border hover:bg-primary-main hover:text-neutral-100'
                            onClick={() => setOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            type='submit'
                            className='bg-primary-main border-primary-main text-neutral-100 rounded-full disabled:bg-neutral-600'
                            disabled={status === 'pending'}
                          >
                            {status === 'pending' ? (
                              <div className='flex gap-2 items-center'>
                                <MiniSpinner /> Loading...
                              </div>
                            ) : (
                              `Submit`
                            )}
                          </Button>
                        </div>
                      </div>
                    </form>
                  </Form>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <Table className='border-b'>
          <TableHeader className='bg-neutral-50 '>
            <TableRow className=''>
              <TableHead className='text-neutral-500'>No</TableHead>
              <TableHead className='text-neutral-500 min-w-[100px] max-w-[200px]'>
                Name
              </TableHead>
              <TableHead className='text-neutral-500'>Management</TableHead>
              <TableHead className='text-neutral-500'>Department</TableHead>
              <TableHead className='text-neutral-500'>Division</TableHead>
              <TableHead className='text-neutral-500'>Position</TableHead>
              <TableHead className='text-neutral-500'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          {data && (
            <TableBody>
              {filtededAwardeeData(data?.structure)?.data?.map(
                (item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className='text-ellipsis min-w-[100px] max-w-[200px]'>
                        {item?.name}
                      </TableCell>
                      <TableCell>{data.department.management.name}</TableCell>
                      <TableCell>{data.department.name}</TableCell>
                      <TableCell>{item?.division}</TableCell>
                      <TableCell>{item?.position}</TableCell>
                      <TableCell>
                        <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                          <DialogTrigger
                            onClick={() => {
                              setIdDelete({
                                id_management: data.department.management.id,
                                id_awardee: item?.awardee_id,
                              });
                              setOpenDelete(true);
                            }}
                          >
                            <MdDelete className='text-2xl text-error-main' />
                          </DialogTrigger>
                          <DialogContent className='max-w-[320px] rounded-3xl '>
                            <DialogHeader>
                              <div className='flex flex-col gap-2'>
                                <div className='w-7 h-7 bg-error-100 rounded-full'>
                                  <Trash className='text-error-main w-5 h-5 mx-auto my-1' />
                                </div>
                                <h4 className='text-error-main'>Hapus Data?</h4>
                                <p className='text-neutral-600'>
                                  Data yang sudah dihapus tidak dapat
                                  dikembalikan lagi harap periksa data sebelum
                                  menghapus
                                </p>
                              </div>
                              <div className='mt-7 w-full flex justify-between items-center gap-3'>
                                <DialogClose asChild>
                                  <Button
                                    className='rounded-full w-full'
                                    type='button'
                                    variant='secondary'
                                  >
                                    Batal
                                  </Button>
                                </DialogClose>
                                <Button
                                  type='button'
                                  variant='destructive'
                                  className='border-neutral-main bg-neutral-main rounded-full text-neutral-100  px-6 py-2.5 font-semibold w-full'
                                  onClick={() => {
                                    handleRemoveData();
                                    setIdDelete({
                                      id_awardee: 0,
                                      id_management: 0,
                                    });
                                  }}
                                  disabled={statusDelete === 'pending'}
                                >
                                  {statusDelete === 'pending' ? (
                                    <div className='flex gap-2 items-center'>
                                      <MiniSpinner /> Loading...
                                    </div>
                                  ) : (
                                    `Hapus`
                                  )}
                                </Button>
                              </div>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          )}
        </Table>
      </div>
    </>
  );
};

export default AwardeeSection;
