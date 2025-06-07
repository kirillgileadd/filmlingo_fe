import { FC } from 'react';

import clsx from 'clsx';
import { SettingsItem } from '@/src/shared/components/ui/settings-item';

type SubtitleTimeShiftProps = {
  className?: string;
  onChange?: (value: number) => void;
  value?: number;
};

const SHIFT_VARIANTS = Array.from(
  { length: 21 },
  (_, index) => -2.5 + index * 0.25,
);

export const SubtitleTimeShift: FC<SubtitleTimeShiftProps> = ({
  className,
  onChange,
  value,
}) => {
  return (
    <div className={clsx('flex flex-wrap', className)}>
      {SHIFT_VARIANTS.map((v) => (
        <SettingsItem
          className={clsx(
            'basis-1/3',
            value === v && 'text-primary bg-card font-bold',
          )}
          label={v.toString()}
          onClick={() => onChange?.(v)}
          key={v}
        />
      ))}
    </div>
  );
};
