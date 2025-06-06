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
  subtitlesVariants: SubtitleVariantT[];
  handleChangeSubtitleVariant: (language: string | null) => void;
  modalRef: HTMLDivElement | null;
};

export const SubtitleSelect: FC<SubtitleSelectProps> = ({
  subtitlesVariants,
  handleChangeSubtitleVariant,
  modalRef,
}) => {
  const modal = useModal();

  const onSelect = (language: string | null) => {
    handleChangeSubtitleVariant(language);
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
          {subtitlesVariants.map((sub) => (
            <SettingsItem
              key={sub.language}
              label={LABELS[sub.language as keyof typeof LABELS] ?? ''}
              onClick={() => onSelect(sub.language)}
            />
          ))}
          <SettingsItem label="Отключить" onClick={() => onSelect(null)} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

const LABELS = {
  en: 'Английский',
  ru: 'Русский',
} as const;
