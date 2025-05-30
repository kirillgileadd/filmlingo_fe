'use client';

import { FC } from 'react';

import clsx from 'clsx';
import { UserIcon } from 'lucide-react';
import Image from 'next/image';

type UserAvatarProps = {
  className?: string;
  photo?: string;
  size?: number;
};

export const UserAvatar: FC<UserAvatarProps> = ({
  className,
  photo,
  size = 36,
}) => {
  return (
    <div className={clsx('bg-background rounded-full border', className)}>
      {!!photo ? (
        <Image
          src={photo ?? ''}
          width={size}
          height={size}
          alt="Avatar"
          className="rounded-full"
        />
      ) : (
        <UserIcon className="p-1" width={size} height={size} />
      )}
    </div>
  );
};
