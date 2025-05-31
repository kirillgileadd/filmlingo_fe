'use client';

import { FC, useState } from 'react';

import clsx from 'clsx';
import { Button } from '@/src/shared/components/ui/button';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

type LoginByGoogleProps = {
  className?: string;
};

export const LoginByGoogle: FC<LoginByGoogleProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <Button
      className={clsx('', className)}
      variant="secondary"
      onClick={handleLogin}
    >
      {isLoading && <Loader2 className="animate-spin" />}
      <Image src="/google.svg" width={24} height={24} alt="Google" />
    </Button>
  );
};
