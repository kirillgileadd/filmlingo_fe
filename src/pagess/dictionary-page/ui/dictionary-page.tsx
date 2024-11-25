"use client";

import { FC } from "react";

import clsx from "clsx";
import { Container } from "@/src/shared/components/ui/container";
import { useAuth } from "@/src/shared/lib/useAuth";
import { withClientOnly } from "@/src/shared/lib/withClientOnly";

type DictionaryPageProps = {
  className?: string;
};

const DictionaryPageConponent: FC<DictionaryPageProps> = ({ className }) => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return (
      <div>
        <Container>
          Чтобы пользоваться личным словариком создайте аккаунт или войдите
        </Container>
      </div>
    );
  }

  return (
    <div className={clsx("", className)}>
      <Container>DictionaryPage</Container>
    </div>
  );
};

export const DictionaryPage = withClientOnly(DictionaryPageConponent);
