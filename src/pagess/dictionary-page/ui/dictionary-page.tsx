'use client';

import { FC, useState } from 'react';
import { Container } from '@/src/shared/components/ui/container';
import clsx from 'clsx';
import { DictionaryPageNoAuth } from './dictionary-page-no-auth';
import { appSessionStore } from '@/src/shared/session';
import { Tabs } from '@radix-ui/react-tabs';
import {
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/shared/components/ui/tabs';
import { WordsTab } from './words-tab';
import Link from 'next/link';
import { ROUTES } from '@/src/shared/lib/const';
import { Button } from '@/src/shared/components/ui/button';

const enum TabsVariants {
  WORDS = 'words',
  PHRASES = 'phrases',
}

type DictionaryPageProps = {
  className?: string;
};

export const DictionaryPage: FC<DictionaryPageProps> = ({ className }) => {
  const session = appSessionStore.useSession();

  const [tabValue, setTabValue] = useState<TabsVariants | string>(
    TabsVariants.WORDS,
  );

  if (!session) {
    return <DictionaryPageNoAuth />;
  }

  return (
    <div className={clsx('pb-10', className)}>
      <Container className="m-auto" size="small">
        <div className="flex justify-between mb-4">
          <h3 className="text-3xl">Мой словарик</h3>
          <Link href={ROUTES.LEARNING}>
            <Button>Тренировать слова</Button>
          </Link>
        </div>
        <Tabs
          value={tabValue}
          onValueChange={setTabValue}
          defaultValue={TabsVariants.WORDS}
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value={TabsVariants.WORDS}>Слова</TabsTrigger>
            <TabsTrigger value={TabsVariants.PHRASES}>Фразы</TabsTrigger>
          </TabsList>
          <TabsContent value={TabsVariants.WORDS}>
            <WordsTab />
          </TabsContent>
          <TabsContent value={TabsVariants.PHRASES}>PHRASES</TabsContent>
        </Tabs>
      </Container>
    </div>
  );
};
