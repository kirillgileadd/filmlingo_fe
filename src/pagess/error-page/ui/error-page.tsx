import { FC } from "react";

import { Button } from "@/src/shared/components/ui/button";

export const ErrorPage: FC<{ error: Error; reset: () => void }> = ({
  error,
  reset,
}) => {
  return (
    <div className="h-lvh flex flex-col justify-center items-center gap-4">
      <h2 className="text-xl">Что-то пошло не так :(</h2>
      {error.message && <p>Подробнее: {error.message}</p>}
      <Button onClick={() => reset()}>Вернуть на главную</Button>
    </div>
  );
};
