'use client';

import Image from 'next/image';
import { ReactElement, useEffect, useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { TUploadFieldProps } from '@/types/components/upload-file';

export const UploadField = <T extends FieldValues>(
  props: TUploadFieldProps<T>
): ReactElement => {
  const { field } = useController(props);
  // const [props.getname, props.setname] = useState('');
  const [files, setFiles] = useState<File>();
  // const [props.getname, setname] = useRecoilState(inputUploadState);

  const removeFile = () => {
    setFiles(undefined);
    // props.setname('');
    // props.setname('')
    field.onChange(undefined);
  };

  useEffect(() => {
    if (props.getname.length === 0) {
      setFiles(undefined);
    }
  }, [props.getname.length]);

  return (
    <section className='flex flex-col w-auto my-1 gap-y-2 '>
      {props.label && (
        <label
          htmlFor={props.name}
          className={`text-[#000] ${
            props.variant === 'lg'
              ? 'text-[18px] font-bold'
              : props.variant === 'md'
              ? 'text-[16px] font-bold'
              : props.variant === 'sm'
              ? 'text-[14px] font-bold'
              : ''
          } `}
        >
          {props.label}
          {props.required && (
            <span className='ml-1 font-bold  text-red-500'>*</span>
          )}
        </label>
      )}

      <label className='mb-2' htmlFor={props.name}>
        <section
          className={`flex overflow-hidden border mb-1 rounded-lg ${props.className}`}
        >
          <div className='w-full flex items-center bg-white'>
            <span
              className={`${
                props.disabled
                  ? 'bg-dark-500 cursor-not-allowed'
                  : 'bg-dark-900 hover:bg-dark-700 cursor-pointer'
              } w-fit text-white h-full    transition-colors ease-in-out duration-300 px-4 rounded-l-lg flex items-center text-xs`}
            >
              Pilih File
            </span>
            <p
              className={`${
                props.status === 'error' ? 'text-red-500 italic' : ''
              } px-4 text-xs text-nowrap overflow-hidden overflow-ellipsis whitespace-nowrap`}
            >
              {props.getname || props.files ? (
                <span>
                  {props.getname || props.files}
                  {props.status === 'error' && `(${props.message})`}
                </span>
              ) : (
                'Tidak ada file yang dipilih'
              )}
            </p>
          </div>
          <div className='min-w-[120px] lg:min-w-[150px]'>
            <p className='px-4 py-3 lg:py-3 bg-dark-300 text-neutral-600 text-xs lg:text-sm'>
              {props.accepted}
            </p>
          </div>
        </section>
        <span
          className={`${
            props.status === 'error'
              ? 'text-red-500 text-sm font-semibold'
              : props.status === 'success'
              ? 'text-green-base'
              : props.status === 'warning'
              ? 'text-warning-base'
              : ''
          } text-xs`}
        >
          {props.message}
        </span>
      </label>

      <input
        {...props}
        onChange={(event) => {
          field.onChange(event.target.files);
          props.setname(event.target?.files?.[0]?.name as string);
          setFiles(event.target.files?.[0]);
          props?.onChange?.(event);
        }}
        id={props.name}
        type='file'
        className={`
            ${
              props.status === 'error' &&
              ' bg-red-100 placeholder:text-white  text-sm'
            }

            ${
              props.status === 'success' &&
              'focus:ring-1 focus:ring-green-base bg-green-100 text-sm'
            }

            ${
              props.status === 'warning' &&
              'focus:ring-1 focus:ring-warning-base bg-warning-100 text-sm'
            }

            ${
              !props.status ||
              (props.status === 'none' &&
                `border-[0.5px] border-neutral-400 shadow-sm ${props.className}`)
            }

           rounded-lg p-4 outline-none focus:outline-none sr-only
        `}
      />
      {files && (
        <div className='relative w-full max-w-[400px]'>
          <div className='m-2 w-full'>
            <div className='relative mx-auto w-full h-40 overflow-hidden rounded-lg shadow-md'>
              <Image
                src={URL.createObjectURL(files)}
                alt='image'
                width={0}
                height={0}
                sizes='100vw'
                fill={true}
                className='object-contain w-full h-full'
              />
            </div>
            <div
              onClick={() => removeFile()}
              className='absolute top-2 right-2 p-1 bg-white rounded-full cursor-pointer'
            >
              <AiOutlineCloseCircle
                color='#e63a3a'
                className='text-error-main'
                size={20}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
