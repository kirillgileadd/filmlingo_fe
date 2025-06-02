'use client';

import { FC, useState } from 'react';

import clsx from 'clsx';
import { Button } from '@/src/shared/components/ui/button';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN } from '@/src/shared/lib/const';
import { appSessionStore } from '@/src/shared/session';

type LoginByYandexProps = {
  className?: string;
};

export const LoginByYandex: FC<LoginByYandexProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    const popup = window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/yandex`,
      'Yandex Login',
      'width=500,height=600',
    );

    const checkPopupClosed = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkPopupClosed);
        if (Cookies?.get(ACCESS_TOKEN)) {
          appSessionStore.setSessionToken(Cookies.get(ACCESS_TOKEN)!);
          setIsLoading(false);
        }
      }
    }, 500);
  };

  return (
    <Button
      className={clsx('', className)}
      variant="secondary"
      onClick={handleLogin}
    >
      {isLoading && <Loader2 className="animate-spin" />}
      <Image src="/yandex.svg" width={24} height={24} alt="Яндекс" />
    </Button>
  );
};
