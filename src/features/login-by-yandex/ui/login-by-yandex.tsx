"use client";

import { FC, useState } from "react";

import clsx from "clsx";
import { Button } from "@/src/shared/components/ui/button";
import Image from "next/image";
import { Loader2 } from "lucide-react";

type LoginByYandexProps = {
  className?: string;
};

export const LoginByYandex: FC<LoginByYandexProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = () => {
    setIsLoading(true);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/github`;
  };

  return (
    <Button
      className={clsx("", className)}
      variant="secondary"
      onClick={handleLogin}
    >
      {isLoading && <Loader2 className="animate-spin" />}
      <Image src="/yandex.svg" width={24} height={24} alt="Яндекс" />
    </Button>
  );
};
