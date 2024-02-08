import React, { ChangeEvent } from 'react';

interface UploadFileProps {
  title: string;
  onChange: (file: File | null) => void;
  placeholder?: string;
  styleInput?: string;
  styleTitle?: string;
  className?: string;
  nameFile?: string;
}

export const UploadFile: React.FC<UploadFileProps> = ({
  title,
  onChange,
  placeholder,
  styleInput,
  nameFile,
  styleTitle,
  className,
}) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    onChange(file);
  };

  return (
    <div
      className={`relative flex gap-3 rounded-md overflow-hidden border-2 h-10 ${className}`}
    >
      <div className='text-white font-semibold flex justify-center items-center bg-dark-800 min-w-[160px]'>
        {title}
      </div>
      <div className={`${styleTitle} flex justify-start items-center w-[87%]`}>
        {nameFile}
      </div>
      <input
        type='file'
        className={`opacity-0 w-full absolute ${styleInput}`}
        onChange={handleFileChange}
        placeholder={placeholder}
      />
    </div>
  );
};
