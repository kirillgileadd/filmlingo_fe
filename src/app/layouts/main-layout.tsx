"use client";

import { FC, ReactNode } from "react";

import clsx from "clsx";
import { Header } from "@/src/widgets/header/ui/header";
import { AuthModal } from "@/src/widgets/auth";
import { UserMenu } from "@/src/widgets/user-menu";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ConfirmEmail } from "@/src/features/confirm-email";
import { MobileMenu } from "@/src/widgets/mobile-menu";

type MainLayoutProps = {
  className?: string;
  children: ReactNode;
};

export const MainLayout: FC<MainLayoutProps> = ({ className, children }) => {
  return (
    <div className={clsx("relative min-h-screen", className)}>
      <ConfirmEmail />
      <Header
        actions={
          <>
            <AuthModal />
            <UserMenu />
          </>
        }
      />
      <ProgressBar
        height="2px"
        color="white"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
      <MobileMenu />
    </div>
  );
};
