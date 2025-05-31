'use client';

import { FC, ReactNode } from 'react';

import clsx from 'clsx';
import { AuthModal } from '@/src/widgets/auth';
import { UserMenu } from '@/src/widgets/user-menu';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ConfirmEmail } from '@/src/features/confirm-email';
import { MobileMenu } from '@/src/widgets/mobile-menu';
import { Header } from '@/src/widgets/header';
import { appSessionStore } from '@/src/shared/session';

type MainLayoutProps = {
  className?: string;
  children: ReactNode;
};

export const MainLayout: FC<MainLayoutProps> = ({ className, children }) => {
  const session = appSessionStore.useSession();

  console.log(session, 'session in lay');
  return (
    <div className={clsx('relative min-h-screen', className)}>
      <ConfirmEmail />
      <Header actions={<>{session ? <UserMenu /> : <AuthModal />}</>} />
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
