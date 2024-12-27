"use client";

import { FC, ReactNode } from "react";

import { Container } from "@/src/shared/components/ui/container";
import clsx from "clsx";
import Link from "next/link";

type HeaderProps = {
  className?: string;
  actions?: ReactNode;
};

export const Header: FC<HeaderProps> = ({ className, actions }) => {
  return (
    <header className={clsx("py-6 mb-12", className)}>
      <Container className="flex lg:gap-x-28 gap-x-12  h-11 items-center">
        <Link href={"/"}>
          <h1 className="text-3xl font-bold">Filmlingo</h1>
        </Link>
        <nav className="hidden sm:flex gap-x-12">
          <Link href="/youtube">
            <p className="text-lg font-medium">YouTube плеер</p>
          </Link>
          <Link href="/dictionary">
            <p className="text-lg font-medium">Словарик</p>
          </Link>
        </nav>
        <div className="ml-auto flex gap-6">{actions}</div>
      </Container>
    </header>
  );
};
