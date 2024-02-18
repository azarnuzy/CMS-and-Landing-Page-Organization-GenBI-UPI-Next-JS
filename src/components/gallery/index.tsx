import Image from 'next/image';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
const GalleryComponent = ({
  images,
}: {
  images: {
    src: string;
  }[];
}) => {
  const getGridClass = (numberOfImages: number) => {
    switch (numberOfImages) {
      case 1:
        return 'grid-cols-1 grid-rows-1';
      case 2:
        return 'grid-cols-2 grid-rows-1';
      case 3:
        return 'grid-cols-3 grid-rows-2';
      case 4:
        return 'grid-cols-4 grid-rows-3';
      case 5:
        return 'grid-cols-5 grid-rows-4';
      case 6:
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6 grid-rows-1 md:grid-rows-1 lg:grid-rows-2';
      default:
        return 'grid-cols-3';
    }
  };

  const spanFirstImage = (numberOfImages: number) => {
    switch (numberOfImages) {
      case 1:
        return 'col-span-1 row-span-1';
      case 2:
        return 'col-span-1 row-span-1';
      case 3:
        return 'col-span-2 row-span-2';
      case 4:
        return 'col-span-3 row-span-3';
      case 5:
        return 'col-span-4 row-span-4';
      case 6:
        return 'col-span-4 row-span-4';
      default:
        return 'col-span-3';
    }
  };

  return (
    <div className={`grid gap-4 ${getGridClass(images.length)} items-center`}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`w-full h-full max-h-[300px] object-cover rounded-md  ${
            index === 0
              ? spanFirstImage(images.length)
              : 'col-span-1 row-span-1'
          }`}
        >
          <Dialog>
            <DialogTrigger className='h-full'>
              <Image
                key={index}
                src={image.src || '/images/no-photo-available.png'}
                width={0}
                height={0}
                sizes='60vw'
                alt={`Image ${index + 1}`}
                className={`w-full h-full object-cover rounded-md `}
              />
            </DialogTrigger>
            <DialogContent className='bg-transparent border-none p-10 shadow-none text-neutral-100 max-w-4xl max-h-[90vh] flex items-center'>
              <Image
                key={index}
                src={image.src || '/images/no-photo-available.png'}
                width={0}
                height={0}
                sizes='60vw'
                alt={`Image ${index + 1}`}
                className={`w-full h-full max-h-[90vh] object-contain rounded-md  ${
                  index === 0
                    ? spanFirstImage(images.length)
                    : 'col-span-1 row-span-1'
                }`}
              />
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
};

export default GalleryComponent;
