"use client";

import { FC } from "react";

import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useStepper } from "@/src/shared/lib/useStepper";
import { ForgotPasswordBody } from "../model/types";
import { Input } from "@/src/shared/components/ui/input";
import { Button } from "@/src/shared/components/ui/button";
import { useForgotPassword } from "../api/use-forgot-password";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

type ForgotPasswordProps = {
  className?: string;
};

export const ForgotPassword: FC<ForgotPasswordProps> = ({ className }) => {
  const forgotMutation = useForgotPassword();

  const { active, next } = useStepper(2, {});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordBody>({
    defaultValues: { email: "" },
  });

  const onSubmit = async ({ email }: ForgotPasswordBody) => {
    await forgotMutation.mutateAsync(
      { email },
      {
        onSuccess: () => {
          next();
        },
        onError: (error) => {
          toast.error(error.response?.data?.message ?? "Что-то пошло не так");
        },
      }
    );
  };

  return (
    <div className={clsx("", className)}>
      {active === 0 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-lg font-bold">Введите свою почту</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Мы отправим вам письмо для восстановления пароля
          </p>
          <Input
            className="mb-2"
            error={errors.email?.message}
            {...register("email", {
              required: "Обязательное поле",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Некорректный emial",
              },
            })}
            placeholder="Email"
          />
          <Button
            className="w-full"
            disabled={forgotMutation.isPending}
            type="submit"
          >
            {forgotMutation.isPending && <Loader2 className="animate-spin" />}
            Отправить письмо
          </Button>
        </form>
      )}
      {active === 1 && (
        <div>
          <p>Письмо отправлено, проверьте свою почту</p>
        </div>
      )}
    </div>
  );
};
