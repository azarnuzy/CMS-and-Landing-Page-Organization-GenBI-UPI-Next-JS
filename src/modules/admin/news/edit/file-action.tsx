import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import { toast } from 'sonner';

import { useDeletePhoto, usePutPhoto } from '@/hooks/photos/hook';

import MiniSpinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { TFileActionProps } from '@/types/photos';

const FilePreview = (props: TFileActionProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const { mutate, status } = usePutPhoto();
  const { mutate: mutateDelete, status: statusDelete } = useDeletePhoto();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      setFile(fileList[0]);
    }
    setOpen(true);
  };

  const queryClient = useQueryClient();

  const handleEditPhoto = () => {
    const { payload } = props;

    mutate(
      {
        id: payload?.photo_id as number,
        payload: {
          caption: payload?.caption || '',
          category: payload?.category || '',
          featured: false,
          post_id: Number(payload?.post_id),
          file: file as File,
        },
      },
      {
        onSuccess: () => {
          toast.success('Photo updated successfully');
          queryClient.invalidateQueries({
            queryKey: [props.invalidateQueryName as string],
          });
        },
        onError: (error) => {
          toast.error(error.response?.data.message || 'Failed to update photo');
        },
      }
    );
    setOpen(false);
    setFile(null);
  };

  const handleDeletePhoto = () => {
    mutateDelete(props?.payload?.photo_id as number, {
      onSuccess: () => {
        toast.success('Photo deleted successfully');
        queryClient.invalidateQueries({
          queryKey: [props.invalidateQueryName as string],
        });
      },
      onError: (error) => {
        toast.error(error.response?.data.message || 'Failed to delete photo');
      },
    });
  };

  return (
    <div className='relative w-full max-w-[400px]'>
      <div className='m-2 w-full'>
        <div className='relative mx-auto w-full h-40 overflow-hidden rounded-lg shadow-md'>
          <Image
            src={props.url || '/images/no-photo-available.png'}
            alt='image'
            width={0}
            height={0}
            sizes='100vw'
            className='object-cover w-full h-full'
          />
        </div>
        <div className='max-h-content flex gap-4 items-center absolute top-2 right-2'>
          <Dialog open={open} onOpenChange={setOpen}>
            <label htmlFor='input-edit' className='cursor-pointer'>
              <input
                type='file'
                hidden
                id='input-edit'
                onChange={handleFileChange}
                // onCha
                className='hidden'
              />
              <div className='p-1 bg-white rounded-full'>
                <MdOutlineEdit className='text-warning-main' size={20} />
              </div>
            </label>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit File</DialogTitle>

                {file && (
                  <div className='w-full h-full'>
                    <Image
                      width={0}
                      height={0}
                      sizes='50vw'
                      src={URL.createObjectURL(file)}
                      alt='Preview'
                      className='w-full h-auto mt-4 object-contain'
                    />
                  </div>
                )}

                <DialogFooter className='sm:justify-start mt-5'>
                  <div className='flex justify-between items-center w-full'>
                    <DialogClose asChild>
                      <Button type='button' variant='secondary'>
                        Close
                      </Button>
                    </DialogClose>
                    <Button type='button' onClick={handleEditPhoto}>
                      {status === 'pending' ? 'Loading...' : 'Edit'}
                    </Button>
                  </div>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          {props.isRemove && (
            <button
              onClick={handleDeletePhoto}
              className='p-1 bg-white rounded-full cursor-pointer flex justify-center'
            >
              {statusDelete === 'pending' ? (
                <div className='flex justify-center w-full'>
                  <MiniSpinner />
                </div>
              ) : (
                <FaRegTrashAlt className='text-error-main' size={20} />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
