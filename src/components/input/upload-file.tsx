'use client';

import { ReactElement } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import { inputUploadState } from '@/recoils/admin/atom';

import { TUploadFieldProps } from '@/types/components/upload-file';

export const UploadField = <T extends FieldValues>(
  props: TUploadFieldProps<T>
): ReactElement => {
  const { field } = useController(props);
  // const [getName, setName] = useState('');

  const [getName, setName] = useRecoilState(inputUploadState);
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
              {getName || props.files ? (
                <span>
                  {getName || props.files}
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
          setName(event.target?.files?.[0]?.name as string);
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
        // hidden
      />
    </section>
  );
};
