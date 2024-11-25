"use client";

import { FC, useState } from "react";

import { VideoVariantT } from "@/src/entities/film/model/types";
import { QualitySelect } from "@/src/features/change-video-quality";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/shared/components/ui/popover";
import { SettingsItem } from "@/src/shared/components/ui/settings-item";
import { useModal } from "@/src/shared/lib/useModal";
import {
  ChevronLeftIcon,
  SettingsIcon,
  SlidersHorizontalIcon,
  SubtitlesIcon,
} from "lucide-react";

type PlayerSettingsProps = {
  className?: string;
  qualityItems: VideoVariantT[];
  currentQualityLabel: string;
  handleChangeQuality: (id: number) => void;
};

enum MenuItemEnum {
  SUBTITLES = "subtitles",
  QUALITY = "quality",
}

export const PlayerSettings: FC<PlayerSettingsProps> = ({
  qualityItems,
  currentQualityLabel,
  handleChangeQuality,
}) => {
  const settingsOpen = useModal();
  const [menuItem, setMenuItem] = useState<MenuItemEnum | null>(null);

  const handleChangeMenuItem = (item: MenuItemEnum) => {
    setMenuItem(item);
  };

  const handleSelect = (id: number) => {
    handleChangeQuality(id);
    setMenuItem(null);
    settingsOpen.closeModal();
  };

  const MENU_ITEMS = [
    { label: "Cубтитры", value: MenuItemEnum.SUBTITLES, icon: SubtitlesIcon },
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
    <Popover open={settingsOpen.isOpen} onOpenChange={settingsOpen.toggleModal}>
      <PopoverTrigger className="p-3">
        <SettingsIcon className="text-primary" size={24} />
      </PopoverTrigger>
      <PopoverContent sideOffset={10} side="top" className="mr-6 ">
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
              <SettingsItem label="Настройки субтитров" />
            )}
          </div>
        ) : (
          <div>{menuItems}</div>
        )}
      </PopoverContent>
    </Popover>
  );
};
