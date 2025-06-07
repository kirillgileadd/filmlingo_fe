'use client';

import { Container } from '@/src/shared/components/ui/container';
import clsx from 'clsx';
import { FC } from 'react';
import Image from 'next/image';

type InDevelopmentPageProps = {
  className?: string;
};

export const InDevelopmentPage: FC<InDevelopmentPageProps> = ({
  className,
}) => {
  return (
    <div className={clsx('', className)}>
      <Container className="flex justify-center flex-col items-center">
        <Image
          className="ml-10"
          src="/images/notation-cat.webp"
          width={250}
          height={250}
          alt="cat"
          draggable={false}
        />
        <h3 className="text-3xl">Фича пока в разработке</h3>
      </Container>
    </div>
  );
};
