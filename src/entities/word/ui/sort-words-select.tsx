import { FC } from 'react';

import clsx from 'clsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/shared/components/ui/select';
import { SORT_WORDS_SELECT_ITEMS } from '../model/const';
import { WordSortSelectItemT } from '../model/types';

type SortWordsSelectProps = {
  className?: string;
  value: WordSortSelectItemT | null; // Текущее выбранное значение
  onChange: (value: WordSortSelectItemT) => void; // Колбэк для изменения значения
};

export const SortWordsSelect: FC<SortWordsSelectProps> = ({
  className,
  value,
  onChange,
}) => {
  const handleChange = (value: string) => {
    const [field, order] = value.split(':');
    const newItem = SORT_WORDS_SELECT_ITEMS.find(
      (item) => item.value === field && item.order === order,
    );
    if (newItem) {
      onChange(newItem);
    }
  };

  return (
    <div className={clsx('', className)}>
      <Select
        value={value ? `${value.value}:${value.order}` : ''}
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue
            placeholder="Выберите сортировку"
            defaultValue={value?.label}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {SORT_WORDS_SELECT_ITEMS.map((item) => (
              <SelectItem
                key={item.value + ':' + item.order}
                value={`${item.value}:${item.order}`}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
