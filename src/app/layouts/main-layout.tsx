'use client';

import { FC, ReactNode } from 'react';

import clsx from 'clsx';
import { ConfirmEmail } from '@/src/features/confirm-email';
import { MobileMenu } from '@/src/widgets/mobile-menu';
import { Header } from '@/src/widgets/header';
import dynamic from 'next/dynamic';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const HeaderActions = dynamic(() => import('./header-actions'), {
  ssr: false,
});

type MainLayoutProps = {
  className?: string;
  children: ReactNode;
};

export const MainLayout: FC<MainLayoutProps> = ({ className, children }) => {
  return (
    <div className={clsx('relative min-h-screen', className)}>
      <ConfirmEmail />
      <Header actions={<HeaderActions />} />
      <ProgressBar
        height="2px"
        color="white"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
      <MobileMenu />
    </div>
  );
};
