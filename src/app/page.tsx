'use client';

import * as React from 'react';

import AboutSection from '@/modules/landing-page/about-section';
import FAQSection from '@/modules/landing-page/faq-section';
import GallerySection from '@/modules/landing-page/gallery-section';
import HeaderSection from '@/modules/landing-page/header-section';
import NewsSection from '@/modules/landing-page/news-section';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <main className='min-h-60 w-full overflow-hidden'>
      <HeaderSection />
      <AboutSection />
      <NewsSection />
      <FAQSection />
      <GallerySection />
    </main>
  );
}
