'use client';

import { FC } from 'react';

import clsx from 'clsx';

type SettingsItemProps = {
  className?: string;
  label: string;
  icon?: React.ElementType;
} & React.HTMLProps<HTMLDivElement>;

export const SettingsItem: FC<SettingsItemProps> = ({
  className,
  label,
  icon: Icon,
  ...props
}) => {
  return (
    <div
      {...props}
      className={clsx(
        'p-3 flex items-center gap-x-2 hover:bg-muted cursor-pointer',
        className,
      )}
    >
      {Icon && <Icon />} <p>{label}</p>
    </div>
  );
};
