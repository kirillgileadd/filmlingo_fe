import { FC } from "react";

import clsx from "clsx";
import { ResetPasswordForm } from "@/src/features/reset-password";
import { Container } from "@/src/shared/components/ui/container";

type ResetPasswordPageProps = {
  className?: string;
};

export const ResetPasswordPage: FC<ResetPasswordPageProps> = ({
  className,
}) => {
  return (
    <div className={clsx("", className)}>
      <Container>
        <ResetPasswordForm className="m-auto" />
      </Container>
    </div>
  );
};
