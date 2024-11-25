import { FC } from "react";

import clsx from "clsx";
import { Button } from "@/src/shared/components/ui/button";
import Image from "next/image";

type LoginByYandexProps = {
  className?: string;
};

export const LoginByYandex: FC<LoginByYandexProps> = ({ className }) => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8000/auth/yandex";
  };

  return (
    <Button
      className={clsx("", className)}
      variant="secondary"
      onClick={handleLogin}
    >
      <Image src="/yandex.svg" width={24} height={24} alt="Яндекс" />
    </Button>
  );
};
