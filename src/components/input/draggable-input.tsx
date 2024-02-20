/* eslint-disable unused-imports/no-unused-vars */
'use client';

import Image from 'next/image';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FieldValues, useController } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { TDraggableImageInputProps } from '@/types/components/draggable-input';

export const DraggableImageInput = <T extends FieldValues>(
  props: TDraggableImageInputProps<T>
): ReactElement => {
  const { field } = useController(props);
  const [files, setFiles] = useState<Array<File>>([]);
  const [type, setType] = useState<string>('');
  const [getNames, setNames] = useState<Array<string>>([]);

  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      const newFiles = [...files, ...acceptedFiles];
      setFiles(newFiles);

      const newTypes = newFiles.map((file) => file.type);
      setType(newTypes.join(', '));

      const newNames = newFiles.map((file) => file.name);
      setNames(newNames);

      field.onChange(newFiles);
    },
    [field, files]
  );

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    const newTypes = newFiles.map((file) => file.type);
    setType(newTypes.join(', '));

    const newNames = newFiles.map((file) => file.name);
    setNames(newNames);

    field.onChange(newFiles);
  };

  useEffect(() => {
    if (field.value) {
      setFiles(field.value);
      const newTypes = field.value.map((file: File) => file.type);
      setType(newTypes.join(', '));
      const newNames = field.value.map((file: File) => file.name);
      setNames(newNames);
    }
  }, [field.value]);

  const { getRootProps, getInputProps } = useDropzone({ ...props, onDrop });
  const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/webp',
    'image/png',
  ];
  const ACCEPTED_VIDEO_TYPES = ['video/ogg', 'video/webm', 'video/mp4'];

  return (
    <div className='flex flex-col gap-4'>
      <div
        {...getRootProps(props)}
        className={`flex flex-wrap items-center bg-neutral-100 justify-center relative w-full p-2 border-2 rounded-lg border-neutral-300 ${props.className}`}
      >
        <div
          className={`flex flex-col items-center w-full px-4 py-6 bg-[#F5F5F5] dark:bg-transparent rounded-lg hover:text-white ${props.labelStyle}`}
        >
          <Image
            src='/svg/file-icon.svg'
            width={47}
            height={32}
            alt='file icon'
          />
          {/* <IconFile /> */}
          <span className='mt-2 text-xs md:text-sm lg:text-sm text-center text-black font-semibold dark:text-white'>
            Seret, taruh dan <span className='text-blue-base'>pilih file</span>{' '}
            untuk mengunggah
          </span>
          <input
            {...getInputProps(props)}
            {...props}
            onChange={(event) => {
              const fileList = event.target.files;
              if (fileList) {
                const newFiles = Array.from(fileList);
                setFiles(newFiles);

                const newTypes = newFiles.map((file) => file.type);
                setType(newTypes.join(', '));

                const newNames = newFiles.map((file) => file.name);
                setNames(newNames);

                field.onChange(newFiles);
              }
            }}
            className='hidden'
            type='file'
            multiple
          />
        </div>
      </div>
      {files.map((file, index) => (
        <div key={index} className='relative w-full'>
          {ACCEPTED_IMAGE_TYPES.includes(file.type) &&
          field.value !== undefined ? (
            <div key={index} className='m-2 w-full'>
              <div className='relative mx-auto w-full h-40 overflow-hidden rounded-lg shadow-md'>
                <Image
                  src={URL.createObjectURL(file)}
                  alt='image'
                  width={0}
                  height={0}
                  sizes='100vw'
                  fill={true}
                  className='object-contain w-full h-full'
                />
              </div>
              <div
                onClick={() => removeFile(index)}
                className='absolute top-2 right-2 p-1 bg-white rounded-full cursor-pointer'
              >
                <AiOutlineCloseCircle color='#e63a3a' size={20} />
              </div>
            </div>
          ) : ACCEPTED_VIDEO_TYPES.includes(file.type) ? (
            <video
              width={400}
              controls
              height={400}
              src={URL.createObjectURL(file)}
            />
          ) : field.value !== undefined ? (
            <div key={index} className='m-2 w-full'>
              <div className='relative mx-auto w-full p-2 overflow-hidden rounded-lg shadow-md '>
                <p> {getNames[index]}</p>
              </div>
              <div
                onClick={() => removeFile(index)}
                className='absolute top-2 right-2 p-1 bg-white rounded-full cursor-pointer'
              >
                <AiOutlineCloseCircle color='#e63a3a' size={20} />
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};
