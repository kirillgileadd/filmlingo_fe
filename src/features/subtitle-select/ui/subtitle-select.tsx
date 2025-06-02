import { FC } from 'react';

import { SubtitleVariantT } from '@/src/entities/film/model/types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/shared/components/ui/popover';
import { SettingsItem } from '@/src/shared/components/ui/settings-item';
import { useModal } from '@/src/shared/lib/useModal';
import { SubtitlesIcon } from 'lucide-react';

type SubtitleSelectProps = {
  className?: string;
  subtitlesVarinats: SubtitleVariantT[];
  handleChangeSubtitleVariant: (id: number | null) => void;
  modalRef: HTMLDivElement | null;
};

export const SubtitleSelect: FC<SubtitleSelectProps> = ({
  subtitlesVarinats,
  handleChangeSubtitleVariant,
  modalRef,
}) => {
  const modal = useModal();

  const onSelect = (id: null | number) => {
    handleChangeSubtitleVariant(id);
    modal.closeModal();
  };

  return (
    <Popover open={modal.isOpen} onOpenChange={modal.toggleModal}>
      <PopoverTrigger className="p-3">
        <SubtitlesIcon className="text-foreground" size={28} />
      </PopoverTrigger>
      <PopoverContent
        container={modalRef}
        sideOffset={10}
        side="top"
        className="mr-6 "
      >
        <div>
          {subtitlesVarinats.map((sub) => (
            <SettingsItem
              key={sub.id}
              label={sub.language}
              onClick={() => onSelect(sub.id)}
            />
          ))}
          <SettingsItem label="Отключить" onClick={() => onSelect(null)} />
        </div>
      </PopoverContent>
    </Popover>
  );
};
