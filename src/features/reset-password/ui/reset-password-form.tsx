"use client";

import { FC } from "react";

import { Button } from "@/src/shared/components/ui/button";
import { PasswordInput } from "@/src/shared/components/ui/password-input";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useResetPassword } from "../api/useResetPassword";
import { ResetPasswordFormDataT } from "../model/types";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type ResetPasswordFormProps = {
  className?: string;
};

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({
  className,
}) => {
  const router = useRouter();
  const params = useParams();
  const resetMutation = useResetPassword();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormDataT>({
    defaultValues: { password: "", repeatPassword: "" },
  });

  const onSubmit = async ({ password }: ResetPasswordFormDataT) => {
    if (!params.token) {
      toast.error("Некорректный token для смены пароля");
      return;
    }

    await resetMutation.mutateAsync(
      { password, token: params.token as string },
      {
        onError: (error) => {
          toast.error(error.response?.data?.message ?? "Что-то пошло не так");
        },
        onSuccess: () => {
          toast.success("Пароль успешно обновлен");
          router.push("/");
        },
      }
    );
  };

  const password = watch("password");

  return (
    <form
      className={clsx("max-w-lg", className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-lg font-bold mb-2">Введите новый пароль</h3>
      <PasswordInput
        className="mb-2"
        error={errors.password?.message}
        placeholder="Пароль"
        {...register("password", {
          required: "Обязательное поле",
          minLength: {
            value: 6,
            message: "Пароль должен быть не менее 6 символов",
          },
        })}
      />
      <PasswordInput
        className="mb-2"
        error={errors.repeatPassword?.message}
        placeholder="Повторите пароль"
        {...register("repeatPassword", {
          required: "Обязательное поле",
          validate: (value) => value === password || "Пароли должны совпадать",
        })}
      />
      <Button
        className="w-full"
        disabled={resetMutation.isPending}
        type="submit"
      >
        {resetMutation.isPending && <Loader2 className="animate-spin" />}
        Обновить
      </Button>
    </form>
  );
};
