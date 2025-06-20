import { FC } from 'react';

import clsx from 'clsx';
import { useGetCurrentUser } from '@/src/entities/user';
import { Container } from '@/src/shared/components/ui/container';
import { Button } from '@/src/shared/components/ui/button';
import { useModal } from '@/src/shared/lib/useModal';
import { appSessionStore } from '@/src/shared/session';

type ConfirmEmailProps = {
  className?: string;
};

export const ConfirmEmail: FC<ConfirmEmailProps> = ({ className }) => {
  const modal = useModal(true);
  const session = appSessionStore.getSession();
  const userQuery = useGetCurrentUser(!!session);

  if (userQuery.data && !userQuery.data?.isActivated && modal.isOpen)
    return (
      <div className={clsx('bg-background p-4 border-b', className)}>
        <Container className="flex justify-between items-center">
          <p>
            Вы успешно создали аккаунт, для подтверждения перейдите по ссылке в
            письме, которое мы отравили вам на почту{' '}
            <span className="font-bold">{userQuery.data?.email}</span>
          </p>
          <Button onClick={modal.closeModal}>Закрыть</Button>
        </Container>
      </div>
    );

  return null;
};
