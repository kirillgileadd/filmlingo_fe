import { FC } from 'react';

import clsx from 'clsx';
import { SettingsItem } from '@/src/shared/components/ui/settings-item';

type SubtitleTimeShiftProps = {
  className?: string;
};

const SHIFT_VARIANTS = Array.from(
  { length: 21 },
  (_, index) => -5 + index * 0.5,
);

export const SubtitleTimeShift: FC<SubtitleTimeShiftProps> = ({
  className,
}) => {
  console.log(SHIFT_VARIANTS);
  return (
    <div className={clsx('flex flex-wrap', className)}>
      {SHIFT_VARIANTS.map((v) => (
        <SettingsItem className="basis-1/3" label={v.toString()} key={v} />
      ))}
    </div>
  );
};
