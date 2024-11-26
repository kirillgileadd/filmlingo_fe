"use client";

import { FC, ReactNode } from "react";

import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { LoginByEmailFormData } from "../model/types";
import { Loader2 } from "lucide-react";
import { PasswordInput } from "@/src/shared/components/ui/password-input";
import { useLoginByEmail } from "../api/use-login-by-email";

type LoginByEmailFormProps = {
  className?: string;
  resetPassword: () => ReactNode;
};

export const LoginByEmailForm: FC<LoginByEmailFormProps> = ({
  className,
  resetPassword,
}) => {
  const loginMutate = useLoginByEmail();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginByEmailFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (data: LoginByEmailFormData) => {
    loginMutate.mutateAsync(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className={clsx("flex flex-col gap-2", className)}
    >
      <Input
        error={errors.email?.message}
        placeholder="Email"
        {...register("email", { required: "Обязательное поле" })}
      />
      <PasswordInput
        error={errors.password?.message}
        placeholder="Пароль"
        {...register("password", { required: "Обязательное поле" })}
      />
      {resetPassword()}
      {loginMutate.error && (
        <p className="text-sm mb-2 bg-primary-foreground text-destructive rounded-md border-destructive p-2 border">
          {loginMutate.error.response?.data.error}
        </p>
      )}
      <Button disabled={loginMutate.isPending} className="w-full" type="submit">
        {loginMutate.isPending && <Loader2 className="animate-spin" />}
        Войти
      </Button>
    </form>
  );
};
