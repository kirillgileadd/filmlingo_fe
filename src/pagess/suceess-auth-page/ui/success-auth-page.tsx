'use client';

import { Container } from '@/src/shared/components/ui/container';
import clsx from 'clsx';
import { FC } from 'react';

type SuccessAuthPageProps = {
  className?: string;
};

export const SuccessAuthPage: FC<SuccessAuthPageProps> = ({ className }) => {
  return (
    <div className={clsx('', className)}>
      <Container>
        <p className="text-xl text-center">Вы успешно авторизовались!</p>
      </Container>
    </div>
  );
};
