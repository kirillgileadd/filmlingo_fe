'use client';

import { FC, useState } from 'react';

import { Button } from '@/src/shared/components/ui/button';
import clsx from 'clsx';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

type LoginByGithubProps = {
  className?: string;
};

export const LoginByGithub: FC<LoginByGithubProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/github`;
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
