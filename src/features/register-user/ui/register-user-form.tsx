import { FC } from "react";

import { Input } from "@/src/shared/components/ui/input";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { RegisterUserFormData, RegisterUserReq } from "../model/types";
import { Loader2 } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";
import { PasswordInput } from "@/src/shared/components/ui/password-input";

type RegisterUserFormProps = {
  className?: string;
  onSubmit: (data: RegisterUserReq) => void;
  error?: string;
  isLoading?: boolean;
};

export const RegisterUserForm: FC<RegisterUserFormProps> = ({
  className,
  onSubmit,
  error,
  isLoading,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<RegisterUserFormData>({
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const password = watch("password");

  const handleRegister = (data: RegisterUserFormData) => {
    onSubmit({ email: data.email, password: data.password });
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
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
        {...register("password", {
          required: "Обязательное поле",
          minLength: {
            value: 6,
            message: "Пароль должен быть не менее 6 символов",
          },
        })}
      />
      <PasswordInput
        error={errors.repeatPassword?.message}
        placeholder="Повторите пароль"
        {...register("repeatPassword", {
          required: "Обязательное поле",
          validate: (value) => value === password || "Пароли должны совпадать",
        })}
      />
      {error && (
        <p className="text-sm mb-2 bg-primary-foreground text-destructive rounded-md border-destructive p-2 border">
          {error}
        </p>
      )}
      <Button disabled={isLoading} className="w-full" type="submit">
        {isLoading && <Loader2 className="animate-spin" />}
        Создать аккаунт
      </Button>
    </form>
  );
};
