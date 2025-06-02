import { FC } from 'react';

import clsx from 'clsx';
import { useBreakpoint } from '@/src/shared/lib/use-breakpoint';
import { BookIcon, HomeIcon, YoutubeIcon } from 'lucide-react';
import { ROUTES } from '@/src/shared/lib/const';

const menuItems = [
  { name: 'Главная', icon: HomeIcon, href: ROUTES.HOME },
  { name: 'YouTube', icon: YoutubeIcon, href: ROUTES.YOUTUBE },
  { name: 'Словарик', icon: BookIcon, href: ROUTES.DICTIONARY },
  { name: 'Карточки', icon: BookIcon, href: ROUTES.LEARNING },
];

type MobileMenuProps = {
  className?: string;
};

export const MobileMenu: FC<MobileMenuProps> = ({ className }) => {
  const breakpoint = useBreakpoint();

  if (!breakpoint.sm) return null;

  return (
    <div className={clsx('fixed inset-x-0 bottom-0 z-50', className)}>
      <nav className="flex justify-around bg-card border-t h-14">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex flex-col items-center justify-center w-full text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <item.icon size={24} className="text-foreground" />
            <span className="text-xs mt-1 text-foreground">{item.name}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};
