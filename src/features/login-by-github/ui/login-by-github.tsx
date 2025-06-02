'use client';

import { FC, useState } from 'react';

import { Button } from '@/src/shared/components/ui/button';
import clsx from 'clsx';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { appSessionStore } from '@/src/shared/session';
import { ACCESS_TOKEN } from '@/src/shared/lib/const';
import Cookies from 'js-cookie';

type LoginByGithubProps = {
  className?: string;
};

export const LoginByGithub: FC<LoginByGithubProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    const popup = window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/github`,
      'GitHub Login',
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
      onClick={handleLogin}
      variant="secondary"
      disabled={isLoading}
      className={clsx('', className)}
    >
      {isLoading && <Loader2 className="animate-spin" />}
      <Image src="/github.svg" width={24} height={24} alt="Github" />
    </Button>
  );
};
