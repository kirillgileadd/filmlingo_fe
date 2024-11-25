import { FC } from "react";

import clsx from "clsx";

type ConfirmEmailProps = {
  className?: string;
};

export const ConfirmEmail: FC<ConfirmEmailProps> = ({ className }) => {
  return (
    <div className={clsx("", className)}>
      <p>Мы отправили вам сообщение на email, подтверидте акк</p>
    </div>
  );
};
