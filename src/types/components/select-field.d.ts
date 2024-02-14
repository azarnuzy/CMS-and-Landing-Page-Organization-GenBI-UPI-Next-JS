import { StaticImageData } from 'next/image';
import { ReactNode } from 'react';
import { ChangeEventHandler } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';
export type TOptionFieldProps = {
  value: string;
  label: string;
  className?: string;
};

export type TSelectFieldProps<T extends FieldValues> = UseControllerProps<T> & {
  className?: string;
  labelClassName?: string;
  error?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  value?: string;
  name: string;
  label: string | ReactNode;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  options: OptionFieldProps[];
  hasLabel?: boolean;
};

export type TOption = {
  label: string;
  value: string | number;
};

export type TOptionConstant = {
  keys: string;
  values: string;
};
export type ISelect<T extends FieldValues> = UseControllerProps<T> & {
  label?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  value?: string | number;
  className?: string;
  labelClassName?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  success?: string | boolean;
  warning?: string;
  variant: 'lg' | 'md' | 'sm';
  icon?: ReactNode | StaticImageData;
  hint?: string;
  options: TOption[] | undefined;
  styletext?: string;
  defaultValue?: string;
  helper?: (e: string | number) => void;
};
