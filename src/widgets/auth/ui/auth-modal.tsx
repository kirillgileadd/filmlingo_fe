'use client';

import { FC, ReactNode, useState } from 'react';

import { ForgotPassword } from '@/src/features/forgot-password';
import { LoginByEmail } from '@/src/features/login-by-email';
import { LoginByGithub } from '@/src/features/login-by-github';
import { LoginByGoogle } from '@/src/features/login-by-google';
import { LoginByYandex } from '@/src/features/login-by-yandex';
import { RegistrerUser } from '@/src/features/register-user';
import { Button } from '@/src/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/shared/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/shared/components/ui/tabs';
import clsx from 'clsx';
import { appSessionStore } from '@/src/shared/session';

const enum TabsVariants {
  LOGIN = 'login',
  REGISTRATION = 'registraton',
  FORGOT = 'forgot',
}

type AuthModalProps = {
  className?: string;
  trigger?: ReactNode;
};

export const AuthModal: FC<AuthModalProps> = ({ className, trigger }) => {
  const session = appSessionStore.useSession();
  const [tabValue, setTabValue] = useState<TabsVariants | string>(
    TabsVariants.LOGIN,
  );

  console.log(session, 'session Auth');

  if (session) return null;

  return (
    <div className={clsx('', className)}>
      <Dialog>
        <DialogTrigger asChild>
          {trigger ?? <Button>Войти</Button>}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Filmlingo</DialogTitle>
            <DialogDescription>Войдите или создайте аккаунт</DialogDescription>
          </DialogHeader>
          <Tabs
            value={tabValue}
            onValueChange={setTabValue}
            defaultValue={TabsVariants.LOGIN}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value={TabsVariants.LOGIN}>Вход</TabsTrigger>
              <TabsTrigger value={TabsVariants.REGISTRATION}>
                Регистрация
              </TabsTrigger>
            </TabsList>
            <TabsContent value={TabsVariants.LOGIN}>
              <LoginByEmail
                resetPassword={() => (
                  <p className="text-sm mb-2 text-muted-foreground">
                    Забыли пароль?{' '}
                    <span
                      className="hover:underline cursor-pointer text-primary"
                      onClick={() => setTabValue(TabsVariants.FORGOT)}
                    >
                      Восстановить
                    </span>
                  </p>
                )}
              />
            </TabsContent>
            <TabsContent value={TabsVariants.REGISTRATION}>
              <RegistrerUser />
            </TabsContent>
            <TabsContent value={TabsVariants.FORGOT}>
              <ForgotPassword />
            </TabsContent>
          </Tabs>
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex-grow h-px bg-muted-foreground"></div>
              <p className="text-sm text-muted-foreground text-center">
                или войдите с помощью
              </p>
              <div className="flex-grow h-px bg-muted-foreground"></div>
            </div>
            <div className="flex justify-center items-center gap-x-2">
              <LoginByGithub />
              <LoginByYandex />
              <LoginByGoogle />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
