import { AiFillExclamationCircle } from 'react-icons/ai';

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-4'>
      <AiFillExclamationCircle className='w-6 h-6' />
      <p className='font-medium'>{message}</p>
    </div>
  );
};
