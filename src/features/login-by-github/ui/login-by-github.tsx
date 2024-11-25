import { FC } from "react";

import { Button } from "@/src/shared/components/ui/button";
import clsx from "clsx";
import Image from "next/image";

type LoginByGithubProps = {
  className?: string;
};

export const LoginByGithub: FC<LoginByGithubProps> = ({ className }) => {
  // const loginMutation = useLoginByGithub();

  const handleLogin = () => {
    window.location.href = "http://localhost:8000/auth/github";
  };

  return (
    <Button
      onClick={handleLogin}
      variant="secondary"
      className={clsx("", className)}
    >
      <Image src="/github.svg" width={24} height={24} alt="Github" />
    </Button>
  );
};
