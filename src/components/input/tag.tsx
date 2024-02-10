// InputTag.tsx
import { useEffect, useState } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';

interface InputTagProps {
  name: string;
}

const InputTag: React.FC<InputTagProps> = ({ name }) => {
  const { register, setValue, watch } = useFormContext<FieldValues>();
  const [tags, setTags] = useState<string[]>([]);
  const inputValue = watch(name);

  useEffect(() => {
    register(name);
  }, [register, name]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag) {
        setTags([...tags, newTag]);
        setValue(name, '');
      }
    }
  };

  const removeTag = (index: number) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  return (
    <>
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
        {...register(name)}
        onKeyDown={handleKeyDown}
        placeholder='Type and press Enter or comma to add a hashtag'
        className='mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
      />
    </>
  );
};

export default InputTag;
