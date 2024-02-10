'use client';

import React, { useState } from 'react';
import { Gallery } from 'react-grid-gallery';
import Lightbox from 'react-image-lightbox';

import 'react-image-lightbox/style.css';
import './index.css';

import BaseLayout from '@/components/layouts/base';

import { CustomImage, images as IMAGES } from '@/modules/gallery/constant';

const images = IMAGES.map((image) => ({
  ...image,
  customOverlay: (
    <div className='custom-overlay__caption'>
      <div>{image.caption}</div>
      {image.tags &&
        image.tags.map((t, index) => (
          <div key={index} className='custom-overlay__tag'>
            {t.title}
          </div>
        ))}
    </div>
  ),
}));

const GallerySection = () => {
  const [index, setIndex] = useState(-1);

  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const nextImage = images[nextIndex] || currentImage;
  const prevIndex = (index + images.length - 1) % images.length;
  const prevImage = images[prevIndex] || currentImage;

  // eslint-disable-next-line unused-imports/no-unused-vars
  const handleClick = (index: number, item: CustomImage) => setIndex(index);
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);
  return (
    <div className='-mt-[50px] sm:-mt-[75px] lg:-mt-[200px]  pb-10'>
      <BaseLayout>
        <>
          <Gallery
            images={images}
            onClick={handleClick}
            enableImageSelection={false}
          />
          {!!currentImage && (
            <Lightbox
              mainSrc={currentImage.original}
              imageTitle={currentImage.caption}
              mainSrcThumbnail={currentImage.src}
              nextSrc={nextImage.original}
              nextSrcThumbnail={nextImage.src}
              prevSrc={prevImage.original}
              prevSrcThumbnail={prevImage.src}
              onCloseRequest={handleClose}
              onMovePrevRequest={handleMovePrev}
              onMoveNextRequest={handleMoveNext}
            />
          )}
        </>
      </BaseLayout>
    </div>
  );
};

export default GallerySection;
