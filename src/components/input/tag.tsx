// InputTag.tsx
import { useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import { FormLabel } from '@/components/ui/form';

import { inputTagState } from '@/recoils/admin/atom';

import { TTagInputProps } from '@/types/components/tag';

const InputTag = <T extends FieldValues>(props: TTagInputProps<T>) => {
  const { field } = useController(props);
  const [tags, setTags] = useRecoilState(inputTagState);
  const [valueTag, setValueTag] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = valueTag.trim();
      if (newTag) {
        setTags([...tags, newTag]);
        field.onChange([...tags, newTag]);
        setValueTag('');
      }
    }
  };

  const removeTag = (index: number) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
    field.onChange(updatedTags);
  };

  return (
    <>
      <FormLabel className={`${props.message ? 'text-red-500' : 'text-black'}`}>
        {props.label} <span className='text-error-main'>*</span>
      </FormLabel>
      <div className='flex flex-wrap'>
        {tags.map((tag, index) => (
          <div
            key={index}
            className='flex items-center bg-gray-200 rounded-full px-3 py-1 mr-2 mb-2 mt-2'
          >
            <span>{tag}</span>
            <button
              type='button'
              onClick={() => removeTag(index)}
              className='ml-1'
            >
              x
            </button>
          </div>
        ))}
      </div>
      <input
        type='text'
        // {...register(name)}
        value={valueTag}
        onChange={(e) => setValueTag(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='Type and press Enter or comma to add a hashtag'
        className='mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
      />
      {props.message && (
        <p className='text-red-500 text-sm font-semibold mt-1'>
          {props.message}
        </p>
      )}
    </>
  );
};

export default InputTag;
