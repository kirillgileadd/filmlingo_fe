'use client';

import { FC, useState } from 'react';

import { VideoVariantT } from '@/src/entities/film/model/types';
import { QualitySelect } from '@/src/features/change-video-quality';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/shared/components/ui/popover';
import { SettingsItem } from '@/src/shared/components/ui/settings-item';
import { useModal } from '@/src/shared/lib/useModal';
import {
  ChevronLeftIcon,
  SettingsIcon,
  SlidersHorizontalIcon,
  SubtitlesIcon,
} from 'lucide-react';
import { SubtitleTimeShift } from '@/src/features/subtitle-settings';

type PlayerSettingsProps = {
  className?: string;
  qualityItems: VideoVariantT[];
  currentQualityLabel: string;
  subtitleShift: number;
  handleChangeQuality: (id: number) => void;
  handleChangeSubtitleShift: (value: number) => void;
  modalRef: HTMLDivElement | null;
};

enum MenuItemEnum {
  SUBTITLES = 'subtitles',
  QUALITY = 'quality',
}

export const PlayerSettings: FC<PlayerSettingsProps> = ({
  qualityItems,
  subtitleShift,
  currentQualityLabel,
  handleChangeQuality,
  handleChangeSubtitleShift,
  modalRef,
}) => {
  const settingsOpen = useModal();
  const [menuItem, setMenuItem] = useState<MenuItemEnum | null>(null);

  const handleChangeMenuItem = (item: MenuItemEnum) => {
    setMenuItem(item);
  };

  const handleTogglePopover = () => {
    settingsOpen.toggleModal();
    setTimeout(() => {
      setMenuItem(null);
    }, 300);
  };

  const handleSelect = (id: number) => {
    handleChangeQuality(id);
    setMenuItem(null);
    settingsOpen.closeModal();
  };

  //TODO придумать как организовать меню
  const MENU_ITEMS = [
    {
      label: 'Сдвиг субтитров',
      value: MenuItemEnum.SUBTITLES,
      icon: SubtitlesIcon,
    },
    {
      label: `Качетство (${currentQualityLabel})`,
      value: MenuItemEnum.QUALITY,
      icon: SlidersHorizontalIcon,
    },
  ];

  const menuItems = MENU_ITEMS.map((item) => (
    <SettingsItem
      {...item}
      key={item.value}
      onClick={() => handleChangeMenuItem(item.value)}
    />
  ));

  return (
    <Popover open={settingsOpen.isOpen} onOpenChange={handleTogglePopover}>
      <PopoverTrigger className="p-3">
        <SettingsIcon className="text-foreground" size={24} />
      </PopoverTrigger>
      <PopoverContent
        container={modalRef}
        sideOffset={10}
        side="top"
        className="mr-6 "
      >
        {menuItem ? (
          <div>
            <div className="p-3 border-b flex gap-x-2 items-center">
              <ChevronLeftIcon onClick={() => setMenuItem(null)} />
              {menuItem === MenuItemEnum.QUALITY && (
                <p className="text-sm font-bold">Качество</p>
              )}
            </div>
            {menuItem === MenuItemEnum.QUALITY && (
              <QualitySelect
                qualityItems={qualityItems}
                handleChangeQuality={handleSelect}
              />
            )}
            {menuItem === MenuItemEnum.SUBTITLES && (
              <SubtitleTimeShift
                value={subtitleShift}
                onChange={handleChangeSubtitleShift}
              />
            )}
          </div>
        ) : (
          <div>{menuItems}</div>
        )}
      </PopoverContent>
    </Popover>
  );
};
