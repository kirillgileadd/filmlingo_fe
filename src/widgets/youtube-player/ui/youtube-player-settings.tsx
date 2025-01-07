import { FC, useState } from 'react';

import { ChevronLeft, SettingsIcon, SubtitlesIcon } from 'lucide-react';
import { useModal } from '@/src/shared/lib/useModal';
import { SubtitleTimeShift } from '@/src/features/subtitle-settings';
import { SettingsItem } from '@/src/shared/components/ui/settings-item';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/src/shared/components/ui/popover';

type YoutubePlayerSettingsProps = object;

type SettingsItemT = {
  label: string;
  icon: React.FC;
  component: React.FC;
  value: SETTINGS_CONFIG;
};

const enum SETTINGS_CONFIG {
  SUBTITLE_SETTINGS = 'subtitle',
}

const settingsConfig: SettingsItemT[] = [
  {
    label: 'Настройки субтитров',
    icon: SubtitlesIcon,
    value: SETTINGS_CONFIG.SUBTITLE_SETTINGS,
    component: SubtitleTimeShift,
  },
];

export const YoutubePlayerSettings: FC<YoutubePlayerSettingsProps> = ({}) => {
  const [active, setActive] = useState<SettingsItemT | null>(null);
  const modal = useModal();

  const handleChangeSettingItem = (item: SettingsItemT | null) => {
    setActive(item);
  };

  return (
    <Popover open={modal.isOpen} onOpenChange={modal.toggleModal}>
      <PopoverTrigger className="absolute bottom-24 left-6 transform -translate-x-1/2 z-10 text-white">
        <SettingsIcon />
      </PopoverTrigger>
      <PopoverContent side="top">
        <div
          className="flex gap-2 items-center p-2 border-b-1"
          onClick={() => handleChangeSettingItem(null)}
        >
          <ChevronLeft />
          <p>К списку</p>
        </div>
        {!!active ? (
          <active.component />
        ) : (
          settingsConfig.map((item) => (
            <SettingsItem
              onClick={() => handleChangeSettingItem(item)}
              key={item.value}
              label={item.label}
              icon={item.icon}
            />
          ))
        )}
      </PopoverContent>
    </Popover>
  );
};
