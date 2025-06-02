'use client';

import dynamic from 'next/dynamic';

const DictionaryPage = dynamic(() => import('@/src/pagess/dictionary-page'), {
  ssr: false,
});

export default function Dictionary() {
  return <DictionaryPage />;
}
