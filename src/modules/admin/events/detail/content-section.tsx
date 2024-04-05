'use client';

import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import ContentParticipantSection from '@/modules/admin/events/detail/participants/content-section';
import HeaderDetailPreviewAcaraSection from '@/modules/admin/events/detail/preview/header-section';
import SimillarEventPreviewSection from '@/modules/admin/events/detail/preview/simillar-event-section';

const ContentDetailEventSection = ({ id }: { id: number }) => {
  return (
    <div className='w-full pt-10 flex justify-center'>
      <Tabs className='w-full' defaultValue='preview'>
        <TabsList className='grid grid-cols-2 w-full'>
          <TabsTrigger className='col-span-1' value='preview'>
            Preview
          </TabsTrigger>
          <TabsTrigger className='col-span-1' value='participant'>
            Participant
          </TabsTrigger>
        </TabsList>
        <TabsContent value='preview'>
          <HeaderDetailPreviewAcaraSection id={String(id)} />
          <SimillarEventPreviewSection />
        </TabsContent>
        <TabsContent value='participant'>
          <ContentParticipantSection id={Number(id)} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentDetailEventSection;
