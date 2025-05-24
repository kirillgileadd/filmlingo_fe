'use client';

import { FC } from 'react';

import { useGetCurrentUser } from '@/src/entities/user';
import { useLogoutUser } from '@/src/features/user-logout';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/shared/components/ui/popover';
import { SettingsItem } from '@/src/shared/components/ui/settings-item';
import { UserAvatar } from '@/src/shared/components/ui/user-avatar';
import { useAuth } from '@/src/shared/lib/auth';
import { useModal } from '@/src/shared/lib/useModal';
import { BookIcon, Loader2, LogOut, Youtube } from 'lucide-react';
import Link from 'next/link';

export const UserMenu: FC = ({}) => {
  const modal = useModal();
  const { isAuth } = useAuth();
  const currentUserQuery = useGetCurrentUser(!!isAuth);
  const logoutMutation = useLogoutUser();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    modal.closeModal();
  };

  if (!isAuth) return null;

  return (
    <Popover open={modal.isOpen} onOpenChange={modal.toggleModal}>
      <PopoverTrigger>
        <UserAvatar photo={currentUserQuery.data?.photo} />
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="overflow-hidden">
        <div className="flex items-center p-2 gap-2">
          <UserAvatar photo={currentUserQuery.data?.photo} />
          <div>
            <p className="font-medium">
              {currentUserQuery.data?.username ?? 'Пользователь'}
            </p>
            <p className="text-sm text-muted-foreground">
              {currentUserQuery.data?.email}
            </p>
          </div>
        </div>
        <hr />
        <nav>
          <Link href="/youtube" onClick={modal.closeModal}>
            <SettingsItem icon={Youtube} label="Youtube плеер" />
          </Link>
          <Link href="/dictionary" onClick={modal.closeModal}>
            <SettingsItem icon={BookIcon} label="Мой словарик" />
          </Link>
        </nav>
        <SettingsItem
          disabled={logoutMutation.isPending}
          onClick={handleLogout}
          icon={logoutMutation.isPending ? Loader2 : LogOut}
          label="Выйти"
        />
      </PopoverContent>
    </Popover>
  );
};
