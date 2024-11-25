import { FC } from "react";

import clsx from "clsx";
import { Button } from "@/src/shared/components/ui/button";
import Image from "next/image";

type LoginByGoogleProps = {
  className?: string;
};

export const LoginByGoogle: FC<LoginByGoogleProps> = ({ className }) => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  return (
    <Button
      className={clsx("", className)}
      variant="secondary"
      onClick={handleLogin}
    >
      <Image src="/google.svg" width={24} height={24} alt="Google" />
    </Button>
  );
};
