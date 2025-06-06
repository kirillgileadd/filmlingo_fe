'use client';

import { FC } from 'react';
import { UserMenu } from '@/src/widgets/user-menu';
import { Button } from '@/src/shared/components/ui/button';
import { appSessionStore } from '@/src/shared/session';
import { useAuthModal } from '@/src/widgets/auth';

const HeaderActions: FC = () => {
  const session = appSessionStore.useSession();
  const authModal = useAuthModal();

  return (
    <>
      {session ? (
        <UserMenu />
      ) : (
        <Button onClick={authModal.openAuth}>Войти</Button>
      )}
    </>
  );
};

export default HeaderActions;
