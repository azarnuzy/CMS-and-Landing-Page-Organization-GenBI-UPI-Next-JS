import Image from 'next/image';

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
        return 'grid-cols-3 grid-rows-3';
      case 4:
        return 'grid-cols-4 grid-rows-4';
      case 5:
        return 'grid-cols-5 grid-rows-5';
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
        <Image
          key={index}
          src={image.src}
          width={0}
          height={0}
          sizes='60vw'
          alt={`Image ${index + 1}`}
          className={`w-full h-full object-cover rounded-md  ${
            index === 0
              ? spanFirstImage(images.length)
              : 'col-span-1 row-span-1'
          }`}
        />
      ))}
    </div>
  );
};

export default GalleryComponent;
