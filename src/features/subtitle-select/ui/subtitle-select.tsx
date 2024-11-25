import { FC } from "react";

import { ParsedSubtitleT } from "@/src/entities/subtitle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/shared/components/ui/popover";
import { SubtitlesIcon } from "lucide-react";
import { SettingsItem } from "@/src/shared/components/ui/settings-item";
import { useModal } from "@/src/shared/lib/useModal";

type SubtitleSelectProps = {
  className?: string;
  subtitles: ParsedSubtitleT[];
  handleChangeSubtitleTrack: (id: number | null) => void;
};

export const SubtitleSelect: FC<SubtitleSelectProps> = ({
  subtitles,
  handleChangeSubtitleTrack,
}) => {
  const modal = useModal();

  const onSelect = (id: null | number) => {
    handleChangeSubtitleTrack(id);
    modal.closeModal();
  };

  return (
    <Popover open={modal.isOpen} onOpenChange={modal.toggleModal}>
      <PopoverTrigger className="p-3">
        <SubtitlesIcon className="text-primary" size={28} />
      </PopoverTrigger>
      <PopoverContent sideOffset={10} side="top" className="mr-6 ">
        <div>
          {subtitles.map((sub) => {
            return (
              <SettingsItem
                key={sub.id}
                label={sub.languageLabel}
                onClick={() => onSelect(sub.id)}
              />
            );
          })}
          <SettingsItem label="Отключить" onClick={() => onSelect(null)} />
        </div>
      </PopoverContent>
    </Popover>
  );
};
