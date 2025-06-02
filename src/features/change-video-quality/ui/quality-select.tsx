import { FC } from 'react';

import { VideoVariantT } from '@/src/entities/film/model/types';
import { SettingsItem } from '@/src/shared/components/ui/settings-item';

type QualitySelectProps = {
  qualityItems: VideoVariantT[];
  handleChangeQuality: (id: number) => void;
};

export const QualitySelect: FC<QualitySelectProps> = ({
  qualityItems,
  handleChangeQuality,
}) => {
  const qualityMenuItems = qualityItems.map((item) => {
    const handler = () => {
      handleChangeQuality(item.id);
    };

    return (
      <SettingsItem key={item.id} label={item.resolution} onClick={handler} />
    );
  });

  return qualityMenuItems;
};
