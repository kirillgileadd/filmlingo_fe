import { FC } from 'react';

import clsx from 'clsx';
import { Container } from '@/src/shared/components/ui/container';
import Image from 'next/image';
import { useAuthModal } from '@/src/widgets/auth';

type DictionaryPageNoAuthProps = {
  className?: string;
};

export const DictionaryPageNoAuth: FC<DictionaryPageNoAuthProps> = ({
  className,
}) => {
  const authModal = useAuthModal();

  return (
    <div>
      <Container
        className={clsx(
          'flex flex-col justify-center items-center text-center',
          className,
        )}
      >
        <Image
          className="mb-8 ml-16"
          src="/images/angry-cat.webp"
          width={250}
          height={250}
          alt="cat"
          draggable={false}
        />
        <h4 className="text-3xl mb-2">Жаль, но у вас нет доступа :(</h4>
        <p className="text-center">
          Чтобы пользоваться личным словариком
          <span
            onClick={authModal.openAuth}
            className="underline cursor-pointer block"
          >
            создайте аккаунт или войдите
          </span>
        </p>
      </Container>
    </div>
  );
};
